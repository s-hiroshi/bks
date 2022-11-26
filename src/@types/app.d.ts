// @see https://zenn.dev/fagai/articles/7f76a3b3b5a415
type Item = {
    keyword: string,
    content: string
}
type Data = {
    items: Item[]
}
type Answer = {
    context: string;
}
type Reader = {
    readItem(keyword: string, content: string): Items[]
    readAll(): Items;
}
type Writer = {
    write()
    add(item: Item)
    edit(keyword: string, content: string)
    delete(keyword: string, content: string)
}
// type implementできる
type Control = {
    controlCharactor: string;
    getControlCharactor(): string;
    execute(query?:string);
}
