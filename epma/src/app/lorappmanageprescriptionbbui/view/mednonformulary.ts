import { Component, ViewChild } from "@angular/core";
import { Grid, iComboBox, iLabel, iTextBox } from "epma-platform/controls";
import { ObjectHelper } from "epma-platform/helper";
import { CListItem } from "epma-platform/models";
import { iMessageBox, MessageBoxButton, MessageBoxResult, MessageBoxType, MessageEventArgs } from "epma-platform/services";
import { Busyindicator } from "src/app/lorappcommonbb/busyindicator";
import { RowDefinition } from "src/app/shared/epma-platform/controls/epma-grid/epma-grid.component";
import { Resource } from "../resource";
import { NonFormularyVM } from "../viewmodel/NonFormularyVM";
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { iAppDialogWindow } from "src/app/shared/epma-platform/controls/iAppDialogWindow";

@Component({
    selector: 'medNonFormulary',
    templateUrl: './medNonFormulary.html',
    styleUrls: ['./medNonFormulary.css'],
  })

export class medNonFormulary extends iAppDialogWindow {
        public isCancelled: boolean = false;
        oNFVM: NonFormularyVM;

        private LayoutRoot: Grid;
@ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
 if(c){ this.LayoutRoot = c; }
};
private OthersRow: RowDefinition;
@ViewChild("OthersRowTempRef", {read:RowDefinition, static: false }) set _OthersRow(c: RowDefinition){
 if(c){ this.OthersRow = c; }
};
public lblitemNameText: iLabel;
@ViewChild("lblitemNameTextTempRef", {read:iLabel, static: false }) set _lblitemNameText(c: iLabel){
 if(c){ this.lblitemNameText = c; }
};
private lblitemName: iLabel;
@ViewChild("lblitemNameTempRef", {read:iLabel, static: false }) set _lblitemName(c: iLabel){
 if(c){ this.lblitemName = c; }
};
private lblReason: iLabel;
@ViewChild("lblReasonTempRef", {read:iLabel, static: false }) set _lblReason(c: iLabel){
 if(c){ this.lblReason = c; }
};
public cboReason: iComboBox;
@ViewChild("cboReasonTempRef", {read:iComboBox, static: false }) set _cboReason(c: iComboBox){
 if(c){ this.cboReason = c; }
};
private lblOtherReason: iLabel;
@ViewChild("lblOtherReasonTempRef", {read:iLabel, static: false }) set _lblOtherReason(c: iLabel){
 if(c){ this.lblOtherReason = c; }
};
public txtOtherReason: iTextBox;
@ViewChild("txtOtherReasonTempRef", {read:iTextBox, static: false }) set _txtOtherReason(c: iTextBox){
 if(c){ this.txtOtherReason = c; }
};
private _contentLoaded: Boolean;
@ViewChild("_contentLoadedTempRef", {read:Boolean, static: false }) set __contentLoaded(c: Boolean){
 if(c){ this._contentLoaded = c; }
};

public NonForRsn = Resource.ResMedNonFormulary;
public Styles = ControlStyles;
 afterViewInit_Func:Function

        constructor() {
           super();
           //The below line moved to ConstructorImpl
            //this.DataContext = this.oNFVM = VMInstance;
        }
        constructorImpl(VMInstance: NonFormularyVM){
            this.DataContext = this.oNFVM = VMInstance;
        }
        public OKButtonClick(): boolean {
            let canClose: boolean = false;
            if (this.oNFVM.ReasonForPrescribing instanceof CListItem && !String.IsNullOrEmpty(this.oNFVM.ReasonForPrescribing.Value)) {
                canClose = true;
                if (String.Compare(this.oNFVM.ReasonForPrescribing.Value, "CC_OTHER") == 0 && String.IsNullOrEmpty(this.txtOtherReason.Text)) {
                    canClose = false;
                    iMessageBox.Show("Non formulary item", "Reason for prescribing non formulary item is mandatory, please enter any value.", MessageBoxType.Information, MessageBoxButton.OK);
                }
            }
            else {
                iMessageBox.Show("Non formulary item", "Reason for prescribing non formulary item is mandatory, please enter any value.", MessageBoxType.Information, MessageBoxButton.OK);
            }
            return canClose;
        }
        public CancelButtonClick(): void {
            let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                Title: "LORENZO",
                Message: "You are about to cancel this activity, are you sure?",
                MessageButton: MessageBoxButton.YesNo,
                IconType: MessageBoxType.Question
            });
            iMsgBox.MessageBoxClose  = (s,e) => { this.iMsgBox_MessageBoxClose(s,e); } ;
            iMsgBox.Show();
        }
        iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
            if (e.MessageBoxResult == MessageBoxResult.Yes) {
                Busyindicator.SetStatusIdle("Reorder");
                Busyindicator.SetStatusIdle("FormViewer");
                Busyindicator.SetStatusIdle("PrescribeProductOption");
                Busyindicator.SetStatusIdle("Favourites");
                Busyindicator.SetStatusIdle("IndicationreqForm");
                Busyindicator.SetStatusIdle("FormViewerClick");
                Busyindicator.SetStatusIdle("IndicationFormViewer");
                Busyindicator.SetStatusIdle("OrderSetPrescribe1");
                //this.appDialog.DialogResult = true;
                // ObjectHelper.stopFinishAndCancelEvent(false);
                this.appDialog.DialogRef.close();
            }
        }
        ngAfterViewInit(){
            if(this.afterViewInit_Func != null){
                this.afterViewInit_Func();
            }
        }
    }
