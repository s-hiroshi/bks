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
    fs.writeFileSync(this.storageFilePage, JSON.stringify(data), { encoding: 'utf8'}, (err: Error) => {
      if (err) throw err;
    });
  }

  /**
   * Read storage file
   */
  read() {
    this.data = JSON.parse(fs.readFileSync(this.storageFilePage, { encodin: 'utf8'}));
  }

  write() {
      fs.writeFileSync(this.storageFilePage, JSON.stringify(this.data), { encoding: 'utf8'}, (err: Error) => {
      if (err) throw err;
    });
  }

  /**
   * Append data to storage file
   * @param item 
   */
  append(item: Item) {
      this.data.items.push(item);
      fs.writeFileSync(this.storageFilePage, JSON.stringify(this.data, null, '  '), { encoding: 'utf8'}, (err: Error, data: object) => {
      if (err) throw err;
      return true;
    });
  }

  update(keyword: string, content: string) {
      this.data.items = this.data.items.map((item: Item) => {
          if (item.keyword.indexOf(keyword) >= 0 ) {
              item.content = content;
          }
          return item;
      });
      fs.writeFileSync(this.storageFilePage, JSON.stringify(this.data, null, '  '), { encoding: 'utf8'}, (err: Error, data: object) => {
        if (err) throw err;
        return true;
      })
  }

  /**
   * 
   * @param keyword
   */
  remove(keyword: string, content: string): void {
      this.data.items = this.data.items.filter((item: Item) => {
          if(item.keyword !== keyword || item.content !== content) {
            return item;
          }
      });
      fs.writeFileSync(this.storageFilePage, JSON.stringify(this.data, null, '  '), { encoding: 'utf8'}, (err: Error, data: object) => {
        if (err) throw err;
        return true;
      })
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

  edit(keyword: string, content: string): void {
      this.read();
      this.update(keyword, content)
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
