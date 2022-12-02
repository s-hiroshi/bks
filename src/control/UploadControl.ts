const fs = require('fs');
const homeDir = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
require('dotenv').config({ path: `${homeDir}/.config/s-hiroshi/bks/.env` });
import { Octokit, App } from "octokit";
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export class UploadControl implements Control {
    controlCharactor = 'upload';

    constructor() { }

    getControlCharactor(): string {
        return this.controlCharactor
    }

    async execute() {
        /*
         * Authentication
         */
        const {
            data: { login },
        } = await octokit.rest.users.getAuthenticated();

        /*
         * @see
         * https://stackoverflow.com/questions/65518288/python-how-to-edit-update-a-github-gist
         */
        let content = '';
        if (fs.existsSync(process.env.STORAGE_PATH)) {
            content =
                fs.readFileSync(process.env.STORAGE_PATH, { encodin: 'utf8' }).toString();
        }
        octokit.rest.gists.update({
            "gist_id": process.env.GIST_ID!,
            files: { "bks-contents.json": { "content": content } },
        });
    }
}