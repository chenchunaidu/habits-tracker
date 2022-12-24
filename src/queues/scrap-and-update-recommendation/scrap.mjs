import arc from "@architect/functions";
import ogs from "open-graph-scraper";
import retry from "async-retry";

export const getMetaData = (url) => {
  const options = {
    url,
    timeout: 10000,
    headers: {
      "user-agent": "Googlebot/2.1 (+http://www.google.com/bot.html)",
    },
  };
  const data = ogs(options);
  return data;
};

export const getImage = (image) => {
  if (!image) return "";
  if (Array.isArray(image)) return image[0]?.url;
  return image?.url;
};

const getMetaDataWithRetry = async (url) => {
  try {
    const result = await retry(
      async (bail) => {
        const res = await getMetaData(url);
        return res;
      },
      {
        retries: 3,
      }
    );
    return { meta: result, error: null };
  } catch (error) {
    console.log(error);
    return { meta: null, error: error };
  }
};

export const transformMeta = ({ meta, error }) => {
  if (error) {
    return {
      title: "",
      description: "",
      media: "",
      scrapStatus: "failed",
      error: JSON.stringify(error),
    };
  }
  return {
    title: meta?.result?.ogTitle || "",
    description: meta?.result?.ogDescription || "",
    media: getImage(meta?.result?.ogImage),
    scrapStatus: "success",
  };
};

export const updateMeta = async (recommendation) => {
  const data = await getMetaDataWithRetry(recommendation.url);
  const db = await arc.tables();
  const updatedData = await db?.recommendations.put({
    ...recommendation,
    ...transformMeta(data),
    fullMeta: JSON.stringify(data?.meta?.result),
  });
  return updatedData;
};

export const scrapAndUpdateMeta = async ({ userId, id }) => {
  const db = await arc.tables();
  const recommendations = await db.recommendations.query({
    KeyConditionExpression: "pk = :pk AND sk = :sk",
    ExpressionAttributeValues: { ":pk": userId, ":sk": id },
  });
  await updateMeta(recommendations.Items?.[0]);
};
