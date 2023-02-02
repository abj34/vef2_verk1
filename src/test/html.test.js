/* eslint-disable quotes */
import { describe, expect, it } from "@jest/globals";
import { index, stats } from "../lib/html";

describe("html", () => {
    describe("stats", () => {
        it("should return html table out of an array", async () => {
            const input = {classes:[
                ['Númer', 'Heiti', 'Einingar', 'Kennslumisseri', 'Námstig', ''],
                ['HBA303', 'Kenslutími', '6', 'Vetur', 'Nám', 'https://ugla.hi.is/alvöru-síða']
              ]};
            const result = stats(input);
            expect(result).toEqual(`
  <h2 class="title"></h2>
  <p class="description"></p>
        <table id="myTable">
        <tr>
                <th onclick="sortTable(0)">Númer</th><th onclick="sortTable(1)">Heiti</th><th onclick="sortTable(2)">Einingar</th><th onclick="sortTable(3)">Kennslumisseri</th><th onclick="sortTable(4)">Námstig</th><th onclick="sortTable(5)"></th>
                </tr>
        <tr>
                <td>HBA303</td><td>Kenslutími</td><td>6</td><td>Vetur</td><td>Nám</td><td>https://ugla.hi.is/alvöru-síða</td>
                </tr>
        </table>`);
          });
    });


    describe("index", () => {
        it("", async () => {
            // eslint-disable-next-line max-len
            const input = [["The Header", "this should be some kind of text that you read", "firstpage.csv"],
                // eslint-disable-next-line max-len
                ["Another Header", "This is something that will be read and people will understand", "secondpage.csv"]
            ];
            const result = index(input);
            expect(result).toEqual(`<section>
            <h1>Kennsluskrá</h1>
            <ul>
            <li>
              <h2>The Header</h2>
              <p>this should be some kind of text that you read</p>
              <a href="firstpage.html">Hlekkur að námsbraut</a>
              </li>
          
            <li>
              <h2>Another Header</h2>
              <p>This is something that will be read and people will understand</p>
              <a href="secondpage.html">Hlekkur að námsbraut</a>
              </li>
            </ul>
          </section>`);
          });
    });
});