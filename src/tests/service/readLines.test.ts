const fs = require("fs");
const path = require("path");
import { readLines } from "../../service/readLines";

describe("Test readLines", () => {
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

    return true;
  });

  test("read", async () => {
    const actual = await readLines(
      `${process.cwd()}/src/tests/storage/data.json`
    );
    expect(actual).toMatch(/example.org/);
    expect(actual).toMatch(/example.com/);
  });

  afterAll(() => {
    fs.unlink(filePath, (err: Error) => {
      if (err) throw err;
    });
  });
});
