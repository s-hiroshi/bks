const fs = require('fs');
const readline = require("readline");

/**
 * 
 * @param filePath 
 * @returns 
 */
export async function readLines(filePath: string): Promise<string> {

    // @see https://blog.katsubemakito.net/nodejs/file-read
    const stream = fs.createReadStream(filePath, {
        encoding: "utf8",
        highWaterMark: 1024
    });

    const reader = readline.createInterface({ input: stream, crlfDelay: Infinity });

    // const items: Item;
    let lines: string = '';
    for await (const line of reader) {
        lines += `${line}\n`
    };
    return lines;
}
