/**
 * InputParser
 */
export class InputParser {

    private isControl: boolean = false;
    private controlCharactor: string = '';
    private queryString: string = '';

    /**
     * 
     * @param input
     */
    constructor(private input: string)  {
        this.checkControlSignal();
        this.parseInput()
    }

    private checkControlSignal() {
        const input = this.input.trim();
        this.isControl = (input.trim().indexOf('>') == 0);
    }

    private parseInput() {
        if (this.isControl) {
            // 先頭に > が入力
            // 形式
            // > controlCharactor queryString
            // controlCharactor： すべての半角英数字とアンダースコア \s
            // controlCharactorとqueryStringの区切り文字： 空白 \w
            // queryString： 空白以外 \S
            const matched = this.input.match(/\s*>\s*(\w+)\s*(\S*)/);
            if (matched) {
                this.controlCharactor = matched[1].trim();
                this.queryString = matched[2].trim()
            }
        } else {
            // 先頭に > 未入力
            // qeuryString
            this.queryString = this.input.trim()
        }

    }

    get() {
        return {
            isControl: this.isControl,
            controlCharactor: this.controlCharactor,
            queryString: this.queryString
        };
    }

}