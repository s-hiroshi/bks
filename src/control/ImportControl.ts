const inquirer = require('inquirer');
const fs = require('fs')

export class ImportControl implements Control {
    controlCharactor = 'import';
    
    constructor(private reader: Reader) { }

    getControlCharactor(): string {
        return this.controlCharactor
    }

    async execute() {
        const file = await inquirer
            .prompt(
                [
                    {
                        name: 'context',
                        message: 'Input Chrome exported bookmark file',
                        loop: false
                    }
                ]
            )
            .then((answer: Answer) => {
                return answer.context;
            });

        
        // parseBookmarks
        // write bookmark data to data.json 

    }
}