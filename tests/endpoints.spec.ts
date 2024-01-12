import { describe, it, expect } from "vitest";
const randomNumber = Math.floor(Math.random() * 1000000);
const exampleUrl = `https://www.google.com?q=${randomNumber}`;

const getTop = async () => (await fetch(`http://localhost:3000/top`)).json();

describe("Shorten URL scrapper", () => {
  let slug = "";

  it("should shorten an url", () => {
    fetch("http://localhost:3000/shorten", {
      method: "POST",
      body: JSON.stringify({
        url: exampleUrl,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("shorten:", json);
        expect(json.shorten).toBeDefined();
        slug = json.shorten;
      });
  });

  it("should redirect to the original url", () => {
    fetch(`http://localhost:3000/${slug}`).then((res) => res.status === 302);
  });

  it("should increment the click count", async () => {
    console.log(slug);
    const topResultsBefore = await getTop();
    console.log(topResultsBefore);
    await fetch(`http://localhost:3000/${slug}`);
    const topResultsAfter = await getTop();
    expect(
      topResultsAfter.find((result) => result.slug === slug).clicks
    ).toBeGreaterThan(
      topResultsBefore.find((result) => result.slug === slug).clicks
    );
  });
});
