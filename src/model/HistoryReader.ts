const fs = require("fs");
import { readLinesToArray } from "../service/readLinesToArray";
export class HistoryReader {
  private histories: string[];
  constructor(private filePath: string) {}

  async init() {
    const rawHistories = await readLinesToArray(this.filePath);
    this.histories = rawHistories.reverse();
  }
  getRows() {
    return this.histories.length;
  }

  read(start: number, offset: number) {
    const targetHistories: string[] = [];
    this.histories.forEach((history: string, i: number) => {
      if (start <= i && i < start + offset) {
        targetHistories.push(history);
      }
    });
    return targetHistories;
  }

  readReverse(start: number, offset: number) {
    const targetHistories: string[] = [];
    this.histories.forEach((history: string, i: number) => {
      if (start - offset <= i && i < start) {
        targetHistories.push(history);
      }
    });
    return targetHistories;
  }
}
