import { parseBookmark } from '../service/parseBookmarks';

/*
 * @see
 * https://dev.classmethod.jp/articles/alternative-solution-when-tests-with-tobe-matcher-fail-in-jest/
 */
describe('Test parseBookmark', () => {
    test('read', async () => {
        const actual = await parseBookmark(`${process.cwd()}/src/tests/bookmarks.html`);
        expect(actual).toHaveLength(2)
    });
});


