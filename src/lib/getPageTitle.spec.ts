import { it, describe, expect } from "vitest";
import { getPageTitle } from "./getPageTitle";

const testURL = "https://www.google.com";

describe("Shorten URL scrapper", () => {
  it("should have the correct page title", async () => {
    const title = await getPageTitle(testURL);
    console.log(title);
    expect(title).toBe("Google");
  });
});
