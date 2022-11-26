import { parseSite } from "../../service/parseSite";

/*
 * @see
 * https://dev.classmethod.jp/articles/alternative-solution-when-tests-with-tobe-matcher-fail-in-jest/
 */
describe("Test parseSite", () => {
  const actual = parseSite("https://example.com");
  test("FQDN", () => {
    expect(parseSite("example.com")).toBe("https://example.com");
  });

  test("DOMAIN", () => {
    expect(parseSite("example.com")).toBe("https://example.com");
  });
});
