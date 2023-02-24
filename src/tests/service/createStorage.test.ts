const fs = require("fs");
const path = require("path");
import { createStorage } from "../../service/createStorage";
import { ItemReader } from "../../model/ItemReader";

const filepath = `${process.cwd()}/src/tests/storage/storage.json`;

describe("Test createStorage", () => {
  const filepath = `${process.cwd()}/src/tests/storage/storage.json`;

  beforeAll(() => {
    if (fs.existsSync(filepath)) {
      fs.unlink(filepath, (err: Error) => {
        if (err) throw err;
      });
    }
  });

  test("create storage", async () => {
    createStorage(filepath);

    const reader = new ItemReader(filepath);
    await reader.init();
    // @see https://jestjs.io/docs/expect#tocontainequalitem
    expect(fs.existsSync(filepath)).toBe(true);
    expect(reader.readAll()).toHaveLength(0);
  });

  afterAll(() => {
    fs.unlink(filepath, (err: Error) => {
      if (err) throw err;
    });
  });
});
