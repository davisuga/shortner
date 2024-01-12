import { describe, it, expect } from "vitest";
const exampleUrl = "https://www.google.com";

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
        expect(json.shorten).toBeDefined();
      });
  });

  it("should redirect to the original url", () => {});
});
