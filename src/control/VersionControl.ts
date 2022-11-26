const fs = require('fs');
require('dotenv').config();
import { Octokit, App } from "octokit";
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
export class VersionControl implements Control {
    controlCharactor = 'version';

    getControlCharactor(): string {
        return this.controlCharactor
    }

    execute() {
        console.log('0.0.9');
    }
}