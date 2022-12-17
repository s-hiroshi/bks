import {readLines} from '../service/readLines'
/*
 * @see
 * https://dev.classmethod.jp/articles/alternative-solution-when-tests-with-tobe-matcher-fail-in-jest/
 */
test('read', async () => {
    const actual = await readLines('/Users/shiroshi/.config/s-hiroshi/bks/data.json');
    expect(actual).toHaveLength(1)
    console.log(actual)
    // expect(parseSite('example.com')).toBe('https://example.com');
});


