import { readdir, readFile as fsReadFile, stat } from "fs/promises";
import { join } from "path";

/**
 * Athuga ef mappa er til
 * @param {string} dir Mappa sem er athugað á
 * @returns 'true' ef hún er til, 'false' ef ekki
 */
export async function direxists(dir) {
  try {
    const info = await stat(dir);
    return info.isDirectory();
  } catch (e) {
    return false;
  }
}

/**
 * Athugar hvaða skjal eru inni í möppunni og skilar lista af þeim
 * @param {string} dir Mappa sem er athugað á
 * @returns {string[]} Listi af skjölum og slóðin að þeim, tómt ef ekkert er í möppu eða error
 */
export async function readFilesFromDir(dir) {
  let files = [];
  try {
    files = await readdir(dir);
  } catch (e) {
    return [];
  }

  const mapped = files.map(async (file) => {
    const path = join(dir, file);
    const info = await stat(path);

    if (info.isDirectory()) {
      return null;
    }

    return path;
  });

  const resolved = await Promise.all(mapped);

  // Ef null, fjarlægja úr lista
  return resolved.filter(Boolean);
}

/**
 * Les skjal og skilar innihaldi
 * @param {string} file skjalið
 * @param {object} encoding ritháttur sem vilt sýna í
 * @returns {Promise<string | null>} innihald skjals, null ef ekkert
 */
export async function readFile(file, { encoding = "utf8" } = {}) {
  try {
    const content = await fsReadFile(file);
    const binaryBuffer = Buffer.from(content, "binary").toString("binary");
    return binaryBuffer.toString(encoding);
  } catch (e) {
    return null;
  }
}
