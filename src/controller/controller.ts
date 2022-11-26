const open = require("open");
import { parseSite } from "../service/parseSite";
import { ControlRepository } from "../control/ControlRepository";
import { HistoryWriter } from "../model/HistoryWriter";

export class Controller {
  constructor(
    private reader: Reader,
    private writer: Writer,
    private historyWriter: HistoryWriter,
    private controlRepository: ControlRepository
  ) {}

  async run(args: any) {
    const [command, query, ...subQeuries] = args;
    if (!command) return;
    const control = this.controlRepository.find(command);
    if (control != undefined) {
      try {
        const result = await control.execute(query);
        if (typeof result === "string") {
          open(parseSite(result));
          this.historyWriter.write(result);
        }
      } catch (e: any) {
        console.log(e.message);
      }
      return;
    }
    if (!parseSite(args[0])) {
      console.log("Not Domain");
    } else {
      open(parseSite(args[0]));
      this.historyWriter.write(args[0]);
    }
  }
}
