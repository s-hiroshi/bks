const inquirer = require('inquirer');
const fs = require('fs')
import { createStorage } from "../service/createStorage";
// import { createChoices } from '../service/choices'

export class ConfigureControl implements Control {
    controlCharactor = 'configure';
    private storageTypes = ['local', 'GitHub'];
    private config = {
        'STORAGE_TYPE': 'local',
        'STORAGE_PATH': 'storage/data.json',
        'GITHUB_TOKEN': '',
        'GIST_ID': ''
    }

    getControlCharactor(): string {
        return this.controlCharactor
    }

    async execute() {
        this.config.STORAGE_TYPE = await inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'context',
                    message: 'Which one do you want to configure',
                    choices: this.storageTypes,
                    loop: false
                },
            ])
            .then((answer: Answer) => {
                return answer.context
            });

        if (this.config.STORAGE_TYPE === 'local') {
            this.config.STORAGE_PATH = await inquirer
                .prompt(
                    [
                        {
                            name: 'context',
                            message: 'Input local data storage path',
                            default: 'storage/data.json',
                            loop: false
                        }
                    ]
                )
                .then((answer: Answer) => {
                    return answer.context;

                });
            createStorage(`${process.cwd()}/${this.config.STORAGE_PATH}`)
        }
        if (this.config.STORAGE_TYPE === 'GitHub') {
            this.config.STORAGE_PATH = await inquirer
                .prompt(
                    [
                        {
                            name: 'context',
                            message: 'Input local data storage path',
                            default: 'storage/data.json',
                            loop: false
                        }
                    ]
                )
                .then((answer: Answer) => {
                    return answer.context;
                });
            createStorage(`${process.cwd()}/${this.config.STORAGE_PATH}`)

            this.config.GITHUB_TOKEN = await inquirer
                .prompt(
                    [
                        {
                            name: 'context',
                            message: 'Input GitHub personal access token',
                            loop: false
                        }
                    ]
                )
                .then((answer: Answer) => {
                    return answer.context;
                });

            this.config.GIST_ID = await inquirer
                .prompt(
                    [
                        {
                            name: 'context',
                            message: 'Input gist id',
                            loop: false
                        }
                    ]
                )
                .then((answer: Answer) => {
                    return answer.context;
                });

        }

        fs.writeFileSync(
            `${process.cwd()}/.env`,
            `STORAGE_TYPE=${this.config.STORAGE_TYPE}
STORAGE_PATH=${this.config.STORAGE_PATH}
GITHUB_TOKEN=${this.config.GITHUB_TOKEN}
GIST_ID=${this.config.GIST_ID}`,
            { flag: 'w+' },
            (err: any) => {
                if (err) throw err;
            }
        );
    }
}