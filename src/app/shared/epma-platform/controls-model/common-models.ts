import { List } from "../models/list";

export class SelectionChangedEventArgs {
    addedItems: List = new List<any>();
    removedItems: List = new List<any>();
    typedText: any;
    sourceComponent: string = undefined;
    constructor(removedItems?: List, addedItems?: List, typedText?: any) {
        if (addedItems) {

            this.addedItems = addedItems;
        }

        if (removedItems) {

            this.removedItems = removedItems;
        }

        if (typedText) {
            this.typedText = typedText;
        }
    }
    public get AddedItems(): List {
        return this.addedItems;
    }
    public get RemovedItems(): List {
        return this.removedItems;
    }
}
export class RadRoutedEventArgs {
    // constructor();
    // constructor(routedEvent: RoutedEvent);
    // constructor(routedEvent: RoutedEvent, source: Object);
    public Handled: boolean;
    public OriginalSource: Object;
    // public RoutedEvent: RoutedEvent;
    public Source: Object;
    // protected InvokeEventHandler(genericHandler: Delegate, genericTarget: Object): void;
    // protected OnSetSource(newSource: Object): void;
}