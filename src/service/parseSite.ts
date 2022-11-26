/**
 * @param value string
 */
export const parseSite = (value: string): string | boolean => {
    // @see https://livra.geolocation.co.jp/iplearning/1816/
    const isDomain = value.trim().match(/([A-Za-z0-9][A-Za-z0-9\-]{1,61}[A-Za-z0-9]\.)+[A-Za-z]/);
    if (! isDomain) {
        return false;
    }
    const matched = value.trim().match(/^https?:\/\//);
    if (matched) { 
        return value;
    }
    return`https://${value}`; 
}