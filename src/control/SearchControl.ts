const inquirer = require('inquirer');
const open = require('open');

export class SearchControl implements Control {
    controlCharactor = 'search';

    getControlCharactor(): string {
        return this.controlCharactor
    }

    async execute(query?: string) {
        if (!query) {
            const query = await inquirer
                .prompt([
                    {
                        name: 'context',
                        message: 'Type a search word or phrase',
                        default: '',
                    },
                ])
                .then((answer: Answer) => {
                    return answer.context;
                })
        }
        if (!query) {
            console.log('There was no input.');
        } else {
            const queries = query.split(/(\s|,)/);
            open(`https://www.google.com/search?q=${queries.join('+')}`)
        }

    }
}