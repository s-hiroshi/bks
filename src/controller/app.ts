const open = require('open');
import { parseSite } from '../service/parseSite';
import { ControlRepository } from '../control/ControlRepository';

export class App {
    constructor(private reader: Reader, private writer: Writer, private controlRepository: ControlRepository) {

    }

    run(args: any) {
        const [command, query, ...subQeuries] = args
        if (!command) return;
        const control = this.controlRepository.find(command)
        if (control != undefined) {
            try {
                control.execute(query)
            } catch (e: any) {
                console.log(e.message);
            }
            return
        }
        if (! parseSite(args[0])) {
            console.log('Not Domain');
        } else {
            open(parseSite(args[0]));
        }
    }
};