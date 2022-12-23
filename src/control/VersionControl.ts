export class VersionControl implements Control {
    controlCharactor = 'version';

    getControlCharactor(): string {
        return this.controlCharactor
    }

    async execute() {
        console.log('0.0.12');
    }
}