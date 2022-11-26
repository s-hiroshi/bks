import { ItemReader } from '../model/ItemReader';

/*
 * @see
 * https://jestjs.io/ja/docs/expect
 */
test('read test1', () => {
    const reader = new ItemReader(`${process.cwd()}/src/tests/storage/data.json`);
    expect(reader.readItem('example', 'example.com')).toStrictEqual([{ keyword: "example", content: 'example.com'}]);
});
