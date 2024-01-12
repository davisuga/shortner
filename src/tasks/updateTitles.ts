import { prisma } from "@/db/client";
import { getPageTitle } from "../lib/getPageTitle";

export const updateAllTitles = async () => {
  const urls = await prisma.url.findMany();

  urls.forEach(async (url) => {
    const title = await getPageTitle(url.url);
    await prisma.url.update({
      where: {
        id: url.id,
      },
      data: {
        title,
      },
    });
  });
  console.log("All titles updated");
};
export const startUpdaterJob = () => setInterval(updateAllTitles, 1000);
