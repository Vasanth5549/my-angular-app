// import { ObservableCollection } from "./observableCollection";
// import { TreeImageCollection } from "./treeImageCollection";
// import { ToggleState } from "./toggleState";
// import { iTreeViewCollection } from "./iTreeViewCollection";

import { List, ObservableCollection } from "epma-platform/models";
import { Thickness } from "../controls/FrameworkElement";

//import { List, ObservableCollection } from "epma-platform/models";

export class CTreeListItem {

    Children: ObservableCollection<CTreeListItem>;
    Expanded: boolean;
    ExpandedImagePath: string;
    IconCollection: List<TreeImageCollection>;
    ImageCollection: List<TreeImageCollection>;
    IsChecked: ToggleState;
    IsInEditMode: boolean;
    Key: string;
    NormalImagePath: string;
    Owner: iTreeViewCollection;
    ParentKey: string;
    Selected: boolean;
    Tag: any;
    ToolTip: string;
    Value: string;
    Path: string;
}
export class TreeImageCollection {
    Alignment: string;
    IconMargin: Thickness;
    IconSource: string;
    IconToolTip: string;
    ImageID: string;
    ImageSource: string;
    NotesColor: SolidColorBrush;
    NotesData: string;
    NotesIcon: string;
    NotesIconMargin: Thickness;
    NotesToolTip: string;
    ToolTip: string;
}

export class SolidColorBrush {
    Color: Color;
}
export interface Color {
    A: number;
    B: number;
    G: number;
    R: number;
}
export enum ToggleState {
    Off = 0,
    On = 1,
    Indeterminate = 2
}
export class RadTreeViewItem {
    public Item:object;
}
/**
 * name
 */

export class iTreeViewCollection extends ObservableCollection<CTreeListItem> {
    // override Any(arg0: (x: any) => any): boolean {
    //     throw new Error('Method not implemented.');
    // }

    protected InsertItem(index: number, item: CTreeListItem): void {
        this.AdoptItem(item);
        //super.InsertItem(index, item);
        //this.OnCollectionChanged(new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Add, item, index));
    }
    protected RemoveItem(index: number): void {
        this.DiscardItem(this[index]);
        //super.RemoveItem(index);
        //this.OnCollectionChanged(new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Reset));
    }
    protected SetItem(index: number, item: CTreeListItem): void {
        this.AdoptItem(item);
        //super.SetItem(index, item);
        //this.OnCollectionChanged(new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Add, item, index));
    }
    protected ClearItems(): void {
        this.forEach(function (item) {
            //this.DiscardItem(item);
        });
        // super.ClearItems();
        //this.OnCollectionChanged(new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Reset));
    }
    private AdoptItem(item: CTreeListItem): void {
        // item.SetOwner(this);
    }
    private DiscardItem(item: CTreeListItem): void {
        //item.SetOwner(null);
    }
    //public event NotifyCollectionChangedEventHandler CollectionChanged;
    protected OnCollectionChanged(e: NotifyCollectionChangedEventArgs): void {
        // if (this.CollectionChanged != null) {
        //     this.CollectionChanged(this, e);
        // }
    }



}

export class NotifyCollectionChangedEventArgs {
    // constructor(action: NotifyCollectionChangedAction);
    // constructor(action: NotifyCollectionChangedAction, changedItem: Object, index: number);
    // constructor(action: NotifyCollectionChangedAction, newItem: Object, oldItem: Object, index: number);
    //public Action: NotifyCollectionChangedAction;
    // public NewItems: IList;
    // public NewStartingIndex: number;
    // public OldItems: IList;
    // public OldStartingIndex: number;
}

export class RadTreeViewItemEditedEventArgs {
    public Source: CTreeListItem;
}