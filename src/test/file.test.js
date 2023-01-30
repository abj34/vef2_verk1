import { describe, expect, it } from '@jest/globals';
import { direxists, readFile, readFilesFromDir } from '../lib/file';

describe('file', () => {
    describe('direxists', () => {
        it('returns false if dir does not exist', async() => {
            const result = await direxists('./mappa-ekki-til');
            expect(result).toBe(false);
        });

        it('returns true if dir does exist', async() => {
            const result = await direxists('./src/test/test-folder');
            expect(result).toBe(true);
        });

        it('returns false if no input', async() => {
            const result = await direxists();
            expect(result).toBe(false);
        });
    });

    describe('readFilesFromDir', () => {
        it('should return empty array for dir that does not exist', async() => {
            const result = await readFilesFromDir("./mappa-ekki-til");
            expect(result).toEqual([]);
        });

        it('should return array of files with path for dir that does exist', async() => {
            const result = await readFilesFromDir("./src/test/test-folder");
            expect(result).toEqual([
                'src\\test\\test-folder\\emptyfile.txt',
                'src\\test\\test-folder\\realtest.csv',
                'src\\test\\test-folder\\testfile.csv',
                'src\\test\\test-folder\\testfile.txt',
            ]);
        });
    });

    describe('readFile', () => {
        it('should return content of known file that does exist', async() => {
            const result = await readFile('./src/test/test-folder/testfile.csv');
            expect(result).toEqual('til;Hamingju;með;þetta;virkar!;');
        });

        it('should return null for file that does not exist', async() => {
            const result = await readFile('./mappa-ekki-til');
            expect(result).toEqual(null);
        });
    });
});