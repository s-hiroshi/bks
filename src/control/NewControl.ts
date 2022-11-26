const inquirer = require('inquirer');

/**
 * Repositoryにaddして利用
 */
export class NewControl implements Control {
    controlCharactor = 'new';
    constructor(private writer: Writer) {

    }
    getControlCharactor(): string {
        return this.controlCharactor
    }

    async execute() {
        const item: Item = {
            keyword: '',
            content: ''
        };
        await inquirer
            .prompt([
                {
                    name: 'context',
                    message: 'keyword',
                    default: 'keyword',
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

        console.log('Completed.');
    }
};