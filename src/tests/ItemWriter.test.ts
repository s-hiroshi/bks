import { ItemReader } from '../model/ItemReader';
import { ItemWriter } from '../model/ItemWriter';

/*
 * @see
 * https://jestjs.io/ja/docs/expect
 */
test('write item', () => {
    const writer = new ItemWriter(`${process.cwd()}/src/tests/storage/data.json`);

    writer.add({'keyword': 'foo', 'content': 'foo.com'});

    const reader = new ItemReader(`${process.cwd()}/src/tests/storage/data.json`);
    const expected = {'keyword': 'foo', 'content': 'foo.com'}
    expect(reader.readAll()).toContainEqual(expected);

    writer.delete('foo', 'foo.com');
});
