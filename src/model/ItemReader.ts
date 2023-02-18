const fs = require('fs');
import { readLines } from '../service/readLines'

export class ItemReader {
  private storageFilePath: string;
  private hasStorage: boolean;
  // @see https://iwb.jp/typescript-properties-no-initializer-and-is-not-definitely-error/
  private data: Data;

  constructor(storageFilePath: string) {
    this.storageFilePath = storageFilePath;
    this.hasStorage = fs.existsSync(storageFilePath);
  }

  async init() {
    this.data = JSON.parse(await readLines(this.storageFilePath));
  }

  /**
   * @param keyword
   * @param content
   * @return Items[]
   */
  readItem(keyword: string, content: string): Item[] {
    if (!this.hasStorage || !keyword || !content) {
      throw new Error();
    }
    const matchedItems: Item[] = [];
    this.data.items.forEach((item: Item, index: number) => {
      if (item.keyword.indexOf(keyword) >= 0 || item.content.indexOf(content) >= 0) {
        matchedItems.push(item);
      }
    });
    return matchedItems;
  }

  /**
     * @param keyword
     * @param content
     * @return Items[]
     */
  readItemStrict(keyword: string, content: string): Item[] {
    if (!this.hasStorage || !keyword || !content) {
      throw new Error();
    }
    const matchedItems: Item[] = [];
    this.data.items.forEach((item: Item, index: number) => {
      if (item.keyword.indexOf(keyword) >= 0 && item.content.indexOf(content) >= 0) {
        matchedItems.push(item);
      }
    });
    return matchedItems;
  }

  /**
   * 
   * @returns Item[]
   */
  readAll() {
    if (!this.hasStorage) throw new Error();
    return this.data.items
  }
}