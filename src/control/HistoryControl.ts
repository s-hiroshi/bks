const inquirer = require("inquirer");
const fs = require("fs");
import { HistoryReader } from "../model/HistoryReader";
import { createChoices } from "../service/createChoices";

// export class HistoryControl implements Control {
export class HistoryControl {
  controlCharactor = "history";

  private start: number;
  private increment = 10;
  constructor(private reader: HistoryReader) {}

  getControlCharactor(): string {
    return this.controlCharactor;
  }

  async execute(query?: string) {
    let histories = this.reader.read(0, 10);
    this.start = 0;
    const choices = createChoices(histories, ["Exit", "Next", "Prev"]);
    return this.choice(choices);
  }

  async choice(choices: string[]) {
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
    if (choiced == "Next") {
      this.start += this.increment;
      this.choice(
        createChoices(this.read(this.start, this.increment, false), [
          "Exit",
          "Next",
          "Prev",
        ])
      );
    }
    if (choiced == "Prev") {
      this.choice(
        createChoices(this.read(this.start, this.increment, true), [
          "Exit",
          "Next",
          "Prev",
        ])
      );
      this.start -= this.increment;
    }
    if (choiced !== "Exit") {
      return;
    }
  }

  read(start: number, offset: number, isReverse: boolean) {
    if (isReverse) {
      return this.reader.readReverse(start, offset);
    } else {
      return this.reader.read(start, offset);
    }
  }
}
