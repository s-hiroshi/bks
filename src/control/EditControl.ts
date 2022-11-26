import { createChoices } from "../service/createChoices";

const inquirer = require('inquirer');

export class EditControl implements Control {
    controlCharactor = 'edit';

    constructor(private reader: Reader, private writer: Writer) { }

    getControlCharactor(): string {
        return this.controlCharactor
    }

    async execute() {
        let choices = this.reader.readAll().map((item: Item) => {
            return `keyword: ${item.keyword}\n  url: ${item.content}`;
        });

        if (choices.length < 1) {
            console.log('Content not Founded')
            return false;
        }

        choices = createChoices(choices, ['Exit']);

        const choiced = await inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'context',
                    message: 'Which one do you want to edit',
                    choices: choices,
                    loop: false
                },
            ])
            .then((answer: Answer) => {
                return answer.context
            });

        if (choiced === 'Exit') {
            return false;
        }

        const choicedItem = this.getChoicedItem(choiced);
        const item: Item = {
            keyword: '',
            content: ''
        };

        await inquirer
            .prompt([
                {
                    name: 'context',
                    message: 'keyword',
                    default: choicedItem.keyword,
                },
            ])
            .then((answer: Answer) => {
                item.keyword = answer.context;
                /*
                * Promiseを返却
                * 次のthenで受ける
                */
                return inquirer.prompt([
                    {
                        name: 'context',
                        message: 'url',
                        default: choicedItem.content
                    },
                ]);
            })
            .then((answer: Answer) => {
                // 一番外側の戻り値
                item.content = answer.context;

            });

        this.writer.edit(item, { 'keyword': choicedItem.keyword, 'content': choicedItem.content })
        console.log('Completed');

    }

    getChoicedItem(choiced: string) {
        const choice = choiced.split('\n')
        const keyword = choice[0].trim().split(' ')[1];
        const url = choice[1].trim().split(' ')[1]
        return {
            keyword: keyword,
            content: url
        }
    }
}