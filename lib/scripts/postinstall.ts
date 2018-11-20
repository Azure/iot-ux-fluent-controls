import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import * as util from 'util';

declare const __dirname: string;

const access = util.promisify(fs.access);
const copyFile = util.promisify(fs.copyFile);
const mkdir = util.promisify(fs.mkdir);

async function notExists(p: string) {
    try {
        await access(p);
        return false;
    } catch (err) {
        return true;
    }
}

async function main() {
    if (await notExists('./src/')) {
        await mkdir('./src/');
    }

    if (await notExists('./src/styles/')) {
        await mkdir('./src/styles/');
    }

    if (await notExists('./src/styles/_colors.scss')) {
        await copyFile(path.resolve(__dirname, '../../src/styles/_colors.scss'), './src/styles/_colors.scss');
    }
}

main().catch(err => {
    console.error(err);
    process.exit(-1);
});
