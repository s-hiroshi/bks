const fs = require("fs");
const path = require("path");
import { ItemReader } from "../../model/ItemReader";
import { ItemWriter } from "../../model/ItemWriter";

describe("Test ItemWriter", () => {
  const filePath = `${process.cwd()}/src/tests/storage/data.json`;

  beforeAll(async () => {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true }, (err: any) => {
        if (err) throw err;
      });
    }

    fs.writeFileSync(
      filePath,
      JSON.stringify({ items: [] }),
      { flag: "w+" },
      (err: any) => {
        if (err) throw err;
      }
    );

    return true;
  });

  test("add item", async () => {
    const writer = new ItemWriter(
      `${process.cwd()}/src/tests/storage/data.json`
    );

    writer.add({ keyword: "foo", content: "foo.com" });

    const reader = new ItemReader(
      `${process.cwd()}/src/tests/storage/data.json`
    );
    await reader.init();
    const expected = { keyword: "foo", content: "foo.com" };
    // @see https://jestjs.io/docs/expect#tocontainequalitem
    expect(reader.readAll()).toContainEqual(expected);
  });

  test("delete item", async () => {
    const writer = new ItemWriter(
      `${process.cwd()}/src/tests/storage/data.json`
    );
    writer.delete("foo", "foo.com");
    const reader = new ItemReader(
      `${process.cwd()}/src/tests/storage/data.json`
    );
    await reader.init();
    expect(reader.readAll()).toHaveLength(0);
  });

  afterAll(() => {
    fs.unlinkSync(filePath, (err: Error) => {
      if (err) throw err;
    });
  });
});
