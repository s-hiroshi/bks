const fs = require("fs");
const path = require("path");
import { HistoryReader } from "../../model/HistoryReader";

describe("Test HistroyReader", () => {
  let reader: HistoryReader;
  const filePath = `${process.cwd()}/src/tests/storage/.history`;
  beforeAll(async () => {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true }, (err: any) => {
        if (err) throw err;
      });
    }

    fs.writeFileSync(
      filePath,
      "example.com\nexample.org\nexample.net\n",
      { flag: "a" },
      (err: any) => {
        if (err) throw err;
      }
    );

    reader = new HistoryReader(`${process.cwd()}/src/tests/storage/.history`);
    await reader.init();

    return true;
  });

  test("getRow", () => {
    // @see https://jestjs.io/docs/expect#tocontainequalitem
    expect(reader.getRows()).toEqual(3);
  });

  test("read", () => {
    expect(reader.read(0, 2)).toEqual(["example.org","example.net"]);
  })

  afterAll(() => {
    fs.unlinkSync(filePath, (err: Error) => {
      if (err) throw err;
    });
  });
});
