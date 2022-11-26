import { ItemReader } from '../model/ItemReader';

/*
 * @see
 * https://jestjs.io/ja/docs/expect
 */
test('readitem', () => {
    const reader = new ItemReader(`${process.cwd()}/src/tests/storage/data.json`);
    expect(reader.readItem('example', 'example.com')).toStrictEqual([{ keyword: "example", content: 'example.org'}, { keyword: "example", content: 'example.com'}]);
});

test('readitemStrict', () => {
    const reader = new ItemReader(`${process.cwd()}/src/tests/storage/data.json`);
    expect(reader.readItemStrict('example', 'example.com')).toStrictEqual([{ keyword: "example", content: 'example.com'}]);
});

