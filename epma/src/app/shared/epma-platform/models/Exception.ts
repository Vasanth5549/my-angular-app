import { Dictionary } from "./eppma-IDictionary.types";
/*[CLSCompliant(false)]
    [ComVisible(true)]
    [Guid("b36b5c63-42ef-38bc-a07e-0b34c98f164a")]
    [InterfaceType(ComInterfaceType.InterfaceIsDual)]*/
    export class _Exception {
        HelpLink: string;
        InnerException: Exception;
        Message: string;
        Source: string;
        StackTrace: string;
        constructor(){

        }
    }
export class Exception extends _Exception {
    constructor();
    constructor(message?: string);
    constructor(message?: string, innerException?: Exception);
    constructor(message?: string, innerException?: Exception){
        super();
        this.Message = message;
        this.InnerException = innerException;
    }
    public Data: Dictionary<any,any>;
    protected HResult: number;
    /*[SecuritySafeCritical]*/
    public override ToString(): string{
        return this && this.InnerException ? this.InnerException.Message : this.Message ;
    };
 }
