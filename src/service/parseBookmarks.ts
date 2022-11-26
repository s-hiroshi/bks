const fs = require("fs");
const readline = require("readline");

/**
 * 
 * @param filePath 
 * @returns 
 */
export async function parseBookmark(filePath: string): Promise<Item[]>{

    // @see https://blog.katsubemakito.net/nodejs/file-read
    const stream = fs.createReadStream(filePath, {
        encoding: "utf8",
        highWaterMark: 1024
    });

    const reader = readline.createInterface({ input: stream, crlfDelay: Infinity });

    // const items: Item;
    const items: Item[] = [];
    for await (const line of reader ) {
        const matchecKeyword = line.match(/<a[^>]+>(?<keyword>[^<]+)<\/a>/i);
        const matchedContent = line.match(/href="(?<content>[^"]+)"/i);
        if (matchecKeyword && matchedContent) {
            const item: Item = {
                keyword :matchecKeyword.groups.keyword,
                content: matchedContent.groups.content
            }
            items.push(item);
        }
    }; 
    return items;
}