const inquirer = require('inquirer');
import { createChoices } from "../service/createChoices";

export class FindControl implements Control {
    controlCharactor = 'find';

    constructor(private reader: Reader) { }

    getControlCharactor(): string {
        return this.controlCharactor
    }

    async execute(query?: string) {
        if (!query) {
            query = await inquirer
                .prompt([
                    {
                        name: 'context',
                        message: 'Type a keyword or url',
                        default: '',
                    },
                ])
                .then((answer: Answer) => {
                    return answer.context;
                })

        }
        const items: Item[] = this.reader.readItem(query!, query!);

        if (items.length > 0) {
            const contents = items.map((item, index) => {
                return item.content;
            })
            const choices = createChoices(contents, ['Exit']);
            const choiced = await inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'context',
                        message: 'Which one do you want to open',
                        choices: choices,
                        loop: false
                    },
                ])
                .then((answer: Answer) => {
                    return answer.context
                });
            if (choiced !== 'Exit') {
                return choiced;
            }
        }

    }
}