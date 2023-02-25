const inquirer = require("inquirer");
const fs = require("fs");
import { createChoices } from "../service/createChoices";

// export class HistoryControl implements Control {
export class HistoryControl {
  /*  controlCharactor = "history";

  private contents;
  constructor(private reader: Reader) {}

  getControlCharactor(): string {
    return this.controlCharactor;
  }

  async execute(query?: string) {
    // const histories:array = read('.history')

    if (histories.length > 0) {
      const contents = items.map((item, index) => {
        return item.content;
      });
      const choices = createChoices(contents, ["Exit"]);
      const choiced = await inquirer
        .prompt([
          {
            type: "list",
            name: "context",
            message: "Which one do you want to open",
            choices: choices,
            loop: false,
          },
        ])
        .then((answer: Answer) => {
          return answer.context;
        });
      if (choided == "next") {
        // 次の10件
      }
      if (choiced == "prev") {
      }
      if (choiced !== "Exit") {
        return choiced;
      }
    }
  } */
}
