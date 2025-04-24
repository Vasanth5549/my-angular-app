import { Component, ViewChild } from '@angular/core';
import { StringComparison, Visibility } from 'epma-platform/models';
import { Border, iLabel, MouseButtonEventArgs, ScrollViewer, UserControl } from 'epma-platform/controls';
import { ObjectHelper } from 'epma-platform/helper';
import { MedsScanProductDetailVM, PrescriptionItemDetailsVM } from '../viewmodel/prescriptionitemdetailsvm';
import { Grid } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { medsadmindetails } from '../resource/medsadmindetails.designer';
import { RoutedEventArgs, ScrollBarVisibility } from 'src/app/shared/epma-platform/controls/Control';
import { CConstants, DrugItemSubTypeCode } from '../utilities/constants';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";

@Component({
    selector: 'MedsAdminEventDetails',
    templateUrl: './medsadmineventdetails.html',
    styles: ['.test ::ng-deep kendo-label{ display:inline-block !important}']
    
})

export class MedsAdminEventDetails extends UserControl {
    public scrollbar: ScrollViewer = new ScrollViewer();
    @ViewChild("scrollbarTempRef", { read: ScrollViewer, static: false }) set _scrollbar(c: ScrollViewer) {
        if (c) { this.scrollbar = c; }
    };
    public LayoutRootLabel: Grid;
    @ViewChild("LayoutRootLabelTempRef", { read: Grid, static: false }) set _LayoutRootLabel(c: Grid) {
        if (c) { this.LayoutRootLabel = c; }
    };
    public innerleft: Grid;
    @ViewChild("innerleftTempRef", { read: Grid, static: false }) set _innerleft(c: Grid) {
        if (c) { this.innerleft = c; }
    };
    public bgdinfdose = new Border();
    @ViewChild("bgdinfdoseTempRef", { read: Border, static: false }) set _bgdinfdose(c: Border) {
        if (c) { this.bgdinfdose = c; }
    };
    public bgdinfconcentration = new Border();
    @ViewChild("bgdinfconcentrationTempRef", { read: Border, static: false }) set _bgdinfconcentration(c: Border) {
        if (c) { this.bgdinfconcentration = c; }
    };
    public bgdinfperiod = new Border();
    @ViewChild("bgdinfperiodTempRef", { read: Border, static: false }) set _bgdinfperiod(c: Border) {
        if (c) { this.bgdinfperiod = c; }
    };
    public bgdlumen = new Border();
    @ViewChild("bgdlumenTempRef", { read: Border, static: false }) set _bgdlumen(c: Border) {
        if (c) { this.bgdlumen = c; }
    };
    public bgddeldevice = new Border();
    @ViewChild("bgddeldeviceTempRef", { read: Border, static: false }) set _bgddeldevice(c: Border) {
        if (c) { this.bgddeldevice = c; }
    };
    public bgdvolinf = new Border();
    @ViewChild("bgdvolinfTempRef", { read: Border, static: false }) set _bgdvolinf(c: Border) {
        if (c) { this.bgdvolinf = c; }
    };
    public bgdadminby = new Border();
    @ViewChild("bgdadminbyTempRef", { read: Border, static: false }) set _bgdadminby(c: Border) {
        if (c) { this.bgdadminby = c; }
    };
    public brdinfdose = new Border();
    @ViewChild("brdinfdoseTempRef", { read: Border, static: false }) set _brdinfdose(c: Border) {
        if (c) { this.brdinfdose = c; }
    };
    public brdinfconcentration = new Border();
    @ViewChild("brdinfconcentrationTempRef", { read: Border, static: false }) set _brdinfconcentration(c: Border) {
        if (c) { this.brdinfconcentration = c; }
    };
    public brdinfperiod = new Border();
    @ViewChild("brdinfperiodTempRef", { read: Border, static: false }) set _brdinfperiod(c: Border) {
        if (c) { this.brdinfperiod = c; }
    };
    public brdSite = new Border();
    @ViewChild("brdSiteTempRef", { read: Border, static: false }) set _brdSite(c: Border) {
        if (c) { this.brdSite = c; }
    };
    public brdlumen = new Border();
    @ViewChild("brdlumenTempRef", { read: Border, static: false }) set _brdlumen(c: Border) {
        if (c) { this.brdlumen = c; }
    };
    public brddeldevice = new Border();
    @ViewChild("brddeldeviceTempRef", { read: Border, static: false }) set _brddeldevice(c: Border) {
        if (c) { this.brddeldevice = c; }
    };
    public brdvolinf = new Border();
    @ViewChild("brdvolinfTempRef", { read: Border, static: false }) set _brdvolinf(c: Border) {
        if (c) { this.brdvolinf = c; }
    };
    public brdadminby = new Border();
    @ViewChild("brdadminbyTempRef", { read: Border, static: false }) set _brdadminby(c: Border) {
        if (c) { this.brdadminby = c; }
    };
    public lblaction = new iLabel();
    @ViewChild("lblactionTempRef", { read: iLabel, static: false }) set _lblaction(c: iLabel) {
        if (c) { this.lblaction = c; }
    };
    public lblactionData = new iLabel();
    @ViewChild("lblactionDataTempRef", { read: iLabel, static: false }) set _lblactionData(c: iLabel) {
        if (c) { this.lblactionData = c; }
    };
    public lblRouteAdminstered = new iLabel();
    @ViewChild("lblRouteAdminsteredTempRef", { read: iLabel, static: false }) set _lblRouteAdminstered(c: iLabel) {
        if (c) { this.lblRouteAdminstered = c; }
    };
    public lblRouteAdminsteredData = new iLabel();
    @ViewChild("lblRouteAdminsteredDataTempRef", { read: iLabel, static: false }) set _lblRouteAdminsteredData(c: iLabel) {
        if (c) { this.lblRouteAdminsteredData = c; }
    };
    public lblinfusiondose = new iLabel();
    @ViewChild("lblinfusiondoseTempRef", { read: iLabel, static: false }) set _lblinfusiondose(c: iLabel) {
        if (c) { this.lblinfusiondose = c; }
    };
    public lblinfusiondosedata = new iLabel();
    @ViewChild("lblinfusiondosedataTempRef", { read: iLabel, static: false }) set _lblinfusiondosedata(c: iLabel) {
        if (c) { this.lblinfusiondosedata = c; }
    };
    public lblinfConcentration = new iLabel();
    @ViewChild("lblinfConcentrationTempRef", { read: iLabel, static: false }) set _lblinfConcentration(c: iLabel) {
        if (c) { this.lblinfConcentration = c; }
    };
    public lblinfConcentrationdata = new iLabel();
    @ViewChild("lblinfConcentrationdataTempRef", { read: iLabel, static: false }) set _lblinfConcentrationdata(c: iLabel) {
        if (c) { this.lblinfConcentrationdata = c; }
    };
    public lblinfusionperiod = new iLabel();
    @ViewChild("lblinfusionperiodTempRef", { read: iLabel, static: false }) set _lblinfusionperiod(c: iLabel) {
        if (c) { this.lblinfusionperiod = c; }
    };
    public lblinfusionperioddata = new iLabel();
    @ViewChild("lblinfusionperioddataTempRef", { read: iLabel, static: false }) set _lblinfusionperioddata(c: iLabel) {
        if (c) { this.lblinfusionperioddata = c; }
    };
    public lblSiteAdministered = new iLabel();
    @ViewChild("lblSiteAdministeredTempRef", { read: iLabel, static: false }) set _lblSiteAdministered(c: iLabel) {
        if (c) { this.lblSiteAdministered = c; }
    };
    public lblSiteAdministereddata = new iLabel();
    @ViewChild("lblSiteAdministereddataTempRef", { read: iLabel, static: false }) set _lblSiteAdministereddata(c: iLabel) {
        if (c) { this.lblSiteAdministereddata = c; }
    };
    public lbllumen = new iLabel();
    @ViewChild("lbllumenTempRef", { read: iLabel, static: false }) set _lbllumen(c: iLabel) {
        if (c) { this.lbllumen = c; }
    };
    public lbllumendata = new iLabel();
    @ViewChild("lbllumendataTempRef", { read: iLabel, static: false }) set _lbllumendata(c: iLabel) {
        if (c) { this.lbllumendata = c; }
    };
    public lblDeldevice = new iLabel();
    @ViewChild("lblDeldeviceTempRef", { read: iLabel, static: false }) set _lblDeldevice(c: iLabel) {
        if (c) { this.lblDeldevice = c; }
    };
    public lblDeldevicedata = new iLabel();
    @ViewChild("lblDeldevicedataTempRef", { read: iLabel, static: false }) set _lblDeldevicedata(c: iLabel) {
        if (c) { this.lblDeldevicedata = c; }
    };
    public lblVolinfused = new iLabel();
    @ViewChild("lblVolinfusedTempRef", { read: iLabel, static: false }) set _lblVolinfused(c: iLabel) {
        if (c) { this.lblVolinfused = c; }
    };
    public lblVolinfusedata = new iLabel();
    @ViewChild("lblVolinfusedataTempRef", { read: iLabel, static: false }) set _lblVolinfusedata(c: iLabel) {
        if (c) { this.lblVolinfusedata = c; }
    };
    public lblAdminby = new iLabel();
    @ViewChild("lblAdminbyTempRef", { read: iLabel, static: false }) set _lblAdminby(c: iLabel) {
        if (c) { this.lblAdminby = c; }
    };
    public lbladminbyData = new iLabel();
    @ViewChild("lbladminbyDataTempRef", { read: iLabel, static: false }) set _lbladminbyData(c: iLabel) {
        if (c) { this.lbladminbyData = c; }
    };
    public lblWitnessedBy = new iLabel();
    @ViewChild("lblWitnessedByTempRef", { read: iLabel, static: false }) set _lblWitnessedBy(c: iLabel) {
        if (c) { this.lblWitnessedBy = c; }
    };
    public lblWitnessedByData = new iLabel();
    @ViewChild("lblWitnessedByDataTempRef", { read: iLabel, static: false }) set _lblWitnessedByData(c: iLabel) {
        if (c) { this.lblWitnessedByData = c; }
    };
    public lblRecordedAt = new iLabel();
    @ViewChild("lblRecordedAtTempRef", { read: iLabel, static: false }) set _lblRecordedAt(c: iLabel) {
        if (c) { this.lblRecordedAt = c; }
    };
    public lblRecordedAtData = new iLabel();
    @ViewChild("lblRecordedAtDataTempRef", { read: iLabel, static: false }) set _lblRecordedAtData(c: iLabel) {
        if (c) { this.lblRecordedAtData = c; }
    };
    public lblRecordedBy = new iLabel();
    @ViewChild("lblRecordedByTempRef", { read: iLabel, static: false }) set _lblRecordedBy(c: iLabel) {
        if (c) { this.lblRecordedBy = c; }
    };
    public lblRecordedByData = new iLabel();
    @ViewChild("lblRecordedByDataTempRef", { read: iLabel, static: false }) set _lblRecordedByData(c: iLabel) {
        if (c) { this.lblRecordedByData = c; }
    };
    public lblAdministeredBy = new iLabel();
    @ViewChild("lblAdministeredByTempRef", { read: iLabel, static: false }) set _lblAdministeredBy(c: iLabel) {
        if (c) { this.lblAdministeredBy = c; }
    };
    public lblAdministeredByData = new iLabel();
    @ViewChild("lblAdministeredByDataTempRef", { read: iLabel, static: false }) set _lblAdministeredByData(c: iLabel) {
        if (c) { this.lblAdministeredByData = c; }
    };
    public lblRelation = new iLabel();
    @ViewChild("lblRelationTempRef", { read: iLabel, static: false }) set _lblRelation(c: iLabel) {
        if (c) { this.lblRelation = c; }
    };
    public lblRelationData = new iLabel();
    @ViewChild("lblRelationDataTempRef", { read: iLabel, static: false }) set _lblRelationData(c: iLabel) {
        if (c) { this.lblRelationData = c; }
    };
    public innerRight: Grid;
    @ViewChild("innerRightTempRef", { read: Grid, static: false }) set _innerRight(c: Grid) {
        if (c) { this.innerRight = c; }
    };
    public bgdhumidification = new Border();
    @ViewChild("bgdhumidificationTempRef", { read: Border, static: false }) set _bgdhumidification(c: Border) {
        if (c) { this.bgdhumidification = c; }
    };
    public bgdbagvol = new Border();
    @ViewChild("bgdbagvolTempRef", { read: Border, static: false }) set _bgdbagvol(c: Border) {
        if (c) { this.bgdbagvol = c; }
    };
    public bgdinfrate = new Border();
    @ViewChild("bgdinfrateTempRef", { read: Border, static: false }) set _bgdinfrate(c: Border) {
        if (c) { this.bgdinfrate = c; }
    };
    public bgddriprate = new Border();
    @ViewChild("bgddriprateTempRef", { read: Border, static: false }) set _bgddriprate(c: Border) {
        if (c) { this.bgddriprate = c; }
    };
    public brdHumidification = new Border();
    @ViewChild("brdHumidificationTempRef", { read: Border, static: false }) set _brdHumidification(c: Border) {
        if (c) { this.brdHumidification = c; }
    };
    public brdbagvol = new Border();
    @ViewChild("brdbagvolTempRef", { read: Border, static: false }) set _brdbagvol(c: Border) {
        if (c) { this.brdbagvol = c; }
    };
    public brdinfrate = new Border();
    @ViewChild("brdinfrateTempRef", { read: Border, static: false }) set _brdinfrate(c: Border) {
        if (c) { this.brdinfrate = c; }
    };
    public brddriprate = new Border();
    @ViewChild("brddriprateTempRef", { read: Border, static: false }) set _brddriprate(c: Border) {
        if (c) { this.brddriprate = c; }
    };
    public brdDoseDiscrepancyReason = new Border();
    @ViewChild("brdDoseDiscrepancyReasonTempRef", { read: Border, static: false }) set _brdDoseDiscrepancyReason(c: Border) {
        if (c) { this.brdDoseDiscrepancyReason = c; }
    };
    public lblHumidification = new iLabel();
    @ViewChild("lblHumidificationTempRef", { read: iLabel, static: false }) set _lblHumidification(c: iLabel) {
        if (c) { this.lblHumidification = c; }
    };
    public lblHumidificationData = new iLabel();
    @ViewChild("lblHumidificationDataTempRef", { read: iLabel, static: false }) set _lblHumidificationData(c: iLabel) {
        if (c) { this.lblHumidificationData = c; }
    };
    public lblBatchNumber = new iLabel();
    @ViewChild("lblBatchNumberTempRef", { read: iLabel, static: false }) set _lblBatchNumber(c: iLabel) {
        if (c) { this.lblBatchNumber = c; }
    };
    public lblBatchNumberData = new iLabel();
    @ViewChild("lblBatchNumberDataTempRef", { read: iLabel, static: false }) set _lblBatchNumberData(c: iLabel) {
        if (c) { this.lblBatchNumberData = c; }
    };
    public lblbagvolume = new iLabel();
    @ViewChild("lblbagvolumeTempRef", { read: iLabel, static: false }) set _lblbagvolume(c: iLabel) {
        if (c) { this.lblbagvolume = c; }
    };
    public lblbagvolumeData = new iLabel();
    @ViewChild("lblbagvolumeDataTempRef", { read: iLabel, static: false }) set _lblbagvolumeData(c: iLabel) {
        if (c) { this.lblbagvolumeData = c; }
    };
    public lblinfusionrate = new iLabel();
    @ViewChild("lblinfusionrateTempRef", { read: iLabel, static: false }) set _lblinfusionrate(c: iLabel) {
        if (c) { this.lblinfusionrate = c; }
    };
    public lblinfusionratedata = new iLabel();
    @ViewChild("lblinfusionratedataTempRef", { read: iLabel, static: false }) set _lblinfusionratedata(c: iLabel) {
        if (c) { this.lblinfusionratedata = c; }
    };
    public lbldriprate = new iLabel();
    @ViewChild("lbldriprateTempRef", { read: iLabel, static: false }) set _lbldriprate(c: iLabel) {
        if (c) { this.lbldriprate = c; }
    };
    public lbldripratedata = new iLabel();
    @ViewChild("lbldripratedataTempRef", { read: iLabel, static: false }) set _lbldripratedata(c: iLabel) {
        if (c) { this.lbldripratedata = c; }
    };
    public lblExpiryDate = new iLabel();
    @ViewChild("lblExpiryDateTempRef", { read: iLabel, static: false }) set _lblExpiryDate(c: iLabel) {
        if (c) { this.lblExpiryDate = c; }
    };
    public lblExpiryDateData = new iLabel();
    @ViewChild("lblExpiryDateDataTempRef", { read: iLabel, static: false }) set _lblExpiryDateData(c: iLabel) {
        if (c) { this.lblExpiryDateData = c; }
    };
    public lblDoseDiscrepancyReason = new iLabel();
    @ViewChild("lblDoseDiscrepancyReasonTempRef", { read: iLabel, static: false }) set _lblDoseDiscrepancyReason(c: iLabel) {
        if (c) { this.lblDoseDiscrepancyReason = c; }
    };
    public lblDoseDiscrepancyReasonData = new iLabel();
    @ViewChild("lblDoseDiscrepancyReasonDataTempRef", { read: iLabel, static: false }) set _lblDoseDiscrepancyReasonData(c: iLabel) {
        if (c) { this.lblDoseDiscrepancyReasonData = c; }
    };
    public lblReason = new iLabel();
    @ViewChild("lblReasonTempRef", { read: iLabel, static: false }) set _lblReason(c: iLabel) {
        if (c) { this.lblReason = c; }
    };
    public lblReasonData = new iLabel();
    @ViewChild("lblReasonDataTempRef", { read: iLabel, static: false }) set _lblReasonData(c: iLabel) {
        if (c) { this.lblReasonData = c; }
    };
    public lblComments = new iLabel();
    @ViewChild("lblCommentsTempRef", { read: iLabel, static: false }) set _lblComments(c: iLabel) {
        if (c) { this.lblComments = c; }
    };
    public lblCommentsData = new iLabel();
    @ViewChild("lblCommentsDataTempRef", { read: iLabel, static: false }) set _lblCommentsData(c: iLabel) {
        if (c) { this.lblCommentsData = c; }
    };
    public lbldosediscComments = new iLabel();
    @ViewChild("lbldosediscCommentsTempRef", { read: iLabel, static: false }) set _lbldosediscComments(c: iLabel) {
        if (c) { this.lbldosediscComments = c; }
    };
    public lbldosediscCommentsData = new iLabel();
    @ViewChild("lbldosediscCommentsDataTempRef", { read: iLabel, static: false }) set _lbldosediscCommentsData(c: iLabel) {
        if (c) { this.lbldosediscCommentsData = c; }
    };
    public lblviewrecordmedication = new iLabel();
    @ViewChild("lblviewrecordmedicationTempRef", { read: iLabel, static: false }) set _lblviewrecordmedication(c: iLabel) {
        if (c) { this.lblviewrecordmedication = c; }
    };

