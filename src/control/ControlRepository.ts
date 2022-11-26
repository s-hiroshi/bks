export class ControlRepository {
    private controls: Control[] = [];
    add(control: Control) {
        this.controls.push(control)
    }
    find(controlCharactor: string): Control|undefined {
        
        let control = this.controls.find((control: Control) => {
            return control.getControlCharactor() === controlCharactor;
        })
        return control;
    }
}