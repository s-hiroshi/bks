import { parseBookmark } from "../../service/parseBookmarks";

describe("Test parseBookmark", () => {
  test("read", async () => {
    const actual = await parseBookmark(
      `${process.cwd()}/src/tests/bookmarks.html`
    );
    expect(actual).toHaveLength(2);
  });
});
