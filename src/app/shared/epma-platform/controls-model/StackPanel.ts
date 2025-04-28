import { Orientation } from "./Orientation";


export class StackPanel implements Children {

    constructor() {
    }
    private orientation: Orientation | number;
    public get Orientation(): Orientation | number {
        return this.orientation;
    }
    public set Orientation(value: Orientation | number) {
        this.orientation = value;
    }

    private setOrientation: Orientation | number;
    public get SetOrientation(): Orientation | number {
        return this.setOrientation;
    }
    public set SetOrientation(value: Orientation | number) {
        this.setOrientation = value;
    }

    public BackgroundProperty: any;

    public children: any = [];
    
    Add(obj: any) {
        this.children.push(obj);
    }

    public Clear() {
        this.children = [];
    }

    get Count() {
        return this.children.length;
    }

    get Children(): Children {
        return this;
    }

}

interface Children {
    Add(obj: any): void
    Count(): void
    Clear(): any
}