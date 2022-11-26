import { parseSite } from '../service/parseSite'

/*
 * @see
 * https://dev.classmethod.jp/articles/alternative-solution-when-tests-with-tobe-matcher-fail-in-jest/
 */
test('FQDN', () => {
    const actual =  parseSite('https://example.com');
    expect(parseSite('example.com')).toBe('https://example.com');
});


test('DOMAIN', () => {
    const actual =  parseSite('example.com');
    expect(parseSite('example.com')).toBe('https://example.com');
});