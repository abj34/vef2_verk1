import { mkdir, writeFile } from 'fs/promises';
import path, { join } from 'path';
import { direxists, readFilesFromDir, readFile } from './lib/file';


const DATA_DIR = './data';
const OUTPUT_DIR = './dist';

async function main() {
    //Búa til dist möppu ef hún er ekki til
    if(!(await direxists(OUTPUT_DIR))) {
        await mkdir(OUTPUT_DIR);
    }

    const dataFiles = await readFilesFromDir(DATA_DIR);
    const results = [];
    
}

main().catch((err) => console.error(err));