import { BitmapImage } from "./Control";
import { Thickness } from "./FrameworkElement";


export class PSLineItem {
    ActiveStyle: number;
    AlignRight: LineIconAlignment;
    AltStringLineItem: string;
    AtlStringWarningIcon: string;
    ControlledDrugIcon: BitmapImage | boolean;
    ControlledDrugIconMargin: Thickness;
    ControlledDrugIconTooltip: string;
    FNoteIcon: BitmapImage | boolean;
    FNoteIconMargin: Thickness;
    FNoteIconTooltip: string;
    HighRiskIcon: BitmapImage | boolean;
    HighRiskIconMargin: Thickness;
    HighRiskIconTooltip: string;
    LineIcon: number;
    LineIconTooltip: string;
    LinkIcon: number;
    LinkIconTooltip: string;
    MCIcon: BitmapImage | boolean;
    MCIconMargin: Thickness;
    MCIconTooltip: string;
    NamedPatientIcon: BitmapImage | boolean;
    NamedPatientIconMargin: Thickness;
    NamedPatientIconTooltip: string;
    NewlyMarketedIcon: BitmapImage | boolean;
    NewlyMarketedIconMargin: Thickness;
    NewlyMarketedIconTooltip: string;
    NormalStyle: number;
    NotesColor: string;
    NotesData: string;
    NotesIcon: BitmapImage | boolean;
    NotesIconMargin: Thickness;
    NotesToolTip: string;
    // OnSelectParams: OnSelectArgs;
    // SearchImages: PowerSearchImages;
    // SearchStyles: PowerSearchStyles;
    SecondaryIcon: number;
    SecondaryTooltip: string;
    SelectedStyle: number;
    ShowLinkIcon: boolean;
    Tag: string;
    Text: string;
    UnlicensedIcon: BitmapImage | boolean;
    UnlicensedIconMargin: Thickness;
    UnlicensedIconTooltip: string;
    Value: string;
    WarningImage: number;
    WarningText: string;
  Clear: any;
}
export class PSStyleItem {
    Bold: boolean;
    Forecolor: string;
    Italic: boolean;
    TextCase: string;
}
export class PSImageItem {
    ImageLine: boolean;
    ImageLink: BitmapImage | boolean;
    ImageSecondary: boolean;
    WarningImage: boolean;
}
export enum LineIconAlignment {
    Left = 0,
    Right = 1
}
export interface OnSelectArgs {
    index: number; // This only smaller 1st case
    Tag: string;
    Text: string;
    Value: string;
}

export interface DrugItemInputData {
    FavouritesDetailOID: number;
    IsAuthorise: boolean;
    IsFetchFormularyAndNonFormulary: boolean;
    IsFormulary: boolean;
    // MatchIdentifyingTypes: ArrayOfString;
    MCIDeactItems: string;
    nMAXRows: number;
    nPageNo: number;
    nPageSize: number;
    Options: EnumDrugOptions;
    PageIndex: number;
    PrepStatusCode: string;
    TeamOIDs: string;
}
export enum EnumDrugOptions {
    ALTERNATE_OPTIONS = 0,
    PRESCRIBING_OPTIONS = 1,
    RELATED_OPTIONS = 2,
    ALL = 3
}
export enum StringComparison {
    CurrentCulture = 0,
    CurrentCultureIgnoreCase = 1,
    InvariantCulture = 2,
    InvariantCultureIgnoreCase = 3,
    Ordinal = 4,
    OrdinalIgnoreCase = 5
}
export enum HorizontalAlignment{
    Left = 0,
    Center = 1,
    Right = 2,
    Stretch = 3
}
export enum VerticalAlignment{
    Top = 0,
    Center = 1,
    Bottom = 2,
    Stretch = 3
}
