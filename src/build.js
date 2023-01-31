import { mkdir, writeFile } from 'fs/promises';
import path, { join } from 'path';
import { direxists, readFilesFromDir, readFile } from './lib/file.js';
import { statsTemplate } from './lib/html.js';
import { parse } from './lib/parser.js'


const DATA_DIR = './data/*.csv';
const INDEX_DIR = './data/index.json';
const OUTPUT_DIR = './dist';

async function main() {
    //Búa til dist möppu ef hún er ekki til
    if(!(await direxists(OUTPUT_DIR))) {
        await mkdir(OUTPUT_DIR);
    }

    const dataFiles = await readFilesFromDir(DATA_DIR);
    const results = [];

        
    const content = [
        ["Það","Ætti","Að","Vera","Svona","",],
        ["Tíminn","Mun sýna hvernig þetta","Muni","Virka","https://vonandi.is",],
        ["FOO","Fai Fum Famm","Boon","BANN","https://BRAKK.is"]
    ];

    if(content) {
        const title = 'Test';
        const classes = content;
        const filename = `${title}.html`;

        const result = {
            title,
            filename,
            classes,
        };
        results.push(result);

        const filepath = join(OUTPUT_DIR, filename);
        const template = statsTemplate(title, result);
        
        await writeFile(filepath, template, { flag: 'w+' });
    }
}

main().catch((err) => console.error(err));