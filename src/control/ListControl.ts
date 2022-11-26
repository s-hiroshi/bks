const inquirer = require('inquirer');
const op = require('open');

export class ListControl implements Control {
    controlCharactor = 'list';

    constructor(private reader: Reader) {

    }

    getControlCharactor(): string {
        return this.controlCharactor
    }

    execute() {
        console.log(this.reader.readAll());
    }
}