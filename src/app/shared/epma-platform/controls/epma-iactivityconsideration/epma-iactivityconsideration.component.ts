import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { List, ObservableCollection, IEnumerable, ContextInfo } from "epma-platform/models";
import { Visibility } from "../../controls-model/Visibility";
import { Control } from "../../controls/Control";
import { Align,PopupService,PopupRef } from '@progress/kendo-angular-popup';
import { AppLoadService } from '../../services/appLoad.service';

@Component({
  selector: 'iActivityConsideration',
  templateUrl: './epma-iactivityconsideration.component.html',
  styleUrls: ['./epma-iactivityconsideration.component.css']
})
export class iActivityConsideration extends Control implements OnInit {

  @Input() ActivityConsiderationCaption: any;
  @Input() ACSection: any;
  @Input() ACWebLink: any;
  @Input() OnPopupOpen : Function| string;
  @Input() OnNodeItemClick : Function| string;
  _AnchorLoad: boolean = true;

  get AnchorLoad() {

      return this._AnchorLoad;

  };
  @Input() set AnchorLoad(value: boolean) {
    this._AnchorLoad = value;
  };
  @Output() OnPopupOpen_Func = new EventEmitter;
  @Output() OnNodeItemClick_Func = new EventEmitter;

  public margin = { horizontal: -177, vertical: 0 };
  public sName: string;
  public AltTextRefLink: List<string>;
  public Left: number;
  public lstACWebLink: ObservableCollection<ACWebLink> = new ObservableCollection<ACWebLink>();
  public lstSection: ObservableCollection<ACSection> = new ObservableCollection<ACSection>();
  public OpenPopUp: boolean;
  public ReferenceCaption: List<string>;
  public ReferenceLinks: string = "Reference Links";
  public ReferenceURL: List<string>;
  public Top: number;
  public tooltip: string;
  public iconclass: string = "k-i-arrow-60-down";


  constructor( ) { super(); 


    AppLoadService.activityConsiderationArrowClick.subscribe(val=>{
      if (val) {
        this._AnchorLoad = false;
      }
    });
  };

  ngOnInit(): void {

  }

  public onToggle(): void {
    this.OpenPopUp = !this.OpenPopUp;
    this.iconclass = this.OpenPopUp ? "k-i-arrow-60-up" : "k-i-arrow-60-down";
    if(this.OnPopupOpen instanceof Function){
      this.OnPopupOpen({},this.OpenPopUp);
    }
    this.OnPopupOpen_Func.emit(this.OpenPopUp);
  }
  public OnNodeItemClicked() {
    if(this.OnNodeItemClick instanceof Function){
      this.OnNodeItemClick({},this.OpenPopUp);
    }
    this.OnNodeItemClick_Func.emit(this.OpenPopUp);
  }

  public AddNode(sSectionKey: string, sKey: string, sName: string, sValue: string, sTag: string, IsNameClickable: boolean, IsValueClickable: boolean, sNameTooltip: string, sValueTooltip: string): void {
    try {
      var ObjNodes: ACNode = new ACNode();
      var objNodeSection: ACSection = null;
      var enumACSection: IEnumerable<ACSection> = this.lstSection.AsEnumerable<ACSection>();
      enumACSection.forEach(function (objSec) {
        if (objSec.SectionKey == sSectionKey) {
          objNodeSection = objSec;
        }
      });
      if (objNodeSection.Nodes.Count > 0) {
        var iCount: number = objNodeSection.Nodes.Where(sND => sND.Key == sKey).Select(sND => sND).Count();
        if (iCount > 0)
          return
      }
      if (objNodeSection != null) {
        ObjNodes.Value = sValue;
        ObjNodes.ValueToolTip = sValueTooltip;
        ObjNodes.NameToolTip = sNameTooltip;
        ObjNodes.AltTextName = String.Format("{0} {1}", objNodeSection.HeaderTitle, sName);
        ObjNodes.AltTextValue = String.Format("{0} {1} {2}", objNodeSection.HeaderTitle, sName, sValue);
        ObjNodes.Text = sName;
        ObjNodes.Key = sKey;
        ObjNodes.IsNameClickable = IsNameClickable;
        ObjNodes.IsValueClickable = IsValueClickable;
        objNodeSection.Nodes.Add(ObjNodes);
      }
    }
    catch (ex) {
    }

  }

