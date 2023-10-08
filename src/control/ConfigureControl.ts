const inquirer = require("inquirer");
const fs = require("fs");
import { DotEnvHelper } from "../service/DotEnvHelper";
import { createStorage } from "../service/createStorage";
import { ConfigureSetControl } from "./ConfigureSetControl";
import { ConfigureShowControl } from "./ConfigureShowControl";

export class ConfigureControl implements Control {
  controlCharactor = "configure";
  private storageTypes = ["local", "GitHub"];
  private homeDir =
    process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
  private config = {
    STORAGE_TYPE: "local",
    STORAGE_PATH: `${this.homeDir}/.config/s-hiroshi/bks/data.json`,
    GITHUB_TOKEN: "",
    GIST_ID: "",
    HISTORY_STORAGE_PATH: `${this.homeDir}/.config/s-hiroshi/bks/.history`,
  };

  getControlCharactor(): string {
    return this.controlCharactor;
  }

  async execute(query?: string) {
    if (query != null) {
      // TODO: Move to controller.ts
      switch (query) {
        case "set":
          new ConfigureSetControl().execute();
          break;
        case "show":
          new ConfigureShowControl().execute();
          break;
        default:
          break;
      }
      return;
    }
    this.config.STORAGE_TYPE = await inquirer
      .prompt(DotEnvHelper.getPromptOption("STORAGE_TYPE"))
      .then((answer: Answer) => {
        return answer.context;
      });

    this.config.STORAGE_PATH = await inquirer
      .prompt(DotEnvHelper.getPromptOption("STORAGE_PATH"))
      .then((answer: Answer) => {
        return answer.context;
      });
    createStorage(this.config.STORAGE_PATH);

    if (this.config.STORAGE_TYPE === "GitHub") {
      this.config.GITHUB_TOKEN = await inquirer
        .prompt(DotEnvHelper.getPromptOption("GITHUB_TOKEN"))
        .then((answer: Answer) => {
          return answer.context;
        });

      this.config.GIST_ID = await inquirer
        .prompt(DotEnvHelper.getPromptOption("GIST_ID"))
        .then((answer: Answer) => {
          return answer.context;
        });
    }

    this.config.HISTORY_STORAGE_PATH = await inquirer
      .prompt(DotEnvHelper.getPromptOption("HISTORY_STORAGE_PATH"))
      .then((answer: Answer) => {
        return answer.context;
      });

    fs.writeFileSync(
      `${this.homeDir}/.config/s-hiroshi/bks/.env`,
      `STORAGE_TYPE=${this.config.STORAGE_TYPE}
STORAGE_PATH=${this.config.STORAGE_PATH}
GITHUB_TOKEN=${this.config.GITHUB_TOKEN}
GIST_ID=${this.config.GIST_ID}
HISTORY_STORAGE_PATH=${this.config.HISTORY_STORAGE_PATH}`,
      { flag: "w+" },
      (err: any) => {
        if (err) throw err;
      }
    );
  }
}
