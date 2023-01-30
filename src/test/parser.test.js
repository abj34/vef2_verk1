import { describe, expect, it } from '@jest/globals';
import { parse } from '../lib/parser';
import { readFile } from '../lib/file';

describe('parser', () => {
    describe('parse', () => {
        it('should work??', async() => {
            const input = await readFile("./src/test/test-folder/realtest.csv");
            const result = parse(input);
            expect(result).toEqual([
                //["Það","Ætti","Að","Vera","Svona","",],
                //["Tíminn","Mun sýna hvernig þetta","Muni","Virka","https://vonandi.is","",],
                //["FOO","Fai Fum Famm","Boon","BANN","https://BRAKK.is"]
            ]);
        });

        it('should work2??', async() => {
            const input = 'Það;Ætti;Að;Vera;Svona;';
            const result = parse(input);
            expect(result).toEqual([["Það","Ætti","Að","Vera","Svona","",]]);
        });
    });
});