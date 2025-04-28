import DateTime from "epma-platform/DateTime";
import { ChildWindow, ObservableCollection } from "epma-platform/models";

export type int16 = number;
export type int32 = number;
export type int64 = number;
export type uInt16 = string;
export type uInt32 = string;
export type uInt64 = string;
export type double = number;
export type decimal = number;
export type long = number;
export type float = number;
export type byte = number;
export type single = number;
export type int = number;
export interface DelegateArgs {
    instance: object,
    delegate: string
}

export class Decimal {
    public static TryParse(arg: string, out: (o: decimal) => void): boolean {
        if (isNaN(Number(arg))) {
            out(0);
            return false;
        } else {
            out(Number(arg));
            return true;
        }
    }
    public static Parse(s: string): decimal {
        let result = Number(s);
        return isNaN(result)? 0 : result ;
    }
}
export class Float {
    public static TryParse(arg: string, out: (o: decimal) => void): boolean {
        if (isNaN(Number(arg))) { 
            out(0); return false; 
        } else { 
            out(Number(arg)); return true; 
        }
    }
}

export class Double {
    static Parse(s: string): number {
        let result = Number(s);
        return isNaN(result)? 0 : result ;
    }
    public static MinValue = -1.7976931348623157E+308;
    public static MaxValue = 1.7976931348623157E+308;
    public static NaN = NaN;
    public static isNaN(arg: double) { return isNaN(arg)};
    public static TryParse(arg: string, out: (o: decimal) => void): boolean {
        if (isNaN(Number(arg))) { 
            out(0); return false; 
        } else { 
            out(Number(arg)); return true; 
        }
    }
}
export class Byte {
    public static TryParse(arg: byte | string, out: (o: byte) => void): boolean {
        let a: byte = (typeof (arg) == "string") ? (parseInt(arg) || 0) : arg;
        out(a);
        return true;
    }
}
export class Int64 {
    public static MinValue = -9223372036854775808;
    public static MaxValue = 9223372036854775807;
    public static TryParse(arg: string, out: (o: decimal) => void): boolean {
        if (isNaN(Number(arg))) { 
            out(0); return false; 
        } else { 
            out(Number(arg)); return true; 
        }
    }
}
export class Int32 {
    static MinValue = -2147483648;
    static MaxValue = 2147483647;
    public static Parse(s: string): int32 {
        return Number(s);
    }
}
export enum Int16 {
    MinValue = -32768,
    MaxValue = 32767
}
export enum Char {
    MinValue = 0X00,
    MaxValue = 0xFFFF
}
export class Long {
    public static TryParse(arg: string, out: (o: decimal) => void): boolean {
        if (isNaN(Number(arg))) { 
            out(0); return false; 
        } else { 
            out(Number(arg)); return true; 
        }
    }
    public static Parse(s: string): long {
        return Number(s);
    }
}

export class CContextInformation {
    BPCode: string;
    BPIID: string;
    ReqIID: string;
    UserID: long;
    ActiveUserID: long;
    RemoteHostID: string;
    PatientID: string;
    PatientIDType: string;
    OrganizationID: string;
    OrganizationType: string;
    SecurityToken: string;
    MsgType: string;
    ResToken: string;
    PageInfo: string;
    Extra: string;
    LoginName: string;
    RemoteHostIP: string;
    WorkingAreaOID: string;
    Errors: ObservableCollection<CError>;
    CareActivityCode: string;
    MultiCampusPattern: enmMultiCampusPattern;
    ReleaseVersion: Byte;
    CultureCode: string;
    Current: CContextInformation;
}
export class CError {
    public ErrorID: number;
    public Context: string[];
    public Message: string;
    public Severity: string;
    public Category: string;
    public CategoryID: number;
    public EventID: number;
}
export enum enmMultiCampusPattern {
    NONE,
    FLAT,
    GLOBAL,
    EXCLUSIVE,
    TOPDOWN,
    BOTTOMUP,
    TOPDOWNSHARED,
    BOTTOMUPSHARED,
    GLOBALWSG,
    FLATWSG,
}
export enum StringComparison {
    CurrentCulture = 0,
    CurrentCultureIgnoreCase = 1,
    InvariantCulture = 2,
    InvariantCultureIgnoreCase = 3,
    Ordinal = 4,
    OrdinalIgnoreCase = 5
}
export class IFormatProvider{};
export class CultureInfo extends IFormatProvider{
    static culture = "en-GB";
    static Invariant = "en-GB";
    static InvariantCulture = "InvariantCulture";
    constructor(param?:any){
        super();
    }
}

export enum StringSplitOptions
{
    //
    // Summary:
    //     The return value includes array elements that contain an empty string
    None = 0,
    //
    // Summary:
    //     The return value does not include array elements that contain an empty string
    RemoveEmptyEntries = 1
}
export class Enum {
    public static Parse (enumType: any,  value:string,  ignoreCase:boolean) {//expected enum as parameter in enumtype
        //further implementation is required since it considers leftside value and returns rightside
        if(ignoreCase){
            let val =  Object.keys(enumType).find(x => x.toLowerCase()==value.toLowerCase());
            return val && enumType[value] ? enumType[value] : val;
          }else{
           return enumType[value];
          }
    }

}
export enum WizardType
{
    SLWIZARD = 0,
    TSWIZARD = 1,
    WIZARD = 2,
    UNKNOWN = 3
}
export class CLZOObject {
    OperationMode: string;
    LastModifiedAt: DateTime;
    SealType: string;
    SealImage: string;
    SealRecordList: string;
    SealImageList: string;
    EPRFilterList: string;
    PRBSealRecordList: string;
    PRBSealImageList: string;
  }
  export class VisualTreeHelper
  {
    public static GetChildrenCount(ref: DependencyObject) : int
    {
        return DependencyObject.length;
    }
    public static GetParent(ref: DependencyObject): DependencyObject
    {
        return DependencyObject;
    }
    public static GetChild(ref: DependencyObject, childIndex: int) : DependencyObject
    {
        return DependencyObject;
    }
  }
  export class DependencyObject
  {
  }

  export interface Point
  {
    X?:number,Y?:number;
  }
export enum ImageAlignment {
    None = 0,
    Left = 1,
    Right = 2,
    Center = 3
}
  export enum AppDialogResult {
    Ok = 0,
    Cancel = 1,
    Close = 2
}

export class AppDialogEventargs {
    public AppChildWindow: ChildWindow;
    public Content: any;
    public Result: AppDialogResult;
}
