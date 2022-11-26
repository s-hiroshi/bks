const fs = require('fs');
require('dotenv').config();
import { Octokit, App } from "octokit";
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export class DowonloadControl implements Control {
    controlCharactor = 'download';

    constructor() { }

    getControlCharactor(): string {
        return this.controlCharactor
    }

    execute() {
        (async () => {
            /*
             * Authentication
             */
            const {
                data: { login },
            } = await octokit.rest.users.getAuthenticated();

            /*
             * Download
             * @see
             * https://docs.github.com/ja/rest/reference/gists#get-a-gist
             * https://octokit.github.io/rest.js/v18#gists
             */
            const { data: { files }, } = await octokit.rest.gists.get({ "gist_id": process.env.GIST_ID! });

            fs.writeFileSync(
                `${process.cwd()}/${process.env.STORAGE_PATH}`,
                 JSON.stringify(JSON.parse(files!['bks-contents.json']!.content!)),
                { encoding: 'utf8' },
                (err: Error) => { if (err) throw err;}
                );
        })();
    }
}