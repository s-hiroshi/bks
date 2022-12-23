const fs = require('fs');
import {readLines} from '../service/readLines'

/*
 * @see
 * https://dev.classmethod.jp/articles/alternative-solution-when-tests-with-tobe-matcher-fail-in-jest/
 */
test('read', async () => {
    const actual = await readLines(`${process.cwd()}/src/tests/storage/data.json`);
    expect(actual).toMatch(/example/);
    fs.writeFileSync(`${process.cwd()}/src/tests/storage/output.json`, actual, { encoding: 'utf8'}, (err: Error) => {
      if (err) throw err;
    });
});


