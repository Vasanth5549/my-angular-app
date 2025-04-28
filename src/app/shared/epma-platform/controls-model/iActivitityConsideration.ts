import { List, ObservableCollection } from "epma-platform/models";
import { Control } from "../controls/Control";

//file path to be changed to control models

 export class DependencyProperty {
    public static UnsetValue: Object;
    // public static Register(name: string, propertyType: Type, ownerType: Type, typeMetadata: PropertyMetadata): DependencyProperty;
    // public static RegisterAttached(name: string, propertyType: Type, ownerType: Type, defaultMetadata: PropertyMetadata): DependencyProperty;
    // public GetMetadata(forType: Type): PropertyMetadata;
}
 class ACWebLink  {
    constructor(){ }
    public AltTextRefLink: string;
    public ReferenceCaption: string;
    public ReferenceLink: string;
}
 class ACNode {
    constructor(){};
    public AltTextName: string;
    public AltTextValue: string;
    public IsNameClickable: boolean;
    public IsValueClickable: boolean;
    public Key: string;
    public NameToolTip: string;
    public NodeValueWidth: number;
    public NodeWidth: number;
    public SectionKey: string;
    public Text: string;
    public Value: string;
    public ValueToolTip: string;
    public Width: number;
}
 class ACSection {
    constructor(){};
    public HeaderTitle: string;
    public Nodes: ObservableCollection<ACNode>;
    public SectionKey: string;
    public SectionToolTip: string;
    // public SetWidth(): void;
}

export class iActivityConsideration extends Control {
    public static ActivityConsiderationCaptionProperty: DependencyProperty;
    public static AltTextRefLinkProperty: DependencyProperty;
    public static lstACWebLinkProperty: DependencyProperty;
    public static lstSectionProperty: DependencyProperty;
    public static ReferenceCaptionProperty: DependencyProperty;
    public static ReferenceLinksProperty: DependencyProperty;
    public static ReferenceURLProperty: DependencyProperty;
    public sName: string;
    constructor(){ super();};
    public ActivityConsiderationCaption: string;
    public AltTextRefLink: List<string>;
    public Left: number;
    public lstACWebLink: ObservableCollection<ACWebLink>;
    public lstSection: ObservableCollection<ACSection>;
    public OpenPopUp: boolean;
    public ReferenceCaption: List<string>;
    public ReferenceLinks: string;
    public ReferenceURL: List<string>;
    public Top: number;
    public  OnNodeItemClick: Function;
    public OnPopupOpen:Function;
    public AddNode(sSectionKey: string, sKey: string, sName: string, sValue: string, sTag: string, IsNameClickable: boolean, IsValueClickable: boolean, sNameTooltip: string, sValueTooltip: string): void{};
    public AddReferenceLink(sRefLink: string, sCaption: string): void{};
    public AddSection(sKey: string, sCaption: string, sTag: string, sToolTip: string): void{};
    public OnApplyTemplate(): void{};
    public RemoveNode(sSectionKey: string, sKey: string): void{};
    public RemoveSection(sSectionKey: string): void{};
    public UpdateNode(sSectionKey: string, sNodeKey: string, sName: string, sValue: string, sTag: string, IsNameClickable: boolean, IsValueClickable: boolean, sNameTooltip: string, sValueTooltip: string): void{};
    //protected OnCreateAutomationPeer(): AutomationPeer {};
}