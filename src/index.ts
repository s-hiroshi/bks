#!/usr/bin/env node

const program = require('commander');

import { Controller } from './controller/controller';
import { ItemReaderOneLine } from './model/ItemReaderOneLine';
import { ItemWriter } from './model/ItemWriter';
import { ControlRepository } from './control/ControlRepository';
import { NewControl } from './control/NewControl';
import { SearchControl } from './control/SearchControl';
import { ListControl } from './control/ListControl';
import { FindControl } from './control/FindControl';
import { ExpandedFinder } from './control/ExpandedFinder';
import { RemoveControl } from './control/RemoveControl';
import { EditControl } from './control/EditControl';
import { DowonloadControl } from './control/DownloadControl';
import { UploadControl } from './control/UploadControl';
import { HelpControl } from './control/HelpControl';
import { VersionControl } from './control/VersionControl';
import { ConfigureControl } from './control/ConfigureControl';
import { ImportControl } from './control/ImportControl';
import { createStorage } from './service/createStorage';

const homeDir = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];

require('dotenv').config({ path: `${homeDir}/.config/s-hiroshi/bks/.env` });

let storage = '';
if (!process.env.STORAGE_PATH) {
    createStorage(`${homeDir}/.config/s-hiroshi/bks/data.json`);
    storage = `${homeDir}/.config/s-hiroshi/bks/data.json`;
}

if (process.env.STORAGE_PATH) {
    storage = process.env.STORAGE_PATH;
}

const app = async () => {
    const reader: Reader = new ItemReaderOneLine(storage);
    const writer: Writer = new ItemWriter(storage);
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

    const controller = new Controller(reader, writer, controlRepository);
    program.parse(process.argv)
    controller.run(program.args);
};
app();
