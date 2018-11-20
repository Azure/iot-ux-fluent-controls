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
    const projectRoot = process.env.INIT_CWD;
    const srcFolder = path.resolve(projectRoot, 'src');
    if (await notExists(srcFolder)) {
        await mkdir(srcFolder);
    }

    const srcStylesFolder = path.resolve(srcFolder, 'styles');
    if (await notExists(srcStylesFolder)) {
        await mkdir(srcStylesFolder);
    }

    const srcStylesColorsFile = path.resolve(srcStylesFolder, '_colors.scss');
    if (await notExists(srcStylesColorsFile)) {
        await copyFile(path.resolve(__dirname, '../../src/styles/_colors.scss'), srcStylesColorsFile);
    }
}

main().catch(err => {
    console.error(err);
    process.exit(-1);
});
