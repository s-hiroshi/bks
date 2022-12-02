const inquirer = require('inquirer');
const op = require('open');
import { createChoices } from '../service/createChoices'

export class RemoveControl implements Control {
    controlCharactor = 'rm';

    constructor(private reader: Reader, private writer: Writer) { }

    getControlCharactor(): string {
        return this.controlCharactor
    }

    async execute() {
        let  choices = this.reader.readAll().map((item: Item) => {
            return  `${item.keyword}::${item.content}`;
        });
        choices = createChoices(choices, ['Exit'])

        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'context',
                    message: 'Which one do you want to remove',
                    choices: choices,
                    loop: false
                },
            ])
            .then((answer: Answer) => {
                if (answer.context !== 'Exit') {
                const choiced = answer.context.split('::');
                this.writer.delete(choiced[0], choiced[1]);
                }
            });

    }
}