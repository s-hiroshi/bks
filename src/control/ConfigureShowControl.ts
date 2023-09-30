const inquirer = require("inquirer");
const fs = require("fs");
import { readLines } from "../service/readLines";

export class ConfigureShowControl implements Control {
  controlCharactor = "configure list";
  private homeDir =
    process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
  private configPath = `${this.homeDir}/.config/s-hiroshi/bks/.env`;

  getControlCharactor(): string {
    return this.controlCharactor;
  }

  async execute() {
    console.log(await readLines(this.configPath));
  }
}