  public AddSection(sKey: string, sCaption: string, sTag: string, sToolTip: string): void {
    try {
      var objRlSection: ACSection = new ACSection();
      objRlSection.Nodes = new ObservableCollection<ACNode>();
      objRlSection.SectionKey = sKey;
      objRlSection.HeaderTitle = sCaption;
      objRlSection.SectionToolTip = sToolTip;
      if (this.lstSection.Count > 0) {
        var iCount: number = this.lstSection.Where(sSec => sSec.SectionKey == sKey).Select(sSec => sSec).Count();
        if (iCount > 0)
          return
      }
      this.lstSection.Add(objRlSection);
      if (this.Visibility == Visibility.Collapsed)
        this.Visibility = Visibility.Visible;
    }
    catch (ex) {
    }
  }

  public UpdateNode(sSectionKey: string, sNodeKey: string, sName: string, sValue: string, sTag: string, IsNameClickable: boolean, IsValueClickable: boolean, sNameTooltip: string, sValueTooltip: string): void {
    try {
      var ObjNodes: ACNode = null;
      var objNodeSection: ACSection = null;
      var enumACSection: IEnumerable<ACSection> = this.lstSection.AsEnumerable<ACSection>();
      enumACSection.forEach(function (objSec) {
        if (objSec.SectionKey == sSectionKey) {
          objNodeSection = objSec;
        }
      });
      if (objNodeSection != null) {
        for (var iIndex: number = 0; iIndex < objNodeSection.Nodes.Count; iIndex++) {
          if ((<ACNode>objNodeSection.Nodes[iIndex]).Key == sNodeKey) {
            ObjNodes = (<ACNode>objNodeSection.Nodes[iIndex]);
            break;
          }
        }
      }
      if (ObjNodes != null) {
        ObjNodes.Text = sName;
        ObjNodes.Value = sValue;
        ObjNodes.NameToolTip = sNameTooltip;
        ObjNodes.ValueToolTip = sValueTooltip;
        ObjNodes.AltTextName = String.Format("{0} {1}", objNodeSection.HeaderTitle, sName);
        ObjNodes.AltTextValue = String.Format("{0} {1} {2}", objNodeSection.HeaderTitle, sName, sValue);
        ObjNodes.IsValueClickable = IsValueClickable;
        ObjNodes.IsNameClickable = IsNameClickable;
      }
    }
    catch (ex) {
    }

  }
  public AddReferenceLink(sRefLink: string, sCaption: string): void {
    try {
      if (sRefLink.ToLower().Substring(0, 4) != "http")
        sRefLink = "http://" + sRefLink;
      this.tooltip = this.ReferenceLinks + " " + sCaption;
      var objWeblink: ACWebLink = new ACWebLink();
      objWeblink.ReferenceLink = sRefLink;
      objWeblink.AltTextRefLink = this.tooltip;
      objWeblink.ReferenceCaption = sCaption;
      this.lstACWebLink.Add(objWeblink);
    }
    catch (Exception) {

    }
  }
}

export class DependencyProperty {
  public static UnsetValue: Object;
}
class ACWebLink {
  constructor() { }
  public AltTextRefLink: string;
  public ReferenceCaption: string;
  public ReferenceLink: string;

}

export class ACNode {
  constructor() { };
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
  public _ValueToolTip: string;
  public Width: number;
  public _Value: string;
  public get ValueToolTip(): string {
    return this._ValueToolTip;
  }
  public set ValueToolTip(value: string) {
    this._ValueToolTip = value;
  }
  public get Value(): string {
    return this._Value;
  }
  public set Value(value: string) {
    this._Value = value;
  }
}

export class ACSection {
  private sSectionKey: string = String.Empty;
  private sSectionToolTip: string = String.Empty;
  public get SectionKey(): string {
    return this.sSectionKey;
  }
  public set SectionKey(value: string) {
    this.sSectionKey = value;
  }

  public get SectionToolTip(): string {
    return this.sSectionToolTip;
  }
  public set SectionToolTip(value: string) {
    this.sSectionToolTip = value;
  }
  private objNodes: ObservableCollection<ACNode>;
  public get Nodes(): ObservableCollection<ACNode> {
    return this.objNodes;
  }
  public set Nodes(value: ObservableCollection<ACNode>) {
    this.objNodes = value;
  }
  private sHeaderTitle: string;
  public get HeaderTitle(): string {
    return this.sHeaderTitle;
  }
  public set HeaderTitle(value: string) {
    this.sHeaderTitle = value;
  }
}