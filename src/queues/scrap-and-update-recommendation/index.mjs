// learn more about event functions here: https://arc.codes/events
import { scrapAndUpdateMeta } from "./scrap.mjs";

export async function handler(event) {
  await Promise.all(
    event?.Records.map(async (record) => {
      const { body } = record;
      if (!body) return { success: false };
      const parsedBody = JSON.parse(body);
      const { id, userId } = parsedBody || {};
      if (!id || !userId) {
        return { success: false };
      }

      const response = await scrapAndUpdateMeta({
        userId: userId,
        id: id,
      });
      return { success: true };
    })
  );
}
