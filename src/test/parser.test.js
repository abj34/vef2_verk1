/* eslint-disable quotes */
import { describe, expect, it } from "@jest/globals";
import { parse, JsonToCSV, filter } from "../lib/parser";
import { readFile } from "../lib/file";

describe("parser", () => {
  describe("parse", () => {
    it("should read .csv file and break each line into array", async () => {
      const input = await readFile("./src/test/test-folder/realtest.csv");
      const result = parse(input);
      expect(result).toEqual([
        ["Það", "Ætti", "Að", "Vera", "Svona", ""],
        [
          "Tíminn",
          "Mun sýna hvernig þetta",
          "Muni",
          "Virka",
          "https://vonandi.is",
        ],
        ["FOO", "Fai Fum Famm", "Boon", "BANN", "https://BRAKK.is"],
        ["6", "2", "22", "1", "31"],
      ]);
    });

    it("should return nothing if not a string", async () => {
      const input = [1, 2, 3, 4, 5, 6];
      const result = parse(input);
      expect(result).toEqual([]);
    });

    it("should return a CSV string out of a JSON", async () => {
      const input = [{
        "number": "145",
        "string": "first string",
        "works": "yes"
      },
      {
        "number": "796",
        "string": "second string",
        "works": "no"
      }];
      const keys = ['number', 'string', 'works'];
      const result = JsonToCSV(input, keys);
      expect(result).toEqual('number;string;works\r\n145;first string;yes\r\n796;second string;no');
    });

    it("should return empty if first line is not the default header", async () => {
      const input = [['x', 'y', 'z', '1212'],
        ['HBA303', 'Kenslutími', '6', 'Vetur', 'Nám', 'https://ugla.hi.is/alvöru-síða']];
      const result = filter(input);
      expect(result).toEqual([]);
    });

    it("should remove first element in array if empty", async () => {
      const input = [
        ['Númer', 'Heiti', 'Einingar', 'Kennslumisseri', 'Námstig', ''],
        ['','HBA303', 'Kenslutími', '6', 'Vetur', 'Nám', 'https://ugla.hi.is/alvöru-síða']
      ];
      const result = filter(input);
      expect(result).toEqual([['Númer', 'Heiti', 'Einingar', 'Kennslumisseri', 'Námstig', ''],
        ['HBA303', 'Kenslutími', '6', 'Vetur', 'Nám', 'https://ugla.hi.is/alvöru-síða']
      ]);
    });

    it("should remove array line if longer than 6 elements", async () => {
      const input = [
        ['Númer', 'Heiti', 'Einingar', 'Kennslumisseri', 'Námstig', ''],
        ['HBA303', 'Kenslutími', '6', 'foo','Vetur', 'Nám', 'https://ugla.hi.is/alvöru-síða']
      ];
      const result = filter(input);
      expect(result).toEqual([['Númer', 'Heiti', 'Einingar', 'Kennslumisseri', 'Námstig', '']]);
    });

    it("should remove array line if class does not have a name", async () => {
      const input = [
        ['Númer', 'Heiti', 'Einingar', 'Kennslumisseri', 'Námstig', ''],
        ['HBA303', '', '6', 'Vetur', 'Nám', 'https://ugla.hi.is/alvöru-síða']
      ];
      const result = filter(input);
      expect(result).toEqual([['Númer', 'Heiti', 'Einingar', 'Kennslumisseri', 'Námstig', '']]);
    });

    it("should return number as decimal if it has a ',' in it", async () => {
      const input = [
        ['Númer', 'Heiti', 'Einingar', 'Kennslumisseri', 'Námstig', ''],
        ['HBA303', 'Kenslutími', '6,5', 'Vetur', 'Nám', 'https://ugla.hi.is/alvöru-síða']
      ];
      const result = filter(input);
      expect(result).toEqual([['Númer', 'Heiti', 'Einingar', 'Kennslumisseri', 'Námstig', ''],
        ['HBA303', 'Kenslutími', 6.5, 'Vetur', 'Nám', 'https://ugla.hi.is/alvöru-síða']
      ]);
    });

    it("should return empty string if number has '.' in it", async () => {
      const input = [
        ['Númer', 'Heiti', 'Einingar', 'Kennslumisseri', 'Námstig', ''],
        ['HBA303', 'Kenslutími', '6.15', 'Vetur', 'Nám', 'https://ugla.hi.is/alvöru-síða']
      ];
      const result = filter(input);
      expect(result).toEqual([['Númer', 'Heiti', 'Einingar', 'Kennslumisseri', 'Námstig', ''],
        ['HBA303', 'Kenslutími', '', 'Vetur', 'Nám', 'https://ugla.hi.is/alvöru-síða']
      ]);
    });

    it("should remove line in array if semester is empty", async () => {
      const input = [
        ['Númer', 'Heiti', 'Einingar', 'Kennslumisseri', 'Námstig', ''],
        ['HBA303', 'Kenslutími', '6', 'Vetur', '', 'https://ugla.hi.is/alvöru-síða']
      ];
      const result = filter(input);
      expect(result).toEqual([['Númer', 'Heiti', 'Einingar', 'Kennslumisseri', 'Námstig', '']]);
    });

    it("should return without webpage is not valid page", async () => {
      const input = [
        ['Númer', 'Heiti', 'Einingar', 'Kennslumisseri', 'Námstig', ''],
        ['HBA303', 'Kenslutími', '6', 'Vetur', 'Nám', 'xpxhttps://ugla.hi.is/alvöru-síða'],
        ['HBA303', 'Kenslutími', '6', 'Vetur', 'Nám', 'ekki alvöru síða']
      ];
      const result = filter(input);
      expect(result).toEqual([['Númer', 'Heiti', 'Einingar', 'Kennslumisseri', 'Námstig', ''],
        ['HBA303', 'Kenslutími', '6', 'Vetur', 'Nám', ''],
        ['HBA303', 'Kenslutími', '6', 'Vetur', 'Nám', '']
      ]);
    });
  });
});
