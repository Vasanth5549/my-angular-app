import { CultureInfo } from "epma-platform/models";

export enum Key {
    None = 0,

    Back = 1,

    Tab = 2,

    Enter = 3,

    Shift = 4,

    Ctrl = 5,

    Alt = 6,

    CapsLock = 7,

    Escape = 8,

    Space = 9,

    PageUp = 10,

    PageDown = 11,

    End = 12,

    Home = 13,

    Left = 14,

    Up = 15,

    Right = 16,

    Down = 17,

    Insert = 18,

    Delete = 19,

    D0 = 20,

    D1 = 21,

    D2 = 22,

    D3 = 23,

    D4 = 24,

    D5 = 25,

    D6 = 26,

    D7 = 27,

    D8 = 28,

    D9 = 29,

    A = 30,

    B = 31,

    C = 32,

    D = 33,

    E = 34,

    F = 35,

    G = 36,

    H = 37,

    I = 38,

    J = 39,

    K = 40,

    L = 41,

    M = 42,

    N = 43,

    O = 44,

    P = 45,

    Q = 46,

    R = 47,

    S = 48,

    T = 49,

    U = 50,

    V = 51,

    W = 52,

    X = 53,

    Y = 54,

    Z = 55,

    F1 = 56,

    F2 = 57,

    F3 = 58,

    F4 = 59,

    F5 = 60,

    F6 = 61,

    F7 = 62,

    F8 = 63,

    F9 = 64,

    F10 = 65,

    F11 = 66,

    F12 = 67,

    NumPad0 = 68,

    NumPad1 = 69,

    NumPad2 = 70,

    NumPad3 = 71,

    NumPad4 = 72,

    NumPad5 = 73,

    NumPad6 = 74,

    NumPad7 = 75,

    NumPad8 = 76,

    NumPad9 = 77,

    Multiply = 78,

    Add = 79,

    Subtract = 80,

    Decimal = 81,

    Divide = 82,

    Unknown = 255
}

export class KeyEventArgs  {
    public Handled: boolean;
    public Key: Key;
    public PlatformKeyCode: number;
}
export class Binding  {
    public static IsDebuggingEnabled: boolean;
    constructor();
    constructor(path: string);
   // constructor(original: Binding);
   constructor(path?: string){

   }
    public BindsDirectlyToSource: boolean;
   // public Converter: IValueConverter;
    public ConverterCulture: CultureInfo;
    public ConverterParameter: Object;
    public ElementName: string;
    public Mode: BindingMode;
    public NotifyOnValidationError: boolean;
    /*[TypeConverter(typeof(PropertyPathConverter))]*/
   // public Path: PropertyPath;
    //public RelativeSource: RelativeSource;
    public Source: Object;
    //public UpdateSourceTrigger: UpdateSourceTrigger;
    public ValidatesOnDataErrors: boolean;
    public ValidatesOnExceptions: boolean;
    public ValidatesOnNotifyDataErrors: boolean;
}

export enum BindingMode {
    OneWay = 1,

    OneTime = 2,

    TwoWay = 3
}
export enum WizardAction
{
    None = 0,
    Next = 1,
    Previous = 2,
    Finish = 3,
    FinishNow = 4,
    Cancel = 5
}

    export enum NumberStyles
    {

        None = 0,
        AllowLeadingWhite = 1,
        AllowTrailingWhite = 2,
        AllowLeadingSign = 4,
        Integer = 7,
        AllowTrailingSign = 8,
        AllowParentheses = 16,
        AllowDecimalPoint = 32,
        AllowThousands = 64,
        Number = 111,
        AllowExponent = 128,
        Float = 167,
        AllowCurrencySymbol = 256,
        Currency = 383,
        Any = 511,
        AllowHexSpecifier = 512,
        HexNumber = 515
    }