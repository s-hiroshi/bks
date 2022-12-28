/*
 * @see
 * https://stackoverflow.com/questions/36856232/write-add-data-in-json-file-using-node-js
 */
const fs = require('fs');
export class ItemWriter {
    private storageFilePage: string;
    private hasStorage: boolean;
    private data: any;

    constructor(private storageFilePath: string) {
        this.storageFilePage = storageFilePath;
        this.hasStorage = fs.existsSync(storageFilePath);
        this.data = null;
    }
    /**
     * create storage file
     */
    create() {
        let data = {
            items: [],
        };
        fs.writeFileSync(this.storageFilePage, JSON.stringify(data), { encoding: 'utf8' }, (err: Error) => {
            if (err) throw err;
        });
    }

    /**
     * Read storage file
     */
    read() {
        this.data = JSON.parse(fs.readFileSync(this.storageFilePage, { encodin: 'utf8' }));
    }

    /**
     * Write storage file
     */
    write() {
        fs.writeFileSync(this.storageFilePage, JSON.stringify(this.data), { encoding: 'utf8' }, (err: Error) => {
            if (err) throw err;
            return true;
        });
    }

    /**
     * Append data to storage file
     * @param item 
     */
    append(item: Item) {
        this.data.items.push(item);
        this.write();
    }

    /**
     * Update data in storage file
     * @param newItem 
     * @param oldItem 
     */
    update(newItem: Item, oldItem: Item) {
        this.data.items = this.data.items.map((item: Item, index: number) => {
            if (item.keyword === oldItem.keyword && item.content === oldItem.content) {
                item.keyword = newItem.keyword;
                item.content = newItem.content;
            }
            return item;
        });
        this.write();
    }

    /**
     * 
     * @param keyword
     */
    remove(keyword: string, content: string): void {
        this.data.items = this.data.items.filter((item: Item) => {
            if (item.keyword !== keyword || item.content !== content) {
                return item;
            }
        });
        this.write();
    }

    /**
     * add data
     */
    add(item: Item): void {
        if (this.hasStorage) {
            this.read();
            this.append(item)
        } else {
            this.create();
            this.read();
            this.append(item)
        }
    }

    /**
     * @param items 
     */
    addAll(items: Item[]) {
        if (this.hasStorage) {
            this.read();
            items.forEach((item: Item) => {
                this.append(item)
            });
        } else {
            this.create();
            this.read();
            items.forEach((item: Item) => {
                this.append(item)
            });
        }
    }

    /**
     * 
     * @param keyword 
     * @param content 
     */
    edit(newItem: Item, oldItem: Item): void {
        this.read();
        this.update(newItem, oldItem)
    }

    /**
     * 
     * @param keyword string
     */
    delete(keyword: string, content: string): void {
        this.read();
        this.remove(keyword, content);
    }
}
