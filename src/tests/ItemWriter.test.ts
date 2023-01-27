const fs = require('fs');
const path = require('path');
import { ItemReader } from '../model/ItemReader';
import { ItemWriter } from '../model/ItemWriter';

/*
 * @see
 * https://jestjs.io/ja/docs/expect
 */
describe('ItemWriter', () => {
    beforeAll(() => {
        const storagePath = `${process.cwd()}/src/tests/storage/data.json`;
        if (!fs.existsSync(storagePath)) {
            fs.mkdirSync(path.dirname(storagePath), { recursive: true }, (err: any) => {
                if (err) throw err;
            });

            fs.writeFileSync(
                storagePath,
                JSON.stringify({ items: [{ "keyword": "exampleOrg", "content": "example.org" }, { "keyword": "exampleCom", "content": "example.com" }] }),
                { flag: 'w+' },
                (err: any) => {
                    if (err) throw err;
                }
            );
        }
        return true;
    });
    test('add item', async () => {
        const writer = new ItemWriter(`${process.cwd()}/src/tests/storage/data.json`);

        writer.add({ 'keyword': 'foo', 'content': 'foo.com' });

        const reader = new ItemReader(`${process.cwd()}/src/tests/storage/data.json`);
        await reader.init()
        const expected = { 'keyword': 'foo', 'content': 'foo.com' }

        // @see https://jestjs.io/docs/expect#tocontainequalitem
        expect(reader.readAll()).toContainEqual(expected);
    });
    test('delete item', async () => {
        const writer = new ItemWriter(`${process.cwd()}/src/tests/storage/data.json`);
        writer.delete('foo', 'foo.com');
        const reader = new ItemReader(`${process.cwd()}/src/tests/storage/data.json`);
        await reader.init()

        const expected = { 'keyword': 'foo', 'content': 'foo.com' }

        // @see https://jestjs.io/docs/expect#tocontainequalitem
        expect(reader.readAll()).not.toContainEqual(expected);

    });

});
