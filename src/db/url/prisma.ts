import { prisma } from "../client";

const getUrlRepo = (): UrlRepo => {
  return {
    getBySlug: async (slug: string) => {
      const result = await prisma.url.findUnique({
        where: {
          slug,
        },
      });
      return result;
    },
    getTopUrls: async () => {
      const result = await prisma.url.findMany({
        orderBy: {
          clicks: "desc",
        },
        take: 100,
        select: {
          url: true,
          title: true,
          clicks: true,
          slug: true,
        },
      });

      const top = result.sort((a, b) => b.clicks - a.clicks);
      return top;
    },
    upsertUrl: async (url: Url) => {
      return prisma.url.upsert({
        create: { ...url },
        update: {
          title: url.title,
        },
        where: {
          url: url.url,
        },
      });
    },
  };
};

export const urlRepo = getUrlRepo();
