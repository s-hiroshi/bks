#!/usr/bin/env node

const program = require('commander');

import { App } from './controller/app';
import { ItemReader } from './model/ItemReader';
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
import { createStorage } from './service/createStorage';

require('dotenv').config();

let storage = '';
if (!process.env.STORAGE_PATH) {
    createStorage(`${process.cwd()}/storage/data.json`)
    storage= `${process.cwd()}/storage/data.json`;
}

if (process.env.STORAGE_PATH) {
    storage = `${process.cwd()}/${process.env.STORAGE_PATH}`;
}

const reader: Reader = new ItemReader(storage);
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

(function () {
    const app = new App(reader, writer, controlRepository);
    program.parse(process.argv)
    app.run(program.args);
}());
