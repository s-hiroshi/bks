const fs = require("fs");
const path = require("path");
import { HistoryWriter } from "../../model/HistoryWriter";
import { HistoryReader } from "../../model/HistoryReader"

describe("Test ItemReader", () => {
  let writer: HistoryWriter;
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
      { flag: "w+" },
      (err: any) => {
        if (err) throw err;
      }
    );

    writer = new HistoryWriter(`${process.cwd()}/src/tests/storage/.history`);
    await writer.init();

    return true;
  });

  test("Write", async () => {

    // @see https://jestjs.io/docs/expect#tocontainequalitem
    writer.write('example.jp')
    const reader = new HistoryReader(filePath);
    await reader.init();
    expect(reader.getRows()).toEqual(4);
  });

  
  afterAll(() => {
    fs.unlinkSync(filePath, (err: Error) => {
      if (err) throw err;
    });
  });
});
