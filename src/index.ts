import { startServer } from "./server";
import { startUpdaterJob } from "./tasks/updateTitles";

export const validateShorterPayload = (payload: ShortenPayload) => {
  const newUrl = new URL(payload.url);
  return newUrl.href;
};

type ShortenPayload = {
  url: string;
};

console.log("args:", ...process.argv);
if (process.argv[2] === "job") {
  startUpdaterJob();
} else {
  startServer();
}
