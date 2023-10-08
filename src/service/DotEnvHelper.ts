const fs = require("fs");

export class DotEnvHelper {
  static readonly storageTypes = ["local", "GitHub"];
  static readonly homeDir =
    process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];

  static getPromptOption(prop: string) {
    switch (prop) {
      case "STORAGE_TYPE":
        return [
          {
            type: "list",
            name: "context",
            message: "Which one do you want to configure",
            choices: this.storageTypes,
            loop: false,
          },
        ];
      case "STORAGE_PATH":
        return [
          {
            name: "context",
            message: "Input local data storage path",
            default: `${this.homeDir}/.config/s-hiroshi/bks/data.json`,
            loop: false,
          },
        ];
      case "GITHUB_TOKEN":
        return [
          {
            name: "context",
            message: "Input GitHub personal access token",
            loop: false,
          },
        ];
      case "GIST_ID":
        return [
          {
            name: "context",
            message: "Input gist id",
            loop: false,
          },
        ];
      case "HISTORY_STORAGE_PATH":
        return [
          {
            name: "context",
            message: "Input History File(Optionl)",
            default: `${this.homeDir}/.config/s-hiroshi/bks/.history`,
            loop: false,
          },
        ];
      default:
        break;
    }
  }

  static set(prop: string, value: string) {
    require("dotenv").config({
      path: `${DotEnvHelper.homeDir}/.config/s-hiroshi/bks/.env`,
      override: true,
    });
    process.env[prop] = value;
    fs.writeFileSync(
      `${DotEnvHelper.homeDir}/.config/s-hiroshi/bks/.env`,
      `STORAGE_TYPE=${process.env.STORAGE_TYPE}
STORAGE_PATH=${process.env.STORAGE_PATH}
GITHUB_TOKEN=${process.env.GITHUB_TOKEN}
GIST_ID=${process.env.GIST_ID}
HISTORY_STORAGE_PATH=${process.env.HISTORY_STORAGE_PATH}`,
      { flag: "w+" },
      (err: any) => {
        if (err) throw err;
      }
    );
  }
}
