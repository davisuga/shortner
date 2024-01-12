import { PrismaClient } from "@prisma/client";
import express from "express";
import { randomUUID } from "crypto";
import { getPageTitle } from "./lib/getPageTitle";
const prisma = new PrismaClient();
const app = express();

type ShortenPayload = {
  url: string;
};

app.use(express.json());

// Define REST API routes here

app.get("/top", async (req, res) => {
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

const validateShorterPayload = (payload: ShortenPayload) => {
  const newUrl = new URL(payload.url);
  return newUrl.href;
};

app.post("/shorten", async (req, res) => {
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

app.get("/:slug", async (req, res) => {
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

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
