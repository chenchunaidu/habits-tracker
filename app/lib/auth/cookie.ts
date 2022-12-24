import { createCookie } from "@remix-run/node";

const supabaseToken = createCookie("sb:token", {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 604_800,
  secrets: [process.env.COOKIE_SECRET || "sjdksjdksjdksjdksjdk"],
});
export default supabaseToken;
