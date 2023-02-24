const fs = require("fs");
const path = require("path");
import { readLines } from "../../service/readLines";

describe("Test readLines", () => {
  beforeAll(async () => {
    const storagePath = `${process.cwd()}/src/tests/storage/data.json`;
    if (!fs.existsSync(storagePath)) {
      fs.mkdirSync(
        path.dirname(storagePath),
        { recursive: true },
        (err: any) => {
          if (err) throw err;
        }
      );
    }

    fs.writeFileSync(
      storagePath,
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
});
