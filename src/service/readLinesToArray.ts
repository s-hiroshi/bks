const fs = require("fs");
const readline = require("readline");

/**
 *
 * @param filePath
 * @returns
 */
export async function readLinesToArray(filePath: string): Promise<string[]> {
  // @see https://blog.katsubemakito.net/nodejs/file-read
  const stream = fs.createReadStream(filePath, {
    encoding: "utf8",
    highWaterMark: 1024,
  });

  const reader = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  const lines: string[] = [];
  for await (const line of reader) {
    lines.push(line);
  }
  return lines;
}
