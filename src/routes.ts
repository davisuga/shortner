import { randomUUID } from "crypto";
import express from "express";
import { getPageTitle } from "./lib/getPageTitle";
import { validateShorterPayload } from ".";
import { prisma } from "./db/client";

export const appRoutes = express.Router();

appRoutes.get("/top", async (req, res) => {
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
  res.json(top);
});

appRoutes.post("/shorten", async (req, res) => {
  const { url } = req.body;
  const title = await getPageTitle(url);
  if (!title) throw new Error("No title found");
  const validatedUrl = validateShorterPayload({ url });

  const result = await prisma.url.upsert({
    create: {
      slug: randomUUID().slice(0, 8),
      url: validatedUrl,
      title,
    },
    update: {
      title,
    },
    where: {
      url,
    },
  });

  res.json({
    shorten: result.slug,
  });
});

appRoutes.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const result = await prisma.url.findUnique({
    where: {
      slug,
    },
  });

  if (!result) {
    res.status(404).send("Not found");
    return;
  }

  await prisma.url.update({
    where: {
      slug,
    },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });
  res.redirect(result.url);
});
