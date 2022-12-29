const inquirer = require('inquirer');
const inquirerPrompt = require('inquirer-autocomplete-prompt');
const open = require('open');
const fuzzy = require('fuzzy');

import { createChoices } from "../service/createChoices";
import { parseSite } from "../service/parseSite";

export class ExpandedFinder implements Control {
    controlCharactor = 'efind';

    choices: string[];

    constructor(private reader: Reader) {
        const items: Item[] = reader.readAll();
        const contents = items.map((item, index) => {
            return item.content;
        })
        this.choices = createChoices(contents, ['Exit']);
    }

    getControlCharactor(): string {
        return this.controlCharactor
    }

    find() {
        // thisを束縛するためにアロー関数を使用
        return (answers: Answer, input = '') => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const results = fuzzy.filter(input, this.choices).map((el: any) => el.original);

                    results.splice(5, 0, new inquirer.Separator());
                    results.push(new inquirer.Separator());
                    resolve(results);
                }, Math.random() * 470 + 30);
            });
        }
    }

    async execute() {
        // @see https://github.com/mokkabonna/inquirer-autocomplete-prompt/blob/master/example.js
        inquirer.registerPrompt('autocomplete', inquirerPrompt);
        if (this.choices) {
            const choiced = await inquirer
                .prompt([
                    {
                        type: 'autocomplete',
                        name: 'context',
                        suggestOnly: false,
                        searchText: 'Finding...',
                        emptyText: 'Nothing found!',
                        message: 'Input keyword',
                        source: this.find(),
                        loop: false
                    },
                ])
                .then((answer: Answer) => {
                    console.log(answer.context)
                    return answer.context
                });
            if (choiced !== 'Exit') {
                open(parseSite(choiced));
            }
        }

    }
}