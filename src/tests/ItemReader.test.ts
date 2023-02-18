const fs = require('fs');
const path = require('path');
import { ItemReader } from '../model/ItemReader';
import { ItemWriter } from '../model/ItemWriter';

/*
 * @see
 * https://jestjs.io/ja/docs/expect
 */
describe('Test ItemReader', () => {
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
    test('Read All Items', async () => {
        const reader = new ItemReader(`${process.cwd()}/src/tests/storage/data.json`);
        await reader.init()
        const expectedFirst = { 'keyword': 'exampleOrg', 'content': 'example.org' }
        const expectedSecond = { 'keyword': 'exampleCom', 'content': 'example.com' }

        // @see https://jestjs.io/docs/expect#tocontainequalitem
        expect(reader.readAll()).toContainEqual(expectedFirst);
        expect(reader.readAll()).toContainEqual(expectedSecond);
    });
    test('Read Item', async () => {
        const reader = new ItemReader(`${process.cwd()}/src/tests/storage/data.json`);
        await reader.init()

        const expectedAll = [{ 'keyword': 'exampleOrg', 'content': 'example.org' }, { 'keyword': 'exampleCom', 'content': 'example.com' }];
        expect(reader.readItem('exampleOrg', 'example.com')).toEqual(expectedAll);

        const expectedFirst = { 'keyword': 'exampleOrg', 'content': 'example.org' };
        const expectedSecond = { 'keyword': 'exampleCom', 'content': 'example.com' };

        expect(reader.readItem('exampleOrg', 'example.com')).toContainEqual(expectedFirst);
        expect(reader.readItem('exampleOrg', 'example.com')).toContainEqual(expectedSecond);
    });
    test('Read Item Strict', async () => {
        const reader = new ItemReader(`${process.cwd()}/src/tests/storage/data.json`);
        await reader.init()

        const expectedAll = [{ 'keyword': 'exampleOrg', 'content': 'example.org' }, { 'keyword': 'exampleCom', 'content': 'example.com' }];
        expect(reader.readItem('exampleOrg', 'example.com')).toEqual(expectedAll);

        const expected = { 'keyword': 'exampleOrg', 'content': 'example.org' };
        expect(reader.readItemStrict('exampleOrg', 'example.org')).toContainEqual(expected);
    });

});
