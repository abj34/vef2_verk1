/* eslint-disable quotes */

import { debug } from "console";
import { mkdir, writeFile } from "fs/promises";
import path, { join } from "path";
import { direxists, readFilesFromDir, readFile } from "./lib/file.js";
import { statsTemplate, indexTemplate } from "./lib/html.js";
import { parse, JsonToCSV, filter } from "./lib/parser.js";
import data from "../data/index.json" assert { type: "json" };

const DATA_DIR = "./data";
const OUTPUT_DIR = "./dist";

async function main() {
  // Búa til dist möppu ef hún er ekki til
  if (!(await direxists(OUTPUT_DIR))) {
    await mkdir(OUTPUT_DIR);
  }

  const dataFiles = await readFilesFromDir(DATA_DIR);
  const results = [];

  for (const file of dataFiles) {
    // eslint-disable-next-line no-await-in-loop
    const content = await readFile(file);

    if (content) {
      const title = path.basename(file);
      const parsing = parse(content);
      const classes = filter(parsing);
      const filename = `${title.replace(".csv", "")}.html`;

      const result = {
        title,
        filename,
        classes,
      };
      results.push(result);

      const filepath = join(OUTPUT_DIR, filename);
      const template = statsTemplate(title, result);

      if (title !== "index.json") {
        // eslint-disable-next-line no-await-in-loop
        await writeFile(filepath, template, { flag: "w+" });
      }
    }
  }

  const indexCSV = JsonToCSV(data, ["title", "description", "csv"]);
  const indexClass = parse(indexCSV);
  const template = indexTemplate(indexClass);
  const filepath = join(OUTPUT_DIR, "index.html");

  // eslint-disable-next-line no-await-in-loop
  await writeFile(filepath, template, { flag: "w+" });
}

main().catch((err) => console.error(err));
