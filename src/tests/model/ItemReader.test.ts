const fs = require("fs");
const path = require("path");
import { ItemReader } from "../../model/ItemReader";

describe("Test ItemReader", () => {
  let reader: ItemReader;
  const filePath = `${process.cwd()}/src/tests/storage/data.json`;
  beforeAll(async () => {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true }, (err: any) => {
        if (err) throw err;
      });
    }

    fs.writeFileSync(
      filePath,
      JSON.stringify({
        items: [
          { keyword: "exampleOrg", content: "example.org" },
          { keyword: "exampleCom", content: "example.com" },
        ],
      }),
      { flag: "w+" },
      (err: any) => {
        if (err) throw err;
      }
    );

    reader = new ItemReader(`${process.cwd()}/src/tests/storage/data.json`);
    await reader.init();

    return true;
  });

  test("Read all items", async () => {
    const expectedFirst = { keyword: "exampleOrg", content: "example.org" };
    const expectedSecond = { keyword: "exampleCom", content: "example.com" };

    // @see https://jestjs.io/docs/expect#tocontainequalitem
    expect(reader.readAll()).toContainEqual(expectedFirst);
    expect(reader.readAll()).toContainEqual(expectedSecond);
  });

  test("Read item", async () => {
    const expected = [
      { keyword: "exampleOrg", content: "example.org" },
      { keyword: "exampleCom", content: "example.com" },
    ];
    // Extract just match one of the arguments.
    expect(reader.readItem("exampleOrg", "example.com")).toEqual(expected);
  });

  test("Read item strict", async () => {
    const expected = { keyword: "exampleOrg", content: "example.org" };
    // Extract exact matches to arguments
    expect(reader.readItemStrict("exampleOrg", "example.org")).toContainEqual(
      expected
    );
  });

  afterAll(() => {
    fs.unlink(filePath, (err: Error) => {
      if (err) throw err;
    });
  });
});
