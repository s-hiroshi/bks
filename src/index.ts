#!/usr/bin/env node

const program = require("commander");
const fs = require("fs");
const path = require("path");

import { Controller } from "./controller/controller";
import { ItemReader } from "./model/ItemReader";
import { ItemWriter } from "./model/ItemWriter";
import { ControlRepository } from "./control/ControlRepository";
import { NewControl } from "./control/NewControl";
import { SearchControl } from "./control/SearchControl";
import { ListControl } from "./control/ListControl";
import { FindControl } from "./control/FindControl";
import { ExpandedFinder } from "./control/ExpandedFinder";
import { RemoveControl } from "./control/RemoveControl";
import { EditControl } from "./control/EditControl";
import { DowonloadControl } from "./control/DownloadControl";
import { UploadControl } from "./control/UploadControl";
import { HelpControl } from "./control/HelpControl";
import { VersionControl } from "./control/VersionControl";
import { ConfigureControl } from "./control/ConfigureControl";
import { ImportControl } from "./control/ImportControl";
import { createStorage } from "./service/createStorage";
import { HistoryReader } from "./model/HistoryReader";
import { HistoryWriter } from "./model/HistoryWriter";
import { HistoryControl } from "./control/HistoryControl";

const homeDir =
  process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];

// If the .env file does not exist, create it
require("dotenv").config({ path: `${homeDir}/.config/s-hiroshi/bks/.env` });

let storage = "";
if (!process.env.STORAGE_PATH) {
  createStorage(`${homeDir}/.config/s-hiroshi/bks/data.json`);
  storage = `${homeDir}/.config/s-hiroshi/bks/data.json`;
}

if (process.env.STORAGE_PATH) {
  storage = process.env.STORAGE_PATH;
}
let historyStorage = "";
if (!process.env.HISTORY_STORAGE_PATH) {
  fs.mkdirSync(
    path.dirname(`${homeDir}/.config/s-hiroshi/bks/.history`),
    { recursive: true },
    (err: any) => {
      if (err) throw err;
    }
  );
  // @see https://flaviocopes.com/how-to-create-empty-file-node/
  fs.closeSync(fs.openSync(`${homeDir}/.config/s-hiroshi/bks/.history`, "w"));
  historyStorage = `${homeDir}/.config/s-hiroshi/bks/.history`;
}

if (process.env.HISTORY_STORAGE_PATH) {
  historyStorage = process.env.HISTORY_STORAGE_PATH;
}

const app = async () => {
  const reader: Reader = new ItemReader(storage);
  await reader.init();
  const writer: Writer = new ItemWriter(storage);
  const historyWriter = new HistoryWriter(historyStorage);
  await historyWriter.init();
  const historyReader = new HistoryReader(historyStorage);
  await historyReader.init();
  const controlRepository: ControlRepository = new ControlRepository();
  controlRepository.add(new NewControl(writer));
  controlRepository.add(new SearchControl());
  controlRepository.add(new ListControl(reader));
  controlRepository.add(new FindControl(reader));
  controlRepository.add(new ExpandedFinder(reader));
  controlRepository.add(new RemoveControl(reader, writer));
  controlRepository.add(new EditControl(reader, writer));
  controlRepository.add(new DowonloadControl());
  controlRepository.add(new UploadControl());
  controlRepository.add(new HelpControl());
  controlRepository.add(new VersionControl());
  controlRepository.add(new ConfigureControl());
  controlRepository.add(new ImportControl(writer));
  controlRepository.add(new HistoryControl(historyReader));

  const controller = new Controller(
    reader,
    writer,
    historyWriter,
    controlRepository
  );
  program.parse(process.argv);
  controller.run(program.args);
};
app();
