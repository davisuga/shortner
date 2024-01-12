import { PrismaClient } from "@prisma/client";
import express from "express";
import { randomUUID } from "crypto";
import { getPageTitle } from "./lib/getPageTitle";
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Define REST API routes here

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
app.get("/health", (req, res) => {
  res.send("OK");
});

type ShortenPayload = {
  url: string;
};

const validateShorterPayload = (payload: ShortenPayload) => {
  const newUrl = new URL(payload.url);
  return newUrl.href;
};

app.post("/shorten", async (req, res) => {
  const { url } = req.body;
  const title = await getPageTitle(url);
  if (!title) throw new Error("No title found");

  const result = await prisma.url.create({
    data: {
      slug: randomUUID().slice(0, 8),
      url: validateShorterPayload({ url }),
      title,
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
    },
  });

  const top = result.sort((a, b) => b.clicks - a.clicks);
  res.json(top);
});
