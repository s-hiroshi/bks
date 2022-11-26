const fs = require("fs");
const path = require("path");
/**
 *
 * @param filePath
 * @returns
 */
export const createStorage = (filePath: string): boolean => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true }, (err: any) => {
      if (err) throw err;
    });

    fs.writeFileSync(
      filePath,
      JSON.stringify({ items: [] }),
      { flag: "w+" },
      (err: any) => {
        if (err) throw err;
      }
    );
  }
  return true;
};
