import { DotEnvHelper } from "../service/DotEnvHelper";

const inquirer = require("inquirer");
const fs = require("fs");

export class ConfigureSetControl implements Control {
  // TODO: remove for controlCharactor is unused
  controlCharactor = "configure set";

  private homeDir =
    process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];

  private configProperty: string[] = [
    "STORAGE_TYPE",
    "STORAGE_PATH",
    "GITHUB_TOKEN",
    "GIST_ID",
    "HISTORY_STRAGE",
  ];

  getControlCharactor(): string {
    return this.controlCharactor;
  }

  async execute(query?: string) {
    const configProperty: string = await inquirer
      .prompt([
        {
          type: "list",
          name: "context",
          message: "Which one do you want to set",
          choices: this.configProperty,
          loop: false,
        },
      ])
      .then((answer: Answer) => {
        return answer.context;
      });
    if (!this.configProperty.includes(configProperty)) {
      return;
    }

    const configPropertyValue: string = await inquirer
      .prompt(DotEnvHelper.getPromptOption(configProperty))
      .then((answer: Answer) => {
        return answer.context;
      });

    DotEnvHelper.set(configProperty, configPropertyValue);
  }
}
