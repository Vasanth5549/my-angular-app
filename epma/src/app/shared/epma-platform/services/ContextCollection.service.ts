import { Dictionary } from "epma-platform/dictionary";
import { Convert } from "./convert.service";
import { ContextManager } from "./sLContextManager.service";

export class WizardContextCollection {
    constructor(init?: { key: string; value: string; }[]) {

    }
    public sWizardContext: string = String.Empty;
    public get WizardContextText(): string {
        return this.sWizardContext;
    }
    public set WizardContextText(value: string) {
        this.sWizardContext = value;
        let arrKeys: string[] = value.Split('&');
        arrKeys.forEach( (sItem)=> {
            if (!String.IsNullOrEmpty(sItem) && sItem.Contains("=")) {
                this.Add(sItem.Split('=')[0], sItem.Split('=')[1]);
            }
        });
    }
    public objWizardContext: Dictionary<string, string> = new Dictionary<string, string>();

    public GetValue(sKey: string): string {
        if (this.objWizardContext.ContainsKey(sKey))
            return this.objWizardContext[sKey];
        return String.Empty;
    }
    public SetValue(sKey: string, value: string): void {
        this.objWizardContext[sKey] = value;
        this.SetWizardContext(sKey, value);
    }
    public Add(sKey: string, sValue: string): void {
        if (!this.objWizardContext.ContainsKey(sKey)) {
            this.objWizardContext.Add(sKey, sValue);
            this.SetWizardContext(sKey, sValue);
        }
    }
    private SetWizardContext(sKey: string, sValue: string): void {
        this[sKey] = sValue;
        if (!String.IsNullOrEmpty(this.sWizardContext)) {
            if (this.sWizardContext.Substring(this.sWizardContext.length - 1, 1) != "&")
                this.sWizardContext = String.Concat(this.sWizardContext, "&", sKey, "=", sValue, "&");
            else this.sWizardContext = String.Concat(this.sWizardContext, sKey, "=", sValue, "&");
            ContextManager.Instance["WZContextInfo"] = this.sWizardContext;
            Convert.ToString(HtmlPage.Window.Eval(String.Concat("try{if(window.MainApp!=null)window.MainApp.WizardContext=window.MainApp.HTMLDecode('", this.sWizardContext.Replace("\'", "&apos;"), "');}catch(e){}")));
        }
    }
}

export var HtmlPage = {
    Window : {
        Eval : (value)=>{
         return value;
        }
    }
}
