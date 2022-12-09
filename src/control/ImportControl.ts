const inquirer = require('inquirer');
const fs = require('fs')
import { parseBookmark } from "../service/parseBookmarks";

export class ImportControl implements Control {
    controlCharactor = 'import';

    constructor(private writer: Writer) { }

    getControlCharactor(): string {
        return this.controlCharactor
    }

    async execute() {
        const file = await inquirer
            .prompt(
                [
                    {
                        name: 'context',
                        message: 'Input Google Chrome exported bookmark file',
                        loop: false
                    }
                ]
            )
            .then((answer: Answer) => {
                return answer.context;
            });

        console.log(fs.existsSync(file));
        try {
            if (!fs.existsSync(file)) {
                console.log(`file is not found: ${file}`);
            }
            const items = await parseBookmark(file);
            this.writer.addAll(items);
        } catch (err) {
            console.error(err)
        }
    }
}