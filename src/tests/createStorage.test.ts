const fs = require('fs');
const path = require('path');
import { createStorage } from '../service/createStorage';
import { ItemReader } from '../model/ItemReader';

const filepath = `${process.cwd()}/src/tests/storage/storage.json`
/*
 * @see
 * https://jestjs.io/ja/docs/expect
 */
describe('Test createStorage', () => {
    test('create storage', async () => {
        const filepath = `${process.cwd()}/src/tests/storage/storage.json`
        createStorage(filepath);

        const reader = new ItemReader(filepath);
        await reader.init()
        // @see https://jestjs.io/docs/expect#tocontainequalitem
        expect(fs.existsSync(filepath)).toBe(true);
        expect(reader.readAll()).toHaveLength(0)
    });
    afterAll(() => {
        fs.unlink(filepath, (err: Error) => {
            if (err) throw err;
        })

    });
});
