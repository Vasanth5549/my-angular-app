import { Component, OnInit } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, CListItem, ChildWindow, ContextInfo } from 'epma-platform/models';
import { AppDialog, iCheckBox, iLabel } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from "src/app/shared/epma-platform/services/objecthelper.service";
import { CConstants, DoseTypeCode, InfusionTypeCode, PrescriptionTypes, SVIconLaunchFrom } from './constants';
import *as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS';
import { ConditionalDoseVM, RequestSource } from '../viewmodel/ConditionalDoseVM';
import { DoseDetailsdata, MultipleDoseDetail, PrescriptionItemDetailsVM } from '../viewmodel/prescriptionitemdetailsvm';
import *as IPPManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { eActivityTypes } from './common';
import { TitratedDoseCommonVM, TitratedScheduleDetailsCommon } from '../viewmodel/TitratedDoseDetailsCommonVM';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { Visibility } from 'src/app/shared/epma-platform/controls-model/Visibility';
import { Resource } from '../resource';
import *as Application from 'src/app/lorappcommonbb/amshelper'
import { MedicationCommonProfileData } from './profiledata';
import { Image } from 'epma-platform/controls';
import { MouseButtonEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { medMCItems } from '../view/medmcitems';
import { medDoseCalculatorMezzanineDetails } from '../child/medDoseCalculatorMezzanineDetails';
import { MedDoseDetails } from '../view/meddosedetails';
import { MedConditionalDose } from '../view/medconditionaldose';
import { MedTitratedDose } from '../view/medtitrateddose';
import { MedTitratedDoseView } from '../view/medtitrateddoseview';
import { medsystitrateddose } from '../view/medsystitrateddose';
import { MedSteppedFullPrescriptionVW } from '../view/medSteppedFullPrescriptionVW';
import { medddetailsChild } from '../child/medddetailschild';

export class PrescriptionLineItemVM {
    oSDDet: MedSteppedFullPrescriptionVW; //Not Required for LHS. To be Re-Visited.
    public IsOther: boolean = false;
    public PrescriptionItemStatus: string;
    public IsPGD: string;
    public PrescriptionType: string;
    public PrescriptionTypeCode: string;
    public PrescriberDetails: ManagePrescSer.ObjectInfo;
    public PrescriptionItemOID: number = 0;
    public TitratedPrescriptionItemOID: number = 0;
    public PrescriptionTypeInPatientContext: string;
    public IsParacetamolIngredient: boolean = false;
    public ParacetamolAdministeredCount: number = 0;
    public IsCriticalMed: boolean = false;
    public IsDoseCalculatedByDC: boolean = false;
    public FormViewerDetails: FormViewerLineItemVM;
    private MultiDoseDetailVM: MultipleDoseDetail;
    private ConditionalVM: ConditionalDoseVM;
    private objTitrated: MedTitratedDose;
    private objSysTitrated: medsystitrateddose;

    private objConditional: MedConditionalDose;

    public IsDoseCalcInfo: boolean = false;
    public IsDoseCalcPerformed: boolean = false;
    public objDoseFormulaDef: DoseFormulaDef;
    public objMedDCDetails: medDoseCalculatorMezzanineDetails;
    private objprescitemdetvm: PrescriptionItemDetailsVM;
    private oPrescItemDetailsVM: PrescriptionItemDetailsVM;
    public oDoseCalcData: DoseDetailsdata;
    private objTitratedView: MedTitratedDoseView;
    private oMedMCItems: medMCItems;
    public oDoseRegime: ObservableCollection<IPPManagePrescSer.DoseRegime>;
    public oTitratedDoseRegime: ObservableCollection<IPPManagePrescSer.TitratedDoseRegime>;
    public TitratedAdminInstruction: string;
    public TitratedComments: string;
    public ScheduleDoseUOM: string;
    public IsHavingAdminTime: string;
    public OperationMode: string;
    public IsMultiCompIconClickable: boolean = false;
    public PrescribableItemListOID: number = 0;
    public PrescribableItemDetailOID: number = 0;
    public IsUnHoldDrug: boolean = false;
    public IsMCIChildcomponent: boolean = false;
    public IsProdAvailForChild: boolean = false;
    public IsFluid: boolean = false;
    public IsResolveGrid: boolean = false;
    private objStepped: MedSteppedFullPrescriptionVW;
    public SubscribeClickEvent(imgSteppedVariable: Image): void {
        imgSteppedVariable.MouseLeftButtonUp = (s, e) => { this.imgSteppedVariable_MouseLeftButtonUp(s, e); };
    }
    public UnSubscribeClickEvent(imgSteppedVariable: Image): void {
        // if (imgSteppedVariable != null) {
        //     imgSteppedVariable.MouseLeftButtonUp -= this.imgSteppedVariable_MouseLeftButtonUp;
        // }
    }
    private sTitle: string;
    private sInfusionType: string = String.Empty;
    private sPrecriptionTypeCode: string = String.Empty;
    private actionCode: eActivityTypes = eActivityTypes.Prescribe;
    public get ActionCode(): eActivityTypes {
        return this.actionCode;
    }
    public set ActionCode(value: eActivityTypes) {
        if (this.actionCode != value) {
            this.actionCode = value;
        }
    }
    private FillTitratedDoseCommonVM(oVM: PrescriptionLineItemVM): TitratedDoseCommonVM {
        let oTitratedDoseCommonVM: TitratedDoseCommonVM = new TitratedDoseCommonVM();
        oTitratedDoseCommonVM.TitratedAdminInstruction = oVM.TitratedAdminInstruction;
        oTitratedDoseCommonVM.TitratedComments = oVM.TitratedComments;
        let oTitratedScheduleDet: ObservableCollection<TitratedScheduleDetailsCommon> = new ObservableCollection<TitratedScheduleDetailsCommon>();
        if (oVM != null && oVM.oTitratedDoseRegime != null) {
            let nRowCount: number = 1;
            for (let i: number = 0; i < oVM.oTitratedDoseRegime.Count; i += CConstants.TitratedgridSize) {
                let oTitratedScheduleDetailsCommon: TitratedScheduleDetailsCommon = new TitratedScheduleDetailsCommon();
                oTitratedScheduleDetailsCommon.ScheduledDate = new Array(CConstants.TitratedgridSize);
                oTitratedScheduleDetailsCommon.ScheduledDate[0] = oVM.oTitratedDoseRegime[i].scheduleDTTM;
                oTitratedScheduleDetailsCommon.ScheduledDate[1] = oVM.oTitratedDoseRegime[i + 1].scheduleDTTM;
                oTitratedScheduleDetailsCommon.ScheduledDate[2] = oVM.oTitratedDoseRegime[i + 2].scheduleDTTM;
                oTitratedScheduleDetailsCommon.ScheduledDate[3] = oVM.oTitratedDoseRegime[i + 3].scheduleDTTM;
                oTitratedScheduleDetailsCommon.ScheduledDate[4] = oVM.oTitratedDoseRegime[i + 4].scheduleDTTM;
                oTitratedScheduleDetailsCommon.ScheduledDate[5] = oVM.oTitratedDoseRegime[i + 5].scheduleDTTM;
                oTitratedScheduleDetailsCommon.ScheduledDate[6] = oVM.oTitratedDoseRegime[i + 6].scheduleDTTM;
                oTitratedScheduleDetailsCommon.ScheduleDoseValue = new Array(CConstants.TitratedgridSize);
                oTitratedScheduleDetailsCommon.ScheduleDoseValue[0] = oVM.oTitratedDoseRegime[i].Dose;
                oTitratedScheduleDetailsCommon.ScheduleDoseValue[1] = oVM.oTitratedDoseRegime[i + 1].Dose;
                oTitratedScheduleDetailsCommon.ScheduleDoseValue[2] = oVM.oTitratedDoseRegime[i + 2].Dose;
                oTitratedScheduleDetailsCommon.ScheduleDoseValue[3] = oVM.oTitratedDoseRegime[i + 3].Dose;
                oTitratedScheduleDetailsCommon.ScheduleDoseValue[4] = oVM.oTitratedDoseRegime[i + 4].Dose;
                oTitratedScheduleDetailsCommon.ScheduleDoseValue[5] = oVM.oTitratedDoseRegime[i + 5].Dose;
                oTitratedScheduleDetailsCommon.ScheduleDoseValue[6] = oVM.oTitratedDoseRegime[i + 6].Dose;
                if (oVM.IsHavingAdminTime == "0") {
                    oTitratedScheduleDetailsCommon.ScheduleTime = CConstants.sDose + nRowCount;
                }
                else {
                    oTitratedScheduleDetailsCommon.ScheduleTime = oVM.oTitratedDoseRegime[i].Scheduletime;
                }
                oTitratedScheduleDetailsCommon.TitratedDoseUom = new Array(CConstants.TitratedgridSize);
                if(oVM.ScheduleDoseUOM){
                oTitratedScheduleDetailsCommon.TitratedDoseUom[0] = " " + oVM.ScheduleDoseUOM;
                oTitratedScheduleDetailsCommon.TitratedDoseUom[1] = " " + oVM.ScheduleDoseUOM;
                oTitratedScheduleDetailsCommon.TitratedDoseUom[2] = " " + oVM.ScheduleDoseUOM;
                oTitratedScheduleDetailsCommon.TitratedDoseUom[3] = " " + oVM.ScheduleDoseUOM;
                oTitratedScheduleDetailsCommon.TitratedDoseUom[4] = " " + oVM.ScheduleDoseUOM;
                oTitratedScheduleDetailsCommon.TitratedDoseUom[5] = " " + oVM.ScheduleDoseUOM;
                oTitratedScheduleDetailsCommon.TitratedDoseUom[6] = " " + oVM.ScheduleDoseUOM;
                }
                oTitratedScheduleDet.Add(oTitratedScheduleDetailsCommon);
                nRowCount++;
            }
        }
        oTitratedDoseCommonVM.GrdTitrated = oTitratedScheduleDet;
        return oTitratedDoseCommonVM;
    }
    imgSteppedVariable_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
        let img: Image = ObjectHelper.CreateType<Image>(sender, Image);
        let MonitoringPerid: string = String.Empty;
        if (img.Tag instanceof PrescriptionLineItemVM) {
            if (String.Compare(img.Name, "Stepped/Variable", StringComparison.OrdinalIgnoreCase) == 0) {
                let oVM: PrescriptionLineItemVM = ObjectHelper.CreateType<PrescriptionLineItemVM>(img.Tag, PrescriptionLineItemVM);
                this.MultiDoseDetailVM = new MultipleDoseDetail(img.Tag);
                if (String.Compare(oVM.FormViewerDetails.BasicDetails.Itemsubtype, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) == 0)
                    this.sTitle = CConstants.NOTANPREDEFMCI;
                else this.sTitle = oVM.FormViewerDetails.BasicDetails.IdentifyingName;
                if (oVM != null && oVM.FormViewerDetails != null && oVM.FormViewerDetails.BasicDetails != null && oVM.FormViewerDetails.BasicDetails.InfusionDetails != null && oVM.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType != null && oVM.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType.Value != null) {
                    this.sInfusionType = oVM.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType.Value;
                }
                if (!String.IsNullOrEmpty(PatientContext.PrescriptionType))
                    this.sPrecriptionTypeCode = PatientContext.PrescriptionType;
                this.OpenSteppedDose();
                this.MultiDoseDetailVM.PresItemDoseInfoServicedata.emit();
            }
            else if (String.Compare(img.Name, "Dosecalrb", StringComparison.OrdinalIgnoreCase) == 0) {
                this.sTitle = "Dose calculator-LORENZO";
                let oVM: PrescriptionLineItemVM = ObjectHelper.CreateType<PrescriptionLineItemVM>(img.Tag, PrescriptionLineItemVM);
                let ReqestedDose: string = String.Empty;
                this.objMedDCDetails = new medDoseCalculatorMezzanineDetails();
                //Not Required for LHS. To be Re-Visited.

                if (oVM != null && oVM.objDoseFormulaDef != null) {
                    this.objMedDCDetails.DataContext = oVM.objDoseFormulaDef;
                    if (oVM.objDoseFormulaDef.IsDoseCalcAlwaysUse == "1") {
                        this.objMedDCDetails.chkAlwsUseDoseCal.IsChecked = true;
                    }
                    else {
                        this.objMedDCDetails.chkAlwsUseDoseCal.IsChecked = false;
                    }
                    this.objMedDCDetails.lblDoseCalfrvalue.Text = oVM.objDoseFormulaDef.CalculationFor;
                    this.objMedDCDetails.lblfrqncvl.Text = oVM.objDoseFormulaDef.FrequencyName;
                    oVM.objDoseFormulaDef.DoseCalcBasedOn
                    this.objMedDCDetails.lblwtvl.Text = oVM.objDoseFormulaDef.DoseCalcBasedOn;
                    this.objMedDCDetails.lblbsafrmlvl.Text = oVM.objDoseFormulaDef.BSAFormula;
                    this.objMedDCDetails.lbldfltwttypevl.Text = oVM.objDoseFormulaDef.DefaultWeightType;
                    let sdRequestedDoseDtls: StringBuilder = new StringBuilder();
                    if (!String.IsNullOrEmpty(oVM.objDoseFormulaDef.RequestedDose)) {
                        ReqestedDose = oVM.objDoseFormulaDef.RequestedDose;
                        sdRequestedDoseDtls.Append(ReqestedDose + " ");
                    }
                    if (!String.IsNullOrEmpty(oVM.objDoseFormulaDef.RequestedUOMName)) {
                        sdRequestedDoseDtls.Append(oVM.objDoseFormulaDef.RequestedUOMName + "/");
                    }
                    if (!String.IsNullOrEmpty(oVM.objDoseFormulaDef.RequestDosePerUOM)) {
                        sdRequestedDoseDtls.Append(oVM.objDoseFormulaDef.RequestDosePerUOM);
                    }
                    if (!String.IsNullOrEmpty(oVM.objDoseFormulaDef.RequestDosePer2UOMName)) {
                        sdRequestedDoseDtls.Append("/" + oVM.objDoseFormulaDef.RequestDosePer2UOMName);
                    }
                    this.objMedDCDetails.lblreqdsvl.Text = sdRequestedDoseDtls.ToString();
                    console.log(this.objMedDCDetails);
                    AppActivity.OpenWindow(this.sTitle, this.objMedDCDetails, this.objDCDefaultView_Closed, "", false, 320, 600, false, WindowButtonType.Close, null);
                }
            }
            else if (String.Equals(img.Name, DoseTypeCode.sTITRATEDDsplyTxt, StringComparison.OrdinalIgnoreCase)) {
                Busyindicator.SetStatusBusy("Titratediconclick");
                let oVM: PrescriptionLineItemVM = ObjectHelper.CreateType<PrescriptionLineItemVM>(img.Tag, PrescriptionLineItemVM);
                this.MultiDoseDetailVM = new MultipleDoseDetail(img.Tag);
                this.TitratedPrescriptionItemOID = oVM.PrescriptionItemOID;
                if (oVM != null && oVM.FormViewerDetails != null && oVM.FormViewerDetails.BasicDetails != null && oVM.FormViewerDetails.BasicDetails.Itemsubtype != null && String.Compare(oVM.FormViewerDetails.BasicDetails.Itemsubtype, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) == 0) {
                    this.sTitle = CConstants.NOTANPREDEFMCI;
                }
                else {
                    this.sTitle = oVM.FormViewerDetails.BasicDetails.IdentifyingName;
                }
                //Revisit Required -- By Bala and sai Bug id- 49812
                if (this.PrescriptionTypeCode == undefined) {
                    this.PrescriptionTypeCode = this.PrescriptionTypeInPatientContext;
                }
                if (this.PrescriptionTypeCode == PrescriptionTypes.Discharge || this.PrescriptionTypeCode == PrescriptionTypes.Outpatient || this.PrescriptionTypeCode == PrescriptionTypes.Leave || this.PrescriptionTypeCode == PrescriptionTypes.Clerking) {
                    let oTitratedDoseCommonVM: TitratedDoseCommonVM = new TitratedDoseCommonVM();
                    oTitratedDoseCommonVM = this.FillTitratedDoseCommonVM(oVM);

                    this.objTitratedView = new MedTitratedDoseView(oTitratedDoseCommonVM);
                    this.objTitratedView.onDialogClose = this.objTitratedView_Closed;
                    AppActivity.OpenWindow(this.sTitle, this.objTitratedView, (s, e) => { this.objTitratedView_Closed(s); }, "", false, 400, 930, false, WindowButtonType.Close, null);
                }
                else {
                    this.OpenTitratedDose();
                }
            }
            else if (String.Compare(img.Name, "Conditional", StringComparison.OrdinalIgnoreCase) == 0) {
                if (this.ConditionalVM == null) {
                    let oLineItemVM: PrescriptionLineItemVM = ObjectHelper.CreateType<PrescriptionLineItemVM>(img.Tag, PrescriptionLineItemVM);
                    this.ConditionalVM = new ConditionalDoseVM(img.Tag);
                    this.sTitle = oLineItemVM.FormViewerDetails.BasicDetails.IdentifyingName;
                }
                let oLineItemLnVM: PrescriptionLineItemVM = ObjectHelper.CreateType<PrescriptionLineItemVM>(img.Tag, PrescriptionLineItemVM);
                if (oLineItemLnVM != null && oLineItemLnVM.FormViewerDetails != null && oLineItemLnVM.FormViewerDetails.BasicDetails != null && oLineItemLnVM.FormViewerDetails.BasicDetails.InfusionDetails != null) {
                    if (!String.IsNullOrEmpty(oLineItemLnVM.FormViewerDetails.BasicDetails.InfusionDetails.MonitoringPeriod) && oLineItemLnVM.FormViewerDetails.BasicDetails.InfusionDetails.MonitoringPeriodUOM != null) {
                        MonitoringPerid = oLineItemLnVM.FormViewerDetails.BasicDetails.InfusionDetails.MonitoringPeriod + "  " + oLineItemLnVM.FormViewerDetails.BasicDetails.InfusionDetails.MonitoringPeriodUOM.DisplayText;
                    }
                }
                this.objConditional = new MedConditionalDose();
                if (oLineItemLnVM.FormViewerDetails.BasicDetails.InfusionDetails != null && oLineItemLnVM.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType != null && !String.IsNullOrEmpty(oLineItemLnVM.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType.Value) && ((String.Compare(oLineItemLnVM.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType.Value, InfusionTypeCode.CONTINUOUS, StringComparison.OrdinalIgnoreCase) == 0) || (String.Compare(oLineItemLnVM.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME, StringComparison.OrdinalIgnoreCase) == 0) || (String.Compare(oLineItemLnVM.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType.Value, InfusionTypeCode.FLUID, StringComparison.OrdinalIgnoreCase) == 0))) {
                    this.ConditionalVM.IsMonitoringPeriodvisible = Visibility.Visible;
                    this.objConditional.InfusionType = oLineItemLnVM.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType.Value;
                }
                this.ConditionalVM.MonitorigPerid = MonitoringPerid;
                this.objConditional.DataContext = this.ConditionalVM;
                this.objConditional.DoseType = oLineItemLnVM.FormViewerDetails.BasicDetails.DoseType.Value;
                AppActivity.OpenWindow((this.sTitle + " - LORENZO -- Webpage Dialog"), this.objConditional, (s, e) => { this.omedobjConditional1_Closed(s); }, "", false, 250, 460, false, WindowButtonType.Close, null);
            }
            else if (String.Compare(img.Name, "MultiComponent", StringComparison.OrdinalIgnoreCase) == 0) {
                let oVM: PrescriptionLineItemVM = ObjectHelper.CreateType<PrescriptionLineItemVM>(img.Tag, PrescriptionLineItemVM);
                if (oVM.PrescribableItemListOID > 0) {
                    this.OpenMultiComponentItem(oVM.PrescribableItemListOID, oVM.FormViewerDetails.BasicDetails.IdentifyingName, oVM.FormViewerDetails.BasicDetails.MCVersion);
                }
                else {
                    this.OpenMultiComponentItem(oVM.PrescriptionItemOID, oVM.FormViewerDetails.BasicDetails.IdentifyingName, oVM.FormViewerDetails.BasicDetails.MCVersion);
                }
            }
            else if (String.Compare(img.Name, "Supplyinstr", StringComparison.OrdinalIgnoreCase) == 0) {
                let oVM: PrescriptionLineItemVM = ObjectHelper.CreateType<PrescriptionLineItemVM>(img.Tag, PrescriptionLineItemVM);
                //Not Required for LHS. To be Re-Visited.

                let ddetChild: medddetailsChild = new medddetailsChild();
                ddetChild.MedDetailsUserControl.PrescriptionItemOID = oVM.PrescriptionItemOID;
                ddetChild.MedDetailsUserControl.MCVersion = oVM.FormViewerDetails.BasicDetails.MCVersion;
                ddetChild.MedDetailsUserControl.TechValDef = true;
                ddetChild.MedDetailsUserControl.ServiceOID = oVM.FormViewerDetails.BasicDetails.ServiceOID;
                ddetChild.MedDetailsUserControl.LocationOID = oVM.FormViewerDetails.BasicDetails.LocationOID;
                let sDrugTitle: string = String.Empty;
                if (oVM.FormViewerDetails != null && oVM.FormViewerDetails.BasicDetails != null && oVM.FormViewerDetails.BasicDetails.IdentifyingName != undefined) {
                    sDrugTitle = oVM.FormViewerDetails.BasicDetails.IdentifyingName;
                }
                else sDrugTitle = " "; //sDrugTitle empty space is added to show the empty title. In Silverlight without the empty space the empty title will apper.
                // ObjectHelper.stopFinishAndCancelEvent(true);
                AppActivity.OpenWindow(sDrugTitle, ddetChild, (s, e) => { this.omedobjTechvad_closed(s); }, "", false, 650, 930, false, WindowButtonType.Close, null);

            }
            else if (String.Compare(img.Name, Resource.DoseCalculator.DoseCalci_Tooltip, StringComparison.OrdinalIgnoreCase) == 0) {
                Busyindicator.SetStatusBusy("DCIconClicked");
                let oVM: PrescriptionLineItemVM = ObjectHelper.CreateType<PrescriptionLineItemVM>(img.Tag, PrescriptionLineItemVM);

                let ddetChild: MedDoseDetails = new MedDoseDetails();
                if (oVM != null && oVM.IsDoseCalcPerformed) {
                    ddetChild.DataContext = oVM.oDoseCalcData;
                    // ObjectHelper.stopFinishAndCancelEvent(true);
                    let stitle: string = "Dose calculation details - LORENZO";
                    AppActivity.OpenWindow(stitle, ddetChild, (s, e) => { this.omedDoseDetails_Closed(s); }, "", false, 570, 820, false, WindowButtonType.Close, null);
                }

                else {
                    ddetChild.PrescriptionItemOID = oVM.PrescriptionItemOID;
                    ddetChild.MCVersion = oVM.FormViewerDetails.BasicDetails.MCVersion;
                    this.oPrescItemDetailsVM = new PrescriptionItemDetailsVM();
                    this.oPrescItemDetailsVM.GetDoseDeatils(ddetChild.PrescriptionItemOID);
                    this.oPrescItemDetailsVM.DoseDetailEvent = (s, e) => { this.PrescriptionItemDetailsVM_DoseDetailEvent(s); };
                }

            }
        }
        else if ((String.Compare(img.Name, "Stepped/Variable", StringComparison.OrdinalIgnoreCase) == 0) && this != null && !String.IsNullOrEmpty(this.OperationMode) && this.OperationMode.Equals("UA", StringComparison.InvariantCultureIgnoreCase)) {
            if (this instanceof PrescriptionLineItemVM) {
                this.MultiDoseDetailVM = new MultipleDoseDetail(this);
            }
            if (this.FormViewerDetails != null && this.FormViewerDetails.BasicDetails != null) {
                if (!String.IsNullOrEmpty(this.FormViewerDetails.BasicDetails.Itemsubtype) && String.Compare(this.FormViewerDetails.BasicDetails.Itemsubtype, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) == 0) {
                    this.sTitle = CConstants.NOTANPREDEFMCI;
                }
                else {
                    this.sTitle = this.FormViewerDetails.BasicDetails.IdentifyingName;
                }
                if (this.FormViewerDetails.BasicDetails.InfusionDetails != null && this.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType != null && this.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType.Value != null) {
                    this.sInfusionType = this.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType.Value;
                }
            }
            if (!String.IsNullOrEmpty(PatientContext.PrescriptionType)) {
                this.sPrecriptionTypeCode = PatientContext.PrescriptionType;
            }
            this.OpenSteppedDose();
            this.MultiDoseDetailVM.PresItemDoseInfoServicedata.emit();
        }
        else {
            let sDoseArray: string;
            sDoseArray = Convert.ToString(img.Tag);
            let DrgArray: string[] = sDoseArray.Split('*');
            if (DrgArray != null && DrgArray.length >= 4) {
                if (String.Compare(img.Name, "Stepped/Variable", StringComparison.OrdinalIgnoreCase) == 0) {
                    //Not Required for LHS. To be Re-Visited.

                    this.oSDDet = new MedSteppedFullPrescriptionVW();
                    if (ContextInfo.MenuCode == "MN_MED_VALIDATE_S_P2") {
                        this.oSDDet.oLaunchFrom = SVIconLaunchFrom.TechVal;
                    }
                    else if (DrgArray.length >= 5 && !String.IsNullOrEmpty(DrgArray[4]) && DrgArray[4].Equals("RHS")) {
                        this.oSDDet.oLaunchFrom = SVIconLaunchFrom.PrescribeRHS;
                    }
                    else if (DrgArray.length >= 5 && !String.IsNullOrEmpty(DrgArray[4]) && DrgArray[4].Equals("LHS")) {
                        this.oSDDet.oLaunchFrom = SVIconLaunchFrom.PrescribeLHS;
                    }
                    if (this != null && this.FormViewerDetails != null && this.FormViewerDetails.BasicDetails != null && this.FormViewerDetails.BasicDetails.InfusionDetails != null && this.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType != null && this.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType.Value != null) {
                        this.sInfusionType = this.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType.Value;
                    }
                    if (this != null && !String.IsNullOrEmpty(this.PrescriptionTypeCode)) {
                        this.sPrecriptionTypeCode = this.PrescriptionTypeCode;
                    }
                    else {
                        if (!String.IsNullOrEmpty(PatientContext.PrescriptionType)) {
                            this.sPrecriptionTypeCode = PatientContext.PrescriptionType;
                        }
                    }

                    Busyindicator.SetStatusBusy("SteppenFullPrescription");

                    this.MultiDoseDetailVM = new MultipleDoseDetail(Convert.ToInt64(DrgArray[0]), DrgArray[2], DoseTypeCode.STEPPEDVARIABLE, DrgArray[3], ((!String.IsNullOrEmpty(this.sPrecriptionTypeCode)) ? this.sPrecriptionTypeCode : PatientContext.PrescriptionType));

                    let temp =  this.MultiDoseDetailVM.PresItemDoseInfoServicedata.subscribe(()=> {       
                        this.oSDDet.DataContext = this.MultiDoseDetailVM;
                        this.oSDDet.sInfusionType = this.sInfusionType;
                        this.oSDDet.sPrescriptionTypeCode = this.sPrecriptionTypeCode;
                        this.oSDDet.onDialogClose = this.oSDDet_Closed;
                        // ObjectHelper.stopFinishAndCancelEvent(true);
                        AppActivity.OpenWindow(DrgArray[1], this.oSDDet, (s, e) => { this.oSDDet_Closed(s); }, "", false, 600, 950, false, WindowButtonType.Close, null);

                        temp.unsubscribe(); 
                    });
                }
                else if (String.Compare(img.Name, "Titrated", StringComparison.OrdinalIgnoreCase) == 0) {
                    Busyindicator.SetStatusBusy("Titratediconclick");
                    if (String.Compare(DrgArray[3], "SYS") == 0) {
                        let sDose: string = String.Empty;
                        if (!String.IsNullOrEmpty(DrgArray[1])  && DrgArray[1] != "undefined" && !String.IsNullOrEmpty(DrgArray[2]) ) {
                            sDose = DrgArray[1] + " " + DrgArray[2];
                        }
                        else if (!String.IsNullOrEmpty(DrgArray[2])) {
                            sDose = DrgArray[2];
                        }


                        this.objSysTitrated = new medsystitrateddose();
                        this.objSysTitrated.constructorimpl(sDose);
                        this.objSysTitrated.DataContext = this.MultiDoseDetailVM;
                        this.objSysTitrated.onDialogClose = this.objSysTitrated_Closed;
                        AppActivity.OpenWindow(DrgArray[0] + " - LORENZO -- Webpage Dialog", this.objSysTitrated, (s, e) => { this.objSysTitrated_Closed(s); }, "", false, 165, 365, false, WindowButtonType.Close, null);

                    }
                    else {
                        let IsClerkForIPFormView: boolean = false;
                        if (MedicationCommonProfileData.PrescribeConfig != null && !String.IsNullOrEmpty(MedicationCommonProfileData.PrescribeConfig.ClerkFormViewDefautCode) && String.Equals(MedicationCommonProfileData.PrescribeConfig.ClerkFormViewDefautCode, "CC_FRMVWRMAND") && !String.IsNullOrEmpty(this.PrescriptionTypeCode) && String.Equals(this.PrescriptionTypeCode, PrescriptionTypes.Clerking)) {
                            IsClerkForIPFormView = true;
                        }
                        this.sTitle = !String.IsNullOrEmpty(DrgArray[1]) ? DrgArray[1] + " - LORENZO -- Webpage Dialog" : String.Empty;
                        if (!String.IsNullOrEmpty(this.PrescriptionTypeCode) && (String.Equals(this.PrescriptionTypeCode, PrescriptionTypes.ForAdministration)) || IsClerkForIPFormView) {
                            this.MultiDoseDetailVM = new MultipleDoseDetail(Convert.ToInt64(DrgArray[0]), DrgArray[2], DoseTypeCode.TITRATED, "", this.PrescriptionTypeCode);
                            this.MultiDoseDetailVM.TitratedDoseCompleted = (s, e) => { this.MultiDoseDetailVM_TitratedDoseCompleted(); };
                        }
                        else {
                            this.OpenTitratedDose();
                        }
                    }
                }
                else if (String.Compare(img.Name, "Conditional", StringComparison.OrdinalIgnoreCase) == 0) {
                    if (this.ConditionalVM == null) {
                        this.ConditionalVM = new ConditionalDoseVM(RequestSource.ViewDrugDetails, this.PrescriptionItemOID, false);
                    }
                    this.objConditional = new MedConditionalDose();
                    if (this != null && this.FormViewerDetails != null && this.FormViewerDetails.BasicDetails != null && this.FormViewerDetails.BasicDetails.InfusionDetails != null && this.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType != null && this.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType.Value != null && (String.Compare(this.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType.Value, InfusionTypeCode.CONTINUOUS, StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(this.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME, StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(this.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType.Value, InfusionTypeCode.FLUID, StringComparison.OrdinalIgnoreCase) == 0)) {
                        this.ConditionalVM.IsMonitoringPeriodvisible = Visibility.Visible;
                        this.objConditional.InfusionType = this.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType.Value;
                    }
                    this.objConditional.DataContext = this.ConditionalVM;
                    this.objConditional.DoseType = this.FormViewerDetails.BasicDetails.DoseType.Value;
                    // ObjectHelper.stopFinishAndCancelEvent(true);
                    AppActivity.OpenWindow((DrgArray[1] + " - LORENZO -- Webpage Dialog"), this.objConditional, (s, e) => { this.omedobjConditional1_Closed(s); }, "", false, 250, 460, false, WindowButtonType.Close, null);

                }
            }
        }
    }
    PrescriptionItemDetailsVM_DoseDetailEvent(PresItemDetails: PrescriptionItemDetailsVM): void {
        let objDoseCalc: MedDoseDetails = new MedDoseDetails();
        objDoseCalc = new MedDoseDetails();
        objDoseCalc.DataContext = PresItemDetails.DoseDetails;
        let stitle: string = "Dose calculation details - LORENZO -- Webpage Dialog";
        let dialogWindowHeight;
        if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
            dialogWindowHeight = 470;
        }else{
            dialogWindowHeight = 700;
        }
        // ObjectHelper.stopFinishAndCancelEvent(true);
        AppActivity.OpenWindow(stitle, objDoseCalc, (s, e) => { this.omedDoseDetails_Closed(s); }, "", false, dialogWindowHeight, 820, false, WindowButtonType.Close, null);
    }
    omedDoseDetails_Closed(args: AppDialogEventargs): void {
        Busyindicator.SetStatusIdle("DCIconClicked");
        // ObjectHelper.stopFinishAndCancelEvent(false);
        (args.AppChildWindow as ChildWindow).DialogResult = true;
    }
    OpenTitratedDose(): void {
        let IsClerkForIPFormView: boolean = false;
        if (MedicationCommonProfileData.PrescribeConfig != null && !String.IsNullOrEmpty(MedicationCommonProfileData.PrescribeConfig.ClerkFormViewDefautCode) && String.Equals(MedicationCommonProfileData.PrescribeConfig.ClerkFormViewDefautCode, "CC_FRMVWRMAND") && !String.IsNullOrEmpty(this.PrescriptionTypeCode) && String.Equals(this.PrescriptionTypeCode, PrescriptionTypes.Clerking)) {
            IsClerkForIPFormView = true;
        }
        if ((this.PrescriptionTypeCode != PrescriptionTypes.Discharge && this.PrescriptionTypeCode != PrescriptionTypes.Outpatient && this.PrescriptionTypeCode != PrescriptionTypes.Leave && this.PrescriptionTypeCode != PrescriptionTypes.Clerking) || IsClerkForIPFormView) {
            this.objTitrated = new MedTitratedDose();
            this.objTitrated.DataContext = this.MultiDoseDetailVM;
            this.objTitrated.onDialogClose = this.objTitrated_Closed;
            // ObjectHelper.stopFinishAndCancelEvent(true);
            AppActivity.OpenWindow(this.sTitle, this.objTitrated, (s, e) => { this.objTitrated_Closed(s); }, "", false, 350, 480, false, WindowButtonType.Close, null);

        }
        else if (this.PrescriptionTypeCode == PrescriptionTypes.Discharge || this.PrescriptionTypeCode == PrescriptionTypes.Outpatient || this.PrescriptionTypeCode == PrescriptionTypes.Leave || this.PrescriptionTypeCode == PrescriptionTypes.Clerking) {
            if (this.PrescriptionItemOID > 0) {
                let oTitratedDoseCommonVM: TitratedDoseCommonVM = new TitratedDoseCommonVM();
                oTitratedDoseCommonVM.InputPrescriptionItemOID = this.PrescriptionItemOID;
                oTitratedDoseCommonVM.Startdttm = this.FormViewerDetails.BasicDetails.StartDTTM;
                oTitratedDoseCommonVM.PresType = this.PrescriptionTypeCode;
                this.objTitratedView = new MedTitratedDoseView(oTitratedDoseCommonVM);
                console.log("Titrateddose.afterMedTitratedDoseViewInit", this.objTitratedView, (new Date()).getTime());
            }
            if (this.FormViewerDetails != null && this.FormViewerDetails.BasicDetails != null && this.FormViewerDetails.BasicDetails.Itemsubtype != null && String.Compare(this.FormViewerDetails.BasicDetails.Itemsubtype, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) == 0) {
                this.sTitle = CConstants.NOTANPREDEFMCI;
            }
            else {
                this.sTitle = this.FormViewerDetails.BasicDetails.IdentifyingName;
            }
            this.objTitratedView.onDialogClose = this.objTitratedView_Closed;
            console.log("Titrateddose.BeforeOpenDailogue", this.objTitratedView, (new Date()).getTime());
            AppActivity.OpenWindow(this.sTitle, this.objTitratedView, (s, e) => { this.objTitratedView_Closed(s); }, "", false, 400, 930, false, WindowButtonType.Close, null);

        }
    }
    OpenSteppedDose(): void {
        Busyindicator.SetStatusBusy("SteppenFullPrescription");
        //Not Required for LHS. To be Re-Visited.

        this.objStepped = new MedSteppedFullPrescriptionVW();
        let temp =  this.MultiDoseDetailVM.PresItemDoseInfoServicedata.subscribe(()=> { 
            this.objStepped.DataContext = this.MultiDoseDetailVM;
            this.objStepped.sInfusionType = this.sInfusionType;
            this.objStepped.sPrescriptionTypeCode = this.sPrecriptionTypeCode;
            this.objStepped.onDialogClose = this.objStepped_Closed;
            this.objStepped.sLaunchMenuCode = ContextInfo.MenuCode;
            this.MultiDoseDetailVM.sPresType = this.sPrecriptionTypeCode;
            this.objStepped.oLaunchFrom = SVIconLaunchFrom.PrescribeRHS;
            // ObjectHelper.stopFinishAndCancelEvent(true);
            AppActivity.OpenWindow(this.sTitle, this.objStepped, (s, e) => { this.objStepped_Closed(s); }, "", false, 600, 980, false, WindowButtonType.Close, null);
            temp.unsubscribe(); 
        });

    }
    omedobjConditional1_Closed(args: AppDialogEventargs): void {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        (args.AppChildWindow as ChildWindow).DialogResult = true;
    }
    omedobjTechvad_closed(args: AppDialogEventargs): void {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        (args.AppChildWindow as ChildWindow).DialogResult = true;
    }
    //public delegate void SteppedCloseDelegate();
    public SteppedCloseEvent: Function;
    oSDDet_Closed(args: AppDialogEventargs): void {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        if (this.SteppedCloseEvent != null)
            this.SteppedCloseEvent();
        //Not Required for LHS. To be Re-Visited.
        Busyindicator.SetStatusIdle("SteppenFullPrescription");
        this.oSDDet.appDialog.DialogResult = true;
    }
    objSysTitrated_Closed(args: AppDialogEventargs): void {
        this.objSysTitrated.appDialog.DialogResult = true;

        Busyindicator.SetStatusIdle("Titratediconclick");
    }
    objTitrated_Closed(args: AppDialogEventargs): void {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        this.objTitrated.appDialog.DialogResult = true;
        Busyindicator.SetStatusIdle("Titratediconclick");
    }
    objTitratedView_Closed(args: AppDialogEventargs): void {
        this.objTitratedView.appDialog.DialogResult = true;
        Busyindicator.SetStatusIdle("Titratediconclick");
    }
    objDCDefaultView_Closed(args: AppDialogEventargs): void {
        // if(this.objMedDCDetails && this.objMedDCDetails.appDialog)
        if (args && args.Content) {
            //this.objMedDCDetails.appDialog.DialogResult = true; // Will Not Work
            args.Content.dupDialogRef.close();  // This Will Work
        }
    }
    MultiDoseDetailVM_TitratedDoseCompleted(): void {
        this.OpenTitratedDose();
    }
    objStepped_Closed(args: AppDialogEventargs): void {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        Busyindicator.SetStatusIdle("SteppenFullPrescription");
        this.objStepped.appDialog.DialogResult = true;
    }
    OpenMultiComponentItem(nItemOId: number, sItemName: string, sMcversion: string): void {
        this.oMedMCItems = new medMCItems();
        this.oMedMCItems.constructorimpl(nItemOId, sItemName, sMcversion);
        // ObjectHelper.stopFinishAndCancelEvent(true);
        AppActivity.OpenWindow(sItemName, this.oMedMCItems, (s, e) => { this.oMedMCItems_Closed(s); }, sItemName, false, 400, 600, false, WindowButtonType.Close, null);

    }
    oMedMCItems_Closed(args: AppDialogEventargs): void {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        this.oMedMCItems.appDialog.DialogResult = true;
    }
    public IsGPConnectItem: string;
}
export class DoseFormulaDef {
    public BSAFormula: string;
    public DoseCalcBasedOn: string;
    public CalculationFor: string;
    public RequestedDose: string;
    public IsDoseCalcAlwaysUse: string;
    public FrequencyName: string;
    public DefaultWeightType: string;
    public RequestedUOMName: string;
    public RequestDosePerUOM: string;
    public RequestDosePer2UOMName: string;
}
export class FormViewerLineItemVM {
    public BasicDetails: BasicDetailsLineItemVM;
}
export class BasicDetailsLineItemVM {
    public isDoseCalcExist: boolean = false;
    public DoseCalcExist: string;
    public StartDTTM: DateTime = DateTime.MinValue;
    public EndDTTM: DateTime = DateTime.MinValue;
    public Site: CListItem;
    public TreatmentToContinue: CListItem;
    public MedClerkModifyReason: CListItem;
    public DrugProperties: ObservableCollection<ManagePrescSer.DrugProperty>;
    public IdentifyingType: string;
    public IdentifyingName: string;
    public DoseType: CListItem;
    public Duration: string;
    public DurationUOM: CListItem;
    public StationaryType: CListItem;
    public Route: CListItem;
    public DosageForm: CListItem;
    public Dose: string;
    public UpperDose: string;
    public DoseUOM: CListItem;
    public AdminMethod: CListItem;
    public Direction: string;
    public PRNInstruction: CListItem;
    public Frequency: CListItem;
    public AdminInstruction: CListItem;
    public NoOfInstallments: number = 0;
    public BatchNumber: string;
    public ExpiryDate: DateTime = DateTime.MinValue;
    public AdditionalComments: string;
    public QuantityUOMName: string;
    public Quantity: string;
    public Strength: CListItem;
    private _SupplyInstructionText: CListItem;
    public get SupplyInstructionText(): CListItem {
        return this._SupplyInstructionText;
    }
    public set SupplyInstructionText(value: CListItem) {
        this._SupplyInstructionText = value;
    }
    public TechValSupplyInstructionText: ObservableCollection<CListItem>;
    public MCVersion: string;
    public Itemsubtype: string;
    public MCIItemDisplay: string;
    public InfusionDetails: InfusionLineItemVM;
    public SIdentifyingoriginalname: string;
    public MCIIdentifyingName: string;
    public MCIItemDrugprop: string;
    public MCILoerenzoID: string;
    public IsConditionalExists: boolean = false;
    public isNewmeds: boolean = false;
    public DaysOfWeeks: string;
    public SupplyComments: string;
    public ServiceOID: number = 0;
    public LocationOID: number = 0;
    public RHSSupplyInstrIconTooltip: boolean = false;
    public IsProdOption: boolean = false;
    public IsMedsAdminDischargePrescription: boolean = false;
    public RequestUrgency: string;
    public RequestedDTTM: DateTime = DateTime.MinValue;
    public RequestedBy: string;
    public RequestedComments: string;
    public IsSupplyRequestedforReqMed: boolean = false;
    public IsinDefiniteOmitDTTM: DateTime = DateTime.MinValue;
    public IsinDefiniteOmit: boolean = false;
    public OmittedBy: string;
    public OmitComments: string;
    public ReviewComments: string;
    public ReviewRequestedBy: string;
    public ReviewType: string;
    public TechSupplyDTTM: DateTime = DateTime.MinValue;
    private _PrescribingComments: string;
    public get PrescribingComments(): string {
        return this._PrescribingComments;
    }
    public set PrescribingComments(value: string) {
        this._PrescribingComments = value;
        if (this._PrescribingComments.length > 200)
            this.PrescribingComments_ToolTip = this._PrescribingComments.Substring(0, 199) + "...";
        else this.PrescribingComments_ToolTip = this._PrescribingComments;
    }
    public PrescribingComments_ToolTip: string;
    private _FluidSupplyInstructionText: CListItem;
    public get FluidSupplyInstructionText(): CListItem {
        return this._FluidSupplyInstructionText;
    }
    public set FluidSupplyInstructionText(value: CListItem) {
        this._FluidSupplyInstructionText = value;
    }
    _oDoseRegime: ObservableCollection<IPPManagePrescSer.DoseRegime>;
    public get oDoseRegime(): ObservableCollection<IPPManagePrescSer.DoseRegime> {
        return this._oDoseRegime;
    }
    public set oDoseRegime(value: ObservableCollection<IPPManagePrescSer.DoseRegime>) {
        this._oDoseRegime = value;
    }
}
export class InfusionLineItemVM {
    public LockoutDuration: CListItem;
    public LockOutPeriod: number = 0;
    public BolusUOM: CListItem;
    public Bolus: string;
    public BackgroundRateNumeratorUom: CListItem;
    public BackgroundRateDinominatorUom: CListItem;
    public BackgroundRate: string;
    public InfRateNumeratorUom: CListItem;
    public InfRateDinominatorUom: CListItem;
    public Rate: string;
    public InfusionType: CListItem;
    public FluidVolume: string;
    public VolumeUOM: CListItem;
    public FluidFreetext: string;
    public FluidSelectvalue: CListItem;
    public InfusionPeriodUom: CListItem;
    public InfusionPeriod: number = 0;
    public DeliveryDeviceFreetext: string;
    public DeliveryDevice: CListItem;
    public ConcentrationFreeText: string;
    public Concentration: CListItem;
    public Reviewafter: string;
    public ReviewafterUOM: CListItem;
    public ReviewafterDTTM: DateTime = DateTime.MinValue;
    public IsOnGoing: string;
    public Lumen: string;
    public TargetLowerSatRange: number = 0;
    public TargetUpperSatRange: number = 0;
    public MaxDose: string;
    public IsOxygen: boolean = false;
    public Boosterdose: string;
    public Boosterdoseuom: CListItem;
    public MonitoringPeriod: string;
    public MonitoringPeriodUOM: CListItem;
    public UpperRate: string;
    public LowConcentration: string;
    public UpperConcentration: string;
    public LowConcentrationUOM: CListItem;
    public UpperConcentrationUOM: CListItem;
    public InfusionRate: string;
    public RoundedOffTo: string;
    public IsInfContiniousFormLoaded: boolean = false;
    public Humidification: string;
    public IsInfusion: boolean = false;
}
