/* eslint-disable no-continue */
/* eslint-disable quotes */

/**
 * Skiptir CSV skjali niður í 2D array
 * @param {string} input CSV skjal sem er fært yfir í Array
 * @returns 2D array með innihaldi skipt eftir línum
 */
export function parse(input) {
  if (typeof input !== "string") {
    return [];
  }

  // Það er greinilega '\r\n' í windows en '\n' virkar á öðrum stýrikerfum??
  const split = input.split("\r\n");

  // eslint-disable-next-line arrow-body-style
  const mapped = split.map((i) => {
    return i.split(";");
  });

  return mapped;
}

/**
 * Færa JSON skjal yfir í CSV format
 * @param {JSON} input JSON skjal
 * @param {string[]} keys Lyklar í JSON skjali
 * @returns CSV strengur
 */
export function JsonToCSV(input, keys) {
  const JSONCSV = [
    keys.join(";"),
    ...input.map((row) => keys.map((k) => row[k] || "").join(";")),
  ].join("\r\n");

  return JSONCSV;
}

/**
 * Filter'ar niður innihald eftir ákveðnum sviðum
 * @param {string[]} input
 * @returns filter'að array
 */
export function filter(input) {
  // dummy solution, NOT GOOD!! - fæ ekki input[0] !== [array] til að virka
  if (
    input[0][0] !== "Númer" &&
    input[0][1] !== "Heiti" &&
    input[0][2] !== "Einingar" &&
    input[0][3] !== "Kennslumisseri" &&
    input[0][4] !== "Námstig" &&
    input[0][5] !== ""
  ) {
    return [];
  }

  for (let i = 1; i < input.length; i += 1) {
    if (input[i][0] === "") {
      input[i].shift();
    }

    if (input[i].length === 7) {
      input.splice(i);
      continue;
    }

    if (input[i][1] === undefined || input[i][1] === "") {
      input.splice(i);
      continue;
    }

    if (input[i][2] === undefined || typeof input[i][2] !== "number") {
      if (input[i][2].includes(".")) {
        // eslint-disable-next-line no-param-reassign
        input[i][2] = "";
      }
      if (input[i][2].includes(",")) {
        // eslint-disable-next-line no-param-reassign
        input[i][2] = parseFloat(input[i][2].replace(",", "."));
      }
    }

    //  if (input[i][3] === 'Vor' || input[i][3] === 'Haust' || input[i][3] === 'Sumar') {
    //    //continue;
    //  } else {
    //    input.splice(i);
    //    continue;
    //  }

    if (input[i][4] === "") {
      input.slice(i);
      continue;
    }

    if (!input[i][5].startsWith("https://ugla.hi.is")) {
      // eslint-disable-next-line no-param-reassign
      input[i][5] = "";
    }
  }

  return input;
}
