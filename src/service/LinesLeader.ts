const readline = require('readline');

export class LinesLeader {
    static readLines(message?: string) {
        const lines: string[] = [];

        const reader = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        
        reader.write(message);

        reader.prompt();
        reader.on('line',  (input: string) => {
            lines.push(input);
        });
        reader.on('close', (input: string) => {
            console.log(lines.join('\n'));
            process.exit(0);
        });
    }
}