    public Styles = ControlStyles;
    medsadmindetailsToolTip: medsadmindetails;
    lblviewrecordmedication_MouseLeftButtonUp_Func: Function;
    objPrescriptionItemDetailsVM: PrescriptionItemDetailsVM;
    oMedsAdminEventDetails: MedsAdminEventDetails;

    public maxGridHeight = 250;
    constructor() {
        super();
    }
    ngOnInit(): void{
        this.lblviewrecordmedication_MouseLeftButtonUp_Func = (s,e)=>{this.lblviewrecordmedication_MouseLeftButtonUp(s,e)};
    }

    ngAfterViewInit(): void {
        this.DefaultAction();
        this.MedsAdminEventDetails_Loaded({}, null);
        let elem = (document.querySelectorAll('medddetails')[0])?.querySelectorAll('#medddetailsRx')[0];
        if(elem.children[1]?.scrollHeight){
            this.maxGridHeight = ((elem.children[1].scrollHeight) - 80)/2;
        }
    }
    public MedsAdminEventDetails_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.oMedsAdminEventDetails = new MedsAdminEventDetails();
        if (this.DataContext != null) {
            this.objPrescriptionItemDetailsVM = ObjectHelper.CreateType<PrescriptionItemDetailsVM>(this.DataContext, PrescriptionItemDetailsVM);
            if (String.Compare(CConstants.CancelledStatusTermText, this.objPrescriptionItemDetailsVM.DrugDetails.Status, StringComparison.CurrentCultureIgnoreCase) != 0) {
            }
            if (this.objPrescriptionItemDetailsVM.AdditionalDetails.IsInfusion)
                this.scrollbar.VerticalScrollBarVisibility = ScrollBarVisibility.Visible;
            else this.scrollbar.VerticalScrollBarVisibility = ScrollBarVisibility.Auto;
            if (this.objPrescriptionItemDetailsVM.AdminList == null) {
                this.objPrescriptionItemDetailsVM.IsViewRecMedLinkExists = Visibility.Collapsed;
            }
        }
        this.UpdatelblVisibility();
    }

    public lblviewrecordmedication_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
        if (this.DataContext != null) {
            let MedsScanProductlinkDetails: MedsScanProductDetailVM;
            MedsScanProductlinkDetails = new MedsScanProductDetailVM();
            if (this.objPrescriptionItemDetailsVM != null) {
                MedsScanProductlinkDetails.MedAdminOID = this.objPrescriptionItemDetailsVM.SelectedSlot.MedAdminOID;
                MedsScanProductlinkDetails.MedAdminHistoryOID = this.objPrescriptionItemDetailsVM.SelectedSlot.MedAdminHistoryOID;
                if (this.objPrescriptionItemDetailsVM.SelectedSlot.SelectedInfAction != null) {
                    MedsScanProductlinkDetails.MedAdminInfusionOID = this.objPrescriptionItemDetailsVM.SelectedSlot.SelectedInfAction.MedInfusionOID;
                }
                else {
                    MedsScanProductlinkDetails.MedAdminInfusionOID = this.objPrescriptionItemDetailsVM.SelectedSlot.MedAdminInfusionOID;
                }
                MedsScanProductlinkDetails.PrescriptionitemOID = this.objPrescriptionItemDetailsVM.SelectedSlot.PrescriptionItemOID;
                MedsScanProductlinkDetails.PrescriptionItemScheduleOID = this.objPrescriptionItemDetailsVM.SelectedSlot.ScheduleOID;
                MedsScanProductlinkDetails.MCVersion = this.objPrescriptionItemDetailsVM.MCVersion;
            }
            MedsScanProductlinkDetails.GetScanRecordDetails();
        }
    }
    DefaultAction() {
        this.lblaction.Visibility = Visibility.Collapsed;
        this.lblactionData.Visibility = Visibility.Collapsed;
        this.lblinfusiondose.Visibility = Visibility.Collapsed;
        this.lblinfusiondose.Visibility = Visibility.Collapsed;
        this.lblinfConcentration.Visibility = Visibility.Collapsed;
        this.lblinfConcentrationdata.Visibility = Visibility.Collapsed;
        this.lblinfusionperiod.Visibility = Visibility.Collapsed;
        this.lblinfusionperioddata.Visibility = Visibility.Collapsed;
        this.lbllumen.Visibility = Visibility.Collapsed;
        this.lbllumendata.Visibility = Visibility.Collapsed;
        this.lblDeldevice.Visibility = Visibility.Collapsed;
        this.lblDeldevicedata.Visibility = Visibility.Collapsed;
        this.lblVolinfused.Visibility = Visibility.Collapsed;
        this.lblVolinfusedata.Visibility = Visibility.Collapsed;
        this.lblbagvolume.Visibility = Visibility.Collapsed;
        this.lblbagvolumeData.Visibility = Visibility.Collapsed;
        this.lblinfusionrate.Visibility = Visibility.Collapsed;
        this.lblinfusionratedata.Visibility = Visibility.Collapsed;
        this.lbldriprate.Visibility = Visibility.Collapsed;
        this.lbldripratedata.Visibility = Visibility.Collapsed;
        this.lblAdminby.Visibility = Visibility.Collapsed;
        this.lbladminbyData.Visibility = Visibility.Collapsed;
        this.lblHumidification.Visibility = Visibility.Collapsed;
        this.lblHumidificationData.Visibility = Visibility.Collapsed;

        this.brdadminby.Visibility = Visibility.Collapsed;
        this.brddeldevice.Visibility = Visibility.Collapsed;
        this.brddriprate.Visibility = Visibility.Collapsed;
        this.brdlumen.Visibility = Visibility.Collapsed;
        this.brdvolinf.Visibility = Visibility.Collapsed;
        this.brdbagvol.Visibility = Visibility.Collapsed;
        this.brdinfrate.Visibility = Visibility.Collapsed;
        this.bgdadminby.Visibility = Visibility.Collapsed;
        this.bgddeldevice.Visibility = Visibility.Collapsed;
        this.bgdlumen.Visibility = Visibility.Collapsed;
        this.bgdvolinf.Visibility = Visibility.Collapsed;
        this.bgdbagvol.Visibility = Visibility.Collapsed;
        this.bgdinfdose.Visibility = Visibility.Collapsed;
        this.bgdinfconcentration.Visibility = Visibility.Collapsed;
        this.bgdinfperiod.Visibility = Visibility.Collapsed;
        this.brdinfdose.Visibility = Visibility.Collapsed;
        this.brdinfconcentration.Visibility = Visibility.Collapsed;
        this.brdinfperiod.Visibility = Visibility.Collapsed;
        this.brdHumidification.Visibility = Visibility.Collapsed;
        this.bgdhumidification.Visibility = Visibility.Collapsed;
        this.bgdinfrate.Visibility = Visibility.Collapsed;
        this.bgddriprate.Visibility = Visibility.Collapsed;
    }

    private UpdatelblVisibility() {
        if (((this.objPrescriptionItemDetailsVM.DrugDetails.InfusionDetails.InfusionType != null && !String.IsNullOrEmpty(this.objPrescriptionItemDetailsVM.DrugDetails.InfusionDetails.InfusionType.Value))) && !this.objPrescriptionItemDetailsVM.AdditionalDetails.IsBolus) {
            this.lblaction.Visibility = Visibility.Visible;
            this.lblactionData.Visibility = Visibility.Visible;

            this.lblinfusiondose.Visibility = Visibility.Visible;
            this.lblinfusiondosedata.Visibility = Visibility.Visible;

            this.lblinfConcentration.Visibility = Visibility.Visible;
            this.lblinfConcentrationdata.Visibility = Visibility.Visible;

            this.lblinfusionperiod.Visibility = Visibility.Visible;
            this.lblinfusionperioddata.Visibility = Visibility.Visible;

            this.lbllumen.Visibility = Visibility.Visible;
            this.lbllumendata.Visibility = Visibility.Visible;

            this.lblDeldevice.Visibility = Visibility.Visible;
            this.lblDeldevicedata.Visibility = Visibility.Visible;

            this.lblVolinfused.Visibility = Visibility.Visible;
            this.lblVolinfusedata.Visibility = Visibility.Visible;

            this.lblbagvolume.Visibility = Visibility.Visible;
            this.lblbagvolumeData.Visibility = Visibility.Visible;

            this.lblinfusionrate.Visibility = Visibility.Visible;
            this.lblinfusionratedata.Visibility = Visibility.Visible;

            this.lbldriprate.Visibility = Visibility.Visible;
            this.lbldripratedata.Visibility = Visibility.Visible;

            this.lblAdminby.Visibility = Visibility.Visible;
            this.lbladminbyData.Visibility = Visibility.Visible;

            this.lblHumidification.Visibility = Visibility.Visible;
            this.lblHumidificationData.Visibility = Visibility.Visible;

            this.brdadminby.Visibility = Visibility.Visible;
            this.brddeldevice.Visibility = Visibility.Visible;
            this.brddriprate.Visibility = Visibility.Visible;
            this.brdlumen.Visibility = Visibility.Visible;
            this.brdvolinf.Visibility = Visibility.Visible;
            this.brdbagvol.Visibility = Visibility.Visible;
            this.brdinfrate.Visibility = Visibility.Visible;
            this.bgdadminby.Visibility = Visibility.Visible;
            this.bgddeldevice.Visibility = Visibility.Visible;
            this.bgddriprate.Visibility = Visibility.Visible;
            this.bgdlumen.Visibility = Visibility.Visible;
            this.bgdvolinf.Visibility = Visibility.Visible;
            this.bgdinfrate.Visibility = Visibility.Visible;
            this.bgdbagvol.Visibility = Visibility.Visible;
            this.bgdinfdose.Visibility = Visibility.Visible;
            this.bgdinfconcentration.Visibility = Visibility.Visible;
            this.bgdinfperiod.Visibility = Visibility.Visible;
            this.brdinfdose.Visibility = Visibility.Visible;
            this.brdinfconcentration.Visibility = Visibility.Visible;
            this.brdinfperiod.Visibility = Visibility.Visible;
            this.brdHumidification.Visibility = Visibility.Visible;
            this.bgdhumidification.Visibility = Visibility.Visible;
        }
        if (((this.objPrescriptionItemDetailsVM.DrugDetails.InfusionDetails.InfusionType != null && !String.IsNullOrEmpty(this.objPrescriptionItemDetailsVM.DrugDetails.InfusionDetails.InfusionType.Value))) && this.objPrescriptionItemDetailsVM.AdditionalDetails.IsBolus) {
            this.lblaction.Visibility = Visibility.Visible;
            this.lblactionData.Visibility = Visibility.Visible;

            this.lblinfusiondose.Visibility = Visibility.Visible;
            this.lblinfusiondosedata.Visibility = Visibility.Visible;

            this.lblinfConcentration.Visibility = Visibility.Visible;
            this.lblinfConcentrationdata.Visibility = Visibility.Visible;

            this.lblinfusionperiod.Visibility = Visibility.Visible;
            this.lblinfusionperioddata.Visibility = Visibility.Visible;

            this.lbllumen.Visibility = Visibility.Visible;
            this.lbllumendata.Visibility = Visibility.Visible;

            this.lblDeldevice.Visibility = Visibility.Visible;
            this.lblDeldevicedata.Visibility = Visibility.Visible;

            this.lblVolinfused.Visibility = Visibility.Visible;
            this.lblVolinfusedata.Visibility = Visibility.Visible;

            this.lblbagvolume.Visibility = Visibility.Visible;
            this.lblbagvolumeData.Visibility = Visibility.Visible;

            this.lblinfusionrate.Visibility = Visibility.Visible;
            this.lblinfusionratedata.Visibility = Visibility.Visible;

            this.lbldriprate.Visibility = Visibility.Visible;
            this.lbldripratedata.Visibility = Visibility.Visible;

            this.lblAdminby.Visibility = Visibility.Visible;
            this.lbladminbyData.Visibility = Visibility.Visible;

            this.lblHumidification.Visibility = Visibility.Visible;
            this.lblHumidificationData.Visibility = Visibility.Visible;

            this.brdadminby.Visibility = Visibility.Visible;
            this.brddeldevice.Visibility = Visibility.Collapsed;
            this.brddriprate.Visibility = Visibility.Visible;
            this.brdlumen.Visibility = Visibility.Collapsed;
            this.brdvolinf.Visibility = Visibility.Collapsed;
            this.brdbagvol.Visibility = Visibility.Collapsed;
            this.brdinfrate.Visibility = Visibility.Collapsed;
            this.bgdadminby.Visibility = Visibility.Visible;
            this.bgddeldevice.Visibility = Visibility.Visible;
            this.bgdlumen.Visibility = Visibility.Visible;
            this.bgdvolinf.Visibility = Visibility.Visible;
            this.bgdbagvol.Visibility = Visibility.Collapsed;
            this.bgdinfdose.Visibility = Visibility.Visible;
            this.bgdinfconcentration.Visibility = Visibility.Visible;
            this.bgdinfperiod.Visibility = Visibility.Visible;
            this.brdinfdose.Visibility = Visibility.Visible;
            this.brdinfconcentration.Visibility = Visibility.Collapsed;
            this.brdinfperiod.Visibility = Visibility.Visible;
            this.brdHumidification.Visibility = Visibility.Collapsed;
            this.bgdhumidification.Visibility = Visibility.Visible;
            this.bgdinfrate.Visibility = Visibility.Collapsed;
            this.bgddriprate.Visibility = Visibility.Collapsed;
        }
        if (!String.IsNullOrEmpty(this.objPrescriptionItemDetailsVM.DrugDetails.ItemSubType) && String.Compare(this.objPrescriptionItemDetailsVM.DrugDetails.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0) {
            this.lblaction.Visibility = Visibility.Visible;
            this.lblactionData.Visibility = Visibility.Visible;

            this.lblinfusiondose.Visibility = Visibility.Visible;
            this.lblinfusiondosedata.Visibility = Visibility.Visible;

            this.lblinfConcentration.Visibility = Visibility.Visible;
            this.lblinfConcentrationdata.Visibility = Visibility.Visible;

            this.lblinfusionperiod.Visibility = Visibility.Visible;
            this.lblinfusionperioddata.Visibility = Visibility.Visible;

            this.lbllumen.Visibility = Visibility.Visible;
            this.lbllumendata.Visibility = Visibility.Visible;

            this.lblDeldevice.Visibility = Visibility.Visible;
            this.lblDeldevicedata.Visibility = Visibility.Visible;

            this.lblVolinfused.Visibility = Visibility.Visible;
            this.lblVolinfusedata.Visibility = Visibility.Visible;

            this.lblbagvolume.Visibility = Visibility.Visible;
            this.lblbagvolumeData.Visibility = Visibility.Visible;

            this.lblinfusionrate.Visibility = Visibility.Visible;
            this.lblinfusionratedata.Visibility = Visibility.Visible;

            this.lbldriprate.Visibility = Visibility.Visible;
            this.lbldripratedata.Visibility = Visibility.Visible;

            this.lblAdminby.Visibility = Visibility.Visible;
            this.lbladminbyData.Visibility = Visibility.Visible;

            this.lblHumidification.Visibility = Visibility.Visible;
            this.lblHumidificationData.Visibility = Visibility.Visible;

            this.brdadminby.Visibility = Visibility.Visible;
            this.brddeldevice.Visibility = Visibility.Visible;
            this.brddriprate.Visibility = Visibility.Visible;
            this.brdlumen.Visibility = Visibility.Collapsed;
            this.brdvolinf.Visibility = Visibility.Collapsed;
            this.brdbagvol.Visibility = Visibility.Collapsed;
            this.brdinfrate.Visibility = Visibility.Collapsed;
            this.bgdadminby.Visibility = Visibility.Visible;
            this.bgddeldevice.Visibility = Visibility.Visible;
            this.bgddriprate.Visibility = Visibility.Visible;
            this.bgdlumen.Visibility = Visibility.Collapsed;
            this.bgdvolinf.Visibility = Visibility.Collapsed;
            this.bgdinfrate.Visibility = Visibility.Collapsed;
            this.bgdbagvol.Visibility = Visibility.Collapsed;
            this.bgdinfdose.Visibility = Visibility.Visible;
            this.bgdinfconcentration.Visibility = Visibility.Visible;
            this.bgdinfperiod.Visibility = Visibility.Visible;
            this.brdHumidification.Visibility = Visibility.Collapsed;
            this.bgdhumidification.Visibility = Visibility.Visible;
            this.brdinfdose.Visibility = Visibility.Collapsed;
            this.brdinfconcentration.Visibility = Visibility.Collapsed;
            this.brdinfperiod.Visibility = Visibility.Collapsed;
        }
        if ((this.objPrescriptionItemDetailsVM != null) && (this.objPrescriptionItemDetailsVM.AdditionalDetails != null) && (this.objPrescriptionItemDetailsVM.AdditionalDetails.IsInfusion) && (this.objPrescriptionItemDetailsVM.AdditionalDetails.IsPGD == '1') && !this.objPrescriptionItemDetailsVM.AdditionalDetails.IsBolus) {
            this.bgdinfrate.Visibility = Visibility.Visible;
            this.brdinfrate.Visibility = Visibility.Visible;
            this.lblinfusionrate.Visibility = Visibility.Visible;
            this.lblinfusionratedata.Visibility = Visibility.Visible;
        }
    }
}
