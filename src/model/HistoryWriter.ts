const fs = require("fs");
import { readLinesToArray } from "../service/readLinesToArray";
export class HistoryWriter {
  private histories: string[];
  constructor(private filePath: string) {}

  async init() {
    this.histories = await readLinesToArray(this.filePath);
  }
  getRows() {
    return this.histories.length;
  }

  write(content: string) {
    if (this.getRows() < 10000) {
      fs.writeFileSync(this.filePath, content + "\n", { flag: "a" }, (err: any) => {
        if (err) throw err;
      });
      return
    }
    this.histories.pop();
    this.histories.push(content + "\n");
  }
}
