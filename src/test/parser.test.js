import { describe, expect, it } from "@jest/globals";
import { parse } from "../lib/parser";
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

    it("should return nothing if not string??", async () => {
      const input = [1, 2, 3, 4, 5, 6];
      const result = parse(input);
      expect(result).toEqual([]);
    });
  });
});
