import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, CListItem } from 'epma-platform/models';
import { AppDialog, Grid, iButton, iLabel, iCheckedListbox, TextWrapping } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ReplacementDrugVM } from '../viewmodel/ReplacementDrugVM';
import { replacedrug } from '../resource/replacedrug.designer';
import { DrugItemInputData } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { CConstants } from '../utilities/constants';
import { OnSelectEventArgs, OnUnSelectEventArgs, RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
@Component({
    selector: 'MedReplacementDrugsChild',
    templateUrl: './medreplacementdrugschild.html',
    styles:[`
   :host ::ng-deep  .clbAlteroverflow li{
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    padding: 1px 8px !important;
  }`]
})


export class MedReplacementDrugsChild extends iAppDialogWindow implements  AfterViewInit {
    objReplacementDrug: ReplacementDrugVM;
    public objDrugItemInputData: DrugItemInputData;
    public sDrugName: string;
    public repldrug: replacedrug;
    private arryVal:string[]=[];
    @ViewChild("repldrugTempRef", { read: replacedrug, static: false }) set _repldrug(c: replacedrug) {
        if (c) { this.repldrug = c; }
    };
    public MainLayoutRoot: Grid;
    @ViewChild("MainLayoutRootTempRef", { read: Grid, static: false }) set _MainLayoutRoot(c: Grid) {
        if (c) { this.MainLayoutRoot = c; }
    };
    public lblHeader: iLabel;
    @ViewChild("lblHeaderTempRef", { read: iLabel, static: false }) set _lblHeader(c: iLabel) {
        if (c) { this.lblHeader = c; }
    };

    public clbAlternates: iCheckedListbox;
    @ViewChild("clbAlternatesTempRef", { read: iCheckedListbox, static: false }) set _clbAlternates(c: iCheckedListbox) {
        if (c) { this.clbAlternates = c; }
    };
    public Styles = ControlStyles;
    constructor() {
        super();

    }
    constructorimpl(spDrugName: string) {
        this.sDrugName = spDrugName;

    }
    ngAfterViewInit(): void {

        this.MainLayoutRoot_Loaded(null, null);

    }
   
    public OKButtonClick(): boolean {
        let returnValue: boolean = false;
        this.objDrugItemInputData = new DrugItemInputData();
        if (this.clbAlternates.SelectedItem != null && this.clbAlternates.SelectedItems.Count>0) {

            const objRepItem=this.objReplacementDrug.RepItem.ToArray();
            //const objSelItem=this.clbAlternates.SelectedItems.ToArray();
            const sPresItems  =objRepItem.filter(x=>x.Value==this.arryVal[0])[0];
         



            this.objDrugItemInputData.IdentifyingName = sPresItems.DisplayText;
            let sPresItem: string[] = sPresItems.Value.Split('~');
            this.objDrugItemInputData.IdentifyingOID = Convert.ToInt64(sPresItem[0]);
            this.objDrugItemInputData.IdentifyingType = sPresItem[1];
            this.objDrugItemInputData.MCVersionNo = sPresItem[2];
            this.objDrugItemInputData.IsFormulary = (sPresItem[7] == "0") ? true : false;
            this.objDrugItemInputData.FavouritesDetailOID = 0;
            this.objDrugItemInputData.IsAccessContraint = sPresItem[3];
            this.objDrugItemInputData.IsPrescribeByBrand = sPresItem[4];
            this.objDrugItemInputData.ItemType = sPresItem[5];
            this.objDrugItemInputData.bIsReplacement = (sPresItem[6] == "0") ? true : false;
            this.objDrugItemInputData.LorenzoID = sPresItem[8];
            returnValue = true;
        }
        return returnValue;
    }
    public ReplaceDrugVal: string;
    private MainLayoutRoot_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.objReplacementDrug = ObjectHelper.CreateType<ReplacementDrugVM>(this.DataContext, ReplacementDrugVM);
        if (String.IsNullOrEmpty(this.sDrugName) || this.sDrugName ==undefined)
        this.ReplaceDrugVal = CConstants.REPLACEMENT_ITEMS.Replace("<{0}>", "");
        else this.ReplaceDrugVal = String.Format(CConstants.REPLACEMENT_ITEMS, this.sDrugName);
        this.objReplacementDrug.RepItem.forEach((oReplacementDrug) => {
            this.clbAlternates.AddItem(ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: oReplacementDrug.DisplayText,
                Value: oReplacementDrug.Value,
                IsSelected: false,
                TextWrapping: TextWrapping.Wrap
            }));

        });
        this.SetEnableDisableOkButton();
    }
    clbAlternates_OnSelect = (sender: Object, e: OnSelectEventArgs): void => {

        let iOKButton: iButton = this.GetOkButton(this);
        if (iOKButton != null)
            iOKButton.IsEnabled = true;
            this.arryVal.push(e.Value)
    }
    clbAlternates_OnUnSelect = (sender: Object, e: OnUnSelectEventArgs): void => {

        this.arryVal.splice(this.arryVal.indexOf(e.Value),1)
        if(this.arryVal.length==0)
        {

            let iOKButton: iButton = this.GetOkButton(this);
            iOKButton.IsEnabled = false;

        }

    }
    private SetEnableDisableOkButton(): void {
        let iOKButton: iButton = this.GetOkButton(this);
        if (iOKButton != null && this.clbAlternates != null && this.clbAlternates.SelectedItem != null) {
            iOKButton.IsEnabled = true;
        }
        else {
            iOKButton.IsEnabled = false;
        }
    }
}