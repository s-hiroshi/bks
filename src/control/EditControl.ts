const inquirer = require('inquirer');

export class EditControl implements Control {
    controlCharactor = 'edit';

    constructor(private reader: Reader, private writer: Writer) { }

    getControlCharactor(): string {
        return this.controlCharactor
    }

    async execute() {
        let choices = this.reader.readAll().map((item: Item) => {
            return `${item.keyword}::${item.content}`;
        });
        // choices = createChoices(choices)

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



        const item: Item = {
            keyword: '',
            content: ''
        };
        await inquirer
            .prompt([
                {
                    name: 'context',
                    message: 'keyword',
                    default: 'example',
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
                        default: 'https://example.com'
                    },
                ]);
            })
            .then((answer: Answer) => {
                // 一番外側の戻り値
                item.content = answer.context;

            });

        this.writer.add(item);
        this.writer.delete(choiced.split('::')[0], choiced.split('::')[1]);

    }
}