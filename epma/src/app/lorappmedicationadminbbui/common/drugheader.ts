import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ContentControl, Visibility } from 'epma-platform/models';
import { AppDialog, ContentPresenter, ScrollViewer, UserControl, iLabel,Image, TextBlock } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { ObjectHelper as Helper, ObjectHelper } from 'epma-platform/helper';
import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
import { TagDrugHeaderDetail, ValueDomainValues } from '../utilities/globalvariable';
import { PrescriptionHelper } from '../utilities/PrescriptionHelper';
import { CConstants, DoseTypeCode, InfusionTypesCode, RecordAdminType } from '../utilities/CConstants';
import { ArrayOfString } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { DrugItem } from 'src/app/lorarcbluebirdmedicationchart/common/DrugItem';
import { ResDrugHeader } from './resdrugheader.designer';
import { DisplayPrescriptionLineMedsItemPipe, DoseWrapConverterPipe, HumidificationConverterPipe, RouteWrapConverterPipe, TargetsatrangeConverterPipe } from 'src/app/lorarcbluebirdmedicationchart/converter/MedChartConverter.pipe';

@Component({ 
    selector: 'drugheader',
    templateUrl: './drugheader.html',
    styleUrls: ['./drugheader.css']
})

export class DrugHeader extends UserControl implements AfterViewInit {
    @Input() pgdDrugHeader: string;
    override _DataContext: CDrugHeader;
    override get DataContext() {
        return this._DataContext;
    }
    @Input() override set DataContext(value: CDrugHeader) {
        this._DataContext = value;
    }
    private brdHeader: ScrollViewer;
    @ViewChild("brdHeaderTempRef", { read: ScrollViewer, static: false }) set _brdHeader(c: ScrollViewer) {
        if (c) { this.brdHeader = c; }
    };
    private CntMedicatonValue: ContentControl;
    @ViewChild("CntMedicatonValueTempRef", { read: ContentControl, static: false }) set _CntMedicatonValue(c: ContentControl) {
        if (c) { this.CntMedicatonValue = c; }
    };
    private CntDoseHdrValue: ContentPresenter;
    @ViewChild("CntDoseHdrValueTempRef", { read: ContentPresenter, static: false }) set _CntDoseHdrValue(c: ContentPresenter) {
        if (c) { this.CntDoseHdrValue = c; }
    };
    private CntRouteSiteValue: ContentPresenter;
    @ViewChild("CntRouteSiteValueTempRef", { read: ContentPresenter, static: false }) set _CntRouteSiteValue(c: ContentPresenter) {
        if (c) { this.CntRouteSiteValue = c; }
    };
    private CntTargetSatValue: ContentPresenter;
    @ViewChild("CntTargetSatValueTempRef", { read: ContentPresenter, static: false }) set _CntTargetSatValue(c: ContentPresenter) {
        if (c) { this.CntTargetSatValue = c; }
    };
    private CntHumidificationValue: ContentPresenter;
    @ViewChild("CntHumidificationValueTempRef", { read: ContentPresenter, static: false }) set _CntHumidificationValue(c: ContentPresenter) {
        if (c) { this.CntHumidificationValue = c; }
    };
    public lblRec1At: TextBlock = new TextBlock();
    @ViewChild("lblRec1AtTempRef", { read: TextBlock, static: false }) set _lblRec1At(c: TextBlock) {
        if (c) { this.lblRec1At = c; }
    };
    public lblRec1AtValue: TextBlock = new TextBlock();
    @ViewChild("lblRec1AtValueTempRef", { read: TextBlock, static: false }) set _lblRec1AtValue(c: TextBlock) {
        if (c) { this.lblRec1AtValue = c; }
    };
    public lblDueAt: TextBlock = new TextBlock();
    @ViewChild("lblDueAtTempRef", { read: TextBlock, static: false }) set _lblDueAt(c: TextBlock) {
        if (c) { this.lblDueAt = c; }
    };
    public lblDueAtValue: TextBlock = new TextBlock();
    @ViewChild("lblDueAtValueTempRef", { read: TextBlock, static: false }) set _lblDueAtValue(c: TextBlock) {
        if (c) { this.lblDueAtValue = c; }
    };
    public lblReviewAt: TextBlock= new TextBlock();
    @ViewChild("lblReviewAtTempRef", { read: TextBlock, static: false }) set _lblReviewAt(c: TextBlock) {
        if (c) { this.lblReviewAt = c; }
    };
    public lblReviewAtValue: TextBlock = new TextBlock();
    @ViewChild("lblReviewAtValueTempRef", { read: TextBlock, static: false }) set _lblReviewAtValue(c: TextBlock) {
        if (c) { this.lblReviewAtValue = c; }
    };
    private ReviewImg: Image;
    @ViewChild("ReviewImgTempRef", { read: Image, static: false }) set _ReviewImg(c: Image) {
        if (c) { this.ReviewImg = c; }
    };
    public lblInstructions: TextBlock =new TextBlock();
    @ViewChild("lblInstructionsTempRef", { read: TextBlock, static: false }) set _lblInstructions(c: TextBlock) {
        if (c) { this.lblInstructions = c; }
    };
    private lblIngAdminWarning: TextBlock = new TextBlock();
    @ViewChild("lblIngAdminWarningTempRef", { read: TextBlock, static: false }) set _lblIngAdminWarning(c: TextBlock) {
        if (c) { this.lblIngAdminWarning = c; }
    };

    MedAdminLineDisplay: DisplayPrescriptionLineMedsItemPipe;
    MedDoseWrap: DoseWrapConverterPipe;
    MedRouteSiteWrap: RouteWrapConverterPipe;
    MedTargetsatrangeWrap: TargetsatrangeConverterPipe;
    MedHumidificationWrap: HumidificationConverterPipe;
    public oDrugHeader: CDrugHeader = new CDrugHeader();


    constructor() {
        super();
        this.DataContext = this.oDrugHeader;

    }
    ngAfterViewInit(): void {
    
    }
}
export class DrugHeaderItem extends ViewModelBase {
    public AdministrationInst: string;
    public Dose: string;
    public DoseLabel: string;
    public Strength: string;
    public StrengthLabel: string;
    public Drugname: string;
    public Key: string;
    public PrescriptionStatus: string;
    public PRNInst: string;
    public Route: string;
    public RouteLabel: string;
    public Site: string;
    public SiteLabel: string;
    public bIsControlDrug: boolean;
    public FrequencyText: string;
    public AsRequiredText: string;
    public bShowFrequency: boolean;
    public bShowSite: boolean;
    public bShowAsrequired: boolean;
    public ProductForm: string;
    public ItemSubType: string;
    public MultiComponentItems: ArrayOfString;
    public INFTYCODE: string;
    public Fluid: string;
    public Concentration: string;
    public BolusLabel: string;
    public BoosterDoseLabel: string;
    public RateLabel: string;
    public BoosterDose: string;
    public Rate: string;
    public DurationLabel: string;
    public Duration: string;
    public VolumeLabel: string;
    public Volume: string;
    public InfusionPeriodLabel: string;
    public InfusionPeriod: string;
    public LockOutPeriodLabel: string;
    public LockOutPeriod: string;
    public MaxDoseLabel: string;
    public MaxDose: string;
    public Lumen: string;
    public DeliveryDevice: string;
    public AdhocItemCaption: string;
    public LorenzoID: string;
    public bIsFluidControlDrug: boolean;
    public SlotStatus: string;
    public TargetSaturationRangelbl: string;
    public Humidificationlbl: string;
    public TargetSaturationRange: string;
    public Humidification: string;
    public Concentrationlbl: string;
    public Concentrationvalue: string;
    public Ongoingvalue: string;
    public bIsControlDrugICON: boolean;
    public IsPGD: boolean;

    private _AdministrationInstlblVisibility :Visibility = Visibility.Collapsed;
    public get AdministrationInstlblVisibility(): Visibility {
        return this._AdministrationInstlblVisibility;
    }
    public set AdministrationInstlblVisibility(value: Visibility) {
        this._AdministrationInstlblVisibility = value;
    }
}
export class CDrugHeader extends ViewModelBase {
    private _IsVisible: Visibility;
    public get IsVisible(): Visibility {
        return this._IsVisible;
    }
    public set IsVisible(value: Visibility) {
        this._IsVisible = value;
        // NotifyPropertyChanged("IsVisible");
    }
    private drugHdrBasicInfo: DrugHeaderItem;
    public get oDrugHdrBasicInfo(): DrugHeaderItem {
        return this.drugHdrBasicInfo;
    }
    public set oDrugHdrBasicInfo(value: DrugHeaderItem) {
        if (!Helper.ReferenceEquals(this.drugHdrBasicInfo, value))
            this.drugHdrBasicInfo = value;
    }
    private drugHdrAddnlInfo: CDrugHdrAddnlInfo;
    public get oDrugHdrAddnlInfo(): CDrugHdrAddnlInfo {
        return this.drugHdrAddnlInfo;
    }
    public set oDrugHdrAddnlInfo(value: CDrugHdrAddnlInfo) {
        if (!Helper.ReferenceEquals(this.drugHdrAddnlInfo, value))
            this.drugHdrAddnlInfo = value;
    }
    public ConvertDrugItemToDrugHeaderItem(oDrugItem: DrugItem, oDrugHeader: CDrugHeader, oDrugHdr: DrugHeader): DrugHeaderItem {
        let oDrugHeaderItem: DrugHeaderItem = new DrugHeaderItem();
        if (!String.IsNullOrEmpty(oDrugItem.AdministrationInst) && !String.IsNullOrEmpty(oDrugItem.PRNInst)) {
            oDrugHeaderItem.AdministrationInst = oDrugItem.AdministrationInst + " " + oDrugItem.PRNInst;
        }
        else if (!String.IsNullOrEmpty(oDrugItem.AdministrationInst)) {
            oDrugHeaderItem.AdministrationInst = oDrugItem.AdministrationInst;
        }
        else if (!String.IsNullOrEmpty(oDrugItem.PRNInst)) {
            oDrugHeaderItem.AdministrationInst = oDrugItem.PRNInst;
        }
        oDrugHeaderItem.DoseLabel = MedsAdminChartToolTip.DoseText;
        oDrugHeaderItem.StrengthLabel = MedsAdminChartToolTip.StrengthTextLabel;
        oDrugHeaderItem.BoosterDoseLabel = MedsAdminChartToolTip.BoosterDoseText;
        oDrugHeaderItem.RateLabel = MedsAdminChartToolTip.RateText;
        oDrugHeaderItem.DurationLabel = MedsAdminChartToolTip.DurationQualifierText;
        oDrugHeaderItem.VolumeLabel = MedsAdminChartToolTip.VolumeText;
        oDrugHeaderItem.Concentrationlbl = MedsAdminChartToolTip.ConcentrationText;
        oDrugHeaderItem.InfusionPeriodLabel = MedsAdminChartToolTip.InfusionPeriodQualifierText;
        oDrugHeaderItem.BolusLabel = MedsAdminChartToolTip.BolusText;
        oDrugHeaderItem.LockOutPeriodLabel = MedsAdminChartToolTip.LockOutText;
        oDrugHeaderItem.MaxDoseLabel = MedsAdminChartToolTip.MaxDoseText;
        oDrugHeaderItem.AdhocItemCaption = MedsAdminChartToolTip.AdhocItemCaption;
        if (oDrugItem.Tag != null) {
            let oTagDrugHeaderDetail: TagDrugHeaderDetail = <TagDrugHeaderDetail>oDrugItem.Tag;
            oDrugHeaderItem.Drugname = oTagDrugHeaderDetail.DrugName;
            oDrugHeaderItem.LorenzoID = oTagDrugHeaderDetail.LorenzoID;
            oDrugHeaderItem.ProductForm = oTagDrugHeaderDetail.ProductForm;
            oDrugHeaderItem.ItemSubType = oTagDrugHeaderDetail.ItemSubType;
            oDrugHeaderItem.MultiComponentItems = oTagDrugHeaderDetail.MultiComponentItems;
            if (!oTagDrugHeaderDetail.IsPGD) {
                if (!String.IsNullOrEmpty(oDrugItem.Dose))
                    oDrugHeaderItem.DoseLabel = MedsAdminChartToolTip.DoseText;
                else oDrugHeaderItem.DoseLabel = String.Empty;
            }
            oDrugHeaderItem.Fluid = oTagDrugHeaderDetail.Fluid;
            oDrugHeaderItem.INFTYCODE = oTagDrugHeaderDetail.INFTYCODE;
            oDrugHeaderItem.MaxDose = oTagDrugHeaderDetail.MaxDose;
            if (!String.IsNullOrEmpty(oTagDrugHeaderDetail.Lumen))
                oDrugHeaderItem.Lumen = "- " + oTagDrugHeaderDetail.Lumen;
            if (!String.IsNullOrEmpty(oTagDrugHeaderDetail.DeliveryDevice))
                oDrugHeaderItem.DeliveryDevice = "- " + oTagDrugHeaderDetail.DeliveryDevice;
            if (!String.IsNullOrEmpty(oTagDrugHeaderDetail.IsOnGoing) && String.Equals(oTagDrugHeaderDetail.IsOnGoing, "Y"))
                oDrugHeaderItem.Ongoingvalue = "- " + MedsAdminChartToolTip.OngoingText;
            if (oTagDrugHeaderDetail.Duration > 0)
                oDrugHeaderItem.Duration = PrescriptionHelper.GetDurationValue(oTagDrugHeaderDetail.Duration, oTagDrugHeaderDetail.DurationUOM) + " " + CommonBB.GetText(oTagDrugHeaderDetail.DurationUOM, ValueDomainValues.oDurationUOM).ToLower();
            if (oTagDrugHeaderDetail.Concentration > 0)
                oDrugHeaderItem.Concentration = oTagDrugHeaderDetail.Concentration.ToString() + "%";
            if (!String.IsNullOrEmpty(oTagDrugHeaderDetail.BoosterDose) && !String.IsNullOrEmpty(oTagDrugHeaderDetail.BoosterDoseUOM))
                oDrugHeaderItem.BoosterDose = oTagDrugHeaderDetail.BoosterDose + " " + oTagDrugHeaderDetail.BoosterDoseUOM;
            if (!String.IsNullOrEmpty(oTagDrugHeaderDetail.Volume) && !String.IsNullOrEmpty(oTagDrugHeaderDetail.VolumeUOM))
                oDrugHeaderItem.Volume = oTagDrugHeaderDetail.Volume + " " + oTagDrugHeaderDetail.VolumeUOM;
            if (!String.IsNullOrEmpty(oTagDrugHeaderDetail.DrugConcentration))
                oDrugHeaderItem.Concentrationvalue = oTagDrugHeaderDetail.DrugConcentration;
            if (!String.IsNullOrEmpty(oTagDrugHeaderDetail.InfusionPeriod) && !String.IsNullOrEmpty(oTagDrugHeaderDetail.InfusionPeriodUOM))
                oDrugHeaderItem.InfusionPeriod = oTagDrugHeaderDetail.InfusionPeriod + " " + oTagDrugHeaderDetail.InfusionPeriodUOM;
            if (!String.IsNullOrEmpty(oTagDrugHeaderDetail.LockOutPeriod) && !String.IsNullOrEmpty(oTagDrugHeaderDetail.LockOutPeriodUOM))
                oDrugHeaderItem.LockOutPeriod = oTagDrugHeaderDetail.LockOutPeriod + " " + oTagDrugHeaderDetail.LockOutPeriodUOM;
            if (oDrugHdr != null && oDrugHdr.oDrugHeader != null && oDrugHdr.oDrugHeader.oDrugHdrBasicInfo != null)
                oDrugHeaderItem.SlotStatus = oDrugHdr.oDrugHeader.oDrugHdrBasicInfo.SlotStatus;
            if (!String.IsNullOrEmpty(oTagDrugHeaderDetail.Rate) && !String.IsNullOrEmpty(oTagDrugHeaderDetail.RateNumeratorUOM) && !String.IsNullOrEmpty(oTagDrugHeaderDetail.RateDinominatorUOM)) {
                oDrugHeaderItem.Rate = oTagDrugHeaderDetail.Rate;
                if (!String.IsNullOrEmpty(oTagDrugHeaderDetail.UpperRate))
                    oDrugHeaderItem.Rate += " - " + oTagDrugHeaderDetail.UpperRate;
                oDrugHeaderItem.Rate += " " + oTagDrugHeaderDetail.RateNumeratorUOM + "/" + oTagDrugHeaderDetail.RateDinominatorUOM;
            }
            else if (!String.IsNullOrEmpty(oTagDrugHeaderDetail.DoseType) && !String.IsNullOrEmpty(oTagDrugHeaderDetail.INFTYCODE) && (String.Equals(oTagDrugHeaderDetail.INFTYCODE, InfusionTypesCode.CONTINUOUS) || String.Equals(oTagDrugHeaderDetail.INFTYCODE, InfusionTypesCode.FLUID)) && String.Compare(oTagDrugHeaderDetail.DoseType, DoseTypeCode.CONDITIONAL) == 0) {
                if (ValueDomainValues.oDoseType != null)
                    oDrugHeaderItem.Rate = ValueDomainValues.oDoseType.Count > 0 ? CommonBB.GetText(oTagDrugHeaderDetail.DoseType, ValueDomainValues.oDoseType) : oTagDrugHeaderDetail.DoseType;
            }
            oDrugHeaderItem.IsPGD = (oTagDrugHeaderDetail != null && oTagDrugHeaderDetail.IsPGD) ? oTagDrugHeaderDetail.IsPGD : false;
        }
        oDrugHeaderItem.Key = oDrugItem.Key;
        oDrugHeaderItem.PrescriptionStatus = oDrugItem.PrescriptionStatus;
        oDrugHeaderItem.PRNInst = oDrugItem.PRNInst;
        oDrugHeaderItem.RouteLabel = MedsAdminChartToolTip.ROUTEText;
        oDrugHeaderItem.TargetSaturationRangelbl = MedsAdminChartToolTip.TargetSatuRangeText;
        oDrugHeaderItem.Humidificationlbl = MedsAdminChartToolTip.HumidificationText.ToUpper();
        oDrugHeaderItem.SiteLabel = MedsAdminChartToolTip.SITEText;
        if (!String.IsNullOrEmpty(oDrugItem.Route)) {
            oDrugHeaderItem.Route = oDrugItem.Route;
        }
        else {
            if (String.Compare(oDrugItem.RouteLabel, CConstants.PGDDrug, StringComparison.CurrentCultureIgnoreCase) == 0) {
                oDrugHeaderItem.RouteLabel = MedsAdminChartToolTip.ROUTEText;
            }
            else {
                oDrugHeaderItem.RouteLabel = String.Empty;
            }
        }
        if (!String.IsNullOrEmpty(oDrugItem.TargetSaturation)) {
            oDrugHeaderItem.TargetSaturationRange = oDrugItem.TargetSaturation;
        }
        if (!String.IsNullOrEmpty(oDrugItem.Humidification)) {
            oDrugHeaderItem.Humidification = oDrugItem.Humidification;
        }
        if (!String.IsNullOrEmpty(oDrugItem.Site)) {
            if (oDrugHeader != null && oDrugHeader.oDrugHdrBasicInfo != null && oDrugHeader.oDrugHdrBasicInfo.bShowSite) {
                oDrugHeaderItem.Site = oDrugItem.Site;
                oDrugHeaderItem.bShowSite = true;
            }
        }
        if (!String.IsNullOrEmpty(oDrugItem.FrequencyText)) {
            if (oDrugHeader != null && oDrugHeader.oDrugHdrBasicInfo != null && oDrugHeader.oDrugHdrBasicInfo.bShowFrequency) {
                oDrugHeaderItem.FrequencyText = oDrugItem.FrequencyText;
                oDrugHeaderItem.bShowFrequency = true;
            }
        }
        if (!String.IsNullOrEmpty(oDrugItem.AsRequiredText)) {
            if (oDrugHeader != null && oDrugHeader.oDrugHdrBasicInfo != null && oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired) {
                oDrugHeaderItem.AsRequiredText = oDrugItem.AsRequiredText;
                oDrugHeaderItem.bShowAsrequired = true;
            }
        }
        if (!String.IsNullOrEmpty(oDrugItem.Dose)) {
            oDrugHeaderItem.Dose = oDrugItem.Dose;
        }
        if (!String.IsNullOrEmpty(oDrugItem.Strength)) {
            oDrugHeaderItem.Strength = oDrugItem.Strength;
        }
        if (oDrugItem.Tag != null) {
            let oTmpTagDrugHeaderDetail: TagDrugHeaderDetail = <TagDrugHeaderDetail>oDrugItem.Tag;
            oDrugHeaderItem.bIsControlDrug = oTmpTagDrugHeaderDetail.IsControlDrug;
            oDrugHeaderItem.bIsFluidControlDrug = oTmpTagDrugHeaderDetail.IsFluidControlDrug;
            if (oDrugHeader != null && oDrugHeader.drugHdrAddnlInfo != null && !String.IsNullOrEmpty(oTmpTagDrugHeaderDetail.DoseType) && String.Equals(oTmpTagDrugHeaderDetail.DoseType, DoseTypeCode.STEPPEDVARIABLE) && !String.IsNullOrEmpty(oDrugHeader.drugHdrAddnlInfo.SteppedLowerDose) && !String.Equals(oDrugHeader.drugHdrAddnlInfo.SteppedLowerDose, "0") && !String.IsNullOrEmpty(oDrugHeader.drugHdrAddnlInfo.SteppedUpperDose) && !String.Equals(oDrugHeader.drugHdrAddnlInfo.SteppedUpperDose, "0") && !String.IsNullOrEmpty(oDrugHeader.drugHdrAddnlInfo.SteppedDoseUOM)) {
                oDrugHeaderItem.Dose = String.Format("{0} ({1}-{2} {3})", oDrugItem.Dose, oDrugHeader.drugHdrAddnlInfo.SteppedLowerDose, oDrugHeader.drugHdrAddnlInfo.SteppedUpperDose, oDrugHeader.drugHdrAddnlInfo.SteppedDoseUOM);
            }
        }
        return oDrugHeaderItem;
    }
}
export class CDrugHdrAddnlInfo {
    private steppedLowerDose: string = String.Empty;
    private steppedUpperDose: string = String.Empty;
    private steppedDoseUOM: string = String.Empty;
    private recorededAtValue: string = String.Empty;
    private dueAtValue: string = String.Empty;
    private begunAtLabel: string = String.Empty;
    private dueAtLabel: string = String.Empty;
    private reviewAtLabel: string = String.Empty;
    private reviewAt: string = String.Empty;
    private reviewIconTooltip: string = String.Empty;

    private _ReviewAtlblVisibility: Visibility = Visibility.Collapsed;
    private _ReviewAtVisibility: Visibility = Visibility.Collapsed;
    private _DueAtlblVisibility: Visibility = Visibility.Collapsed;
    private _RecordedAtlblVisibility :Visibility = Visibility.Collapsed;

    public get SteppedLowerDose(): string {
        return this.steppedLowerDose;
    }
    public set SteppedLowerDose(value: string) {
        this.steppedLowerDose = value;
    }
    public get SteppedUpperDose(): string {
        return this.steppedUpperDose;
    }
    public set SteppedUpperDose(value: string) {
        this.steppedUpperDose = value;
    }
    public get SteppedDoseUOM(): string {
        return this.steppedDoseUOM;
    }
    public set SteppedDoseUOM(value: string) {
        this.steppedDoseUOM = value;
    }
    public get RecordedAt(): string {
        return this.recorededAtValue;
    }
    public set RecordedAt(value: string) {
        if (!Helper.ReferenceEquals(this.recorededAtValue, value))
            this.recorededAtValue = value;
    }
    public get RecordedAtlblVisibility(): Visibility {
        return this._RecordedAtlblVisibility;
    }
    public set RecordedAtlblVisibility(value: Visibility) {
        this._RecordedAtlblVisibility = value;
    }
    public get DueAt(): string {
        return this.dueAtValue;
    }
    public set DueAt(value: string) {
        if (!Helper.ReferenceEquals(this.dueAtValue, value))
            this.dueAtValue = value;
    }
    public get BegunAtLabel(): string {
        return this.begunAtLabel;
    }
    public set BegunAtLabel(value: string) {
        if (!Helper.ReferenceEquals(this.begunAtLabel, value))
            this.begunAtLabel = value;
    }
    public get DueAtLabel(): string {
        return this.dueAtLabel;
    }
    public set DueAtLabel(value: string) {
        if (!Helper.ReferenceEquals(this.dueAtLabel, value))
            this.dueAtLabel = value;
    }
    public get DueAtlblVisibility(): Visibility {
        return this._DueAtlblVisibility;
    }
    public set DueAtlblVisibility(value: Visibility) {
        this._DueAtlblVisibility = value;
    }

    public get ReviewAtLabel(): string {
        return this.reviewAtLabel;
    }
    public set ReviewAtLabel(value: string) {
        if (!Helper.ReferenceEquals(this.reviewAtLabel, value))
            this.reviewAtLabel = value;
    }
    public get ReviewAtlblVisibility(): Visibility {
        return this._ReviewAtlblVisibility;
    }
    public set ReviewAtlblVisibility(value: Visibility) {
        this._ReviewAtlblVisibility = value;
    }

    public get ReviewAtVisibility(): Visibility {
        return this._ReviewAtVisibility;
    }
    public set ReviewAtVisibility(value: Visibility) {
        this._ReviewAtVisibility = value;
    }
    public get ReviewAt(): string {
        return this.reviewAt;
    }
    public set ReviewAt(value: string) {
        if (!Helper.ReferenceEquals(this.reviewAt, value)) {
            this.reviewAt = value;
        }
    }
    public get ReviewIconTooltip(): string {
        return this.reviewIconTooltip;
    }
    public set ReviewIconTooltip(value: string) {
        if (!Helper.ReferenceEquals(this.reviewIconTooltip, value)) {
            this.reviewIconTooltip = value;
        }
    }
    public IngredientAdminWarning: string;
    public RecordAdminViewed: RecordAdminType;
}
