import 'epma-platform/stringextension';
import "epma-platform/objectextension";
import { CListItem, Int32, List } from 'epma-platform/models';
import { GPcStatus, MedImage,MedImages } from "../models/constant";
import { CConstants,PrescriptionTypes } from '../../../product/shared/models/constant';
import { ObservableCollection } from "../../../shared/epma-platform/models/observable-collection";
import DateTime from 'epma-platform/DateTime';
import { HorizontalAlignment,VerticalAlignment,SolidColorBrush,Colors,Thickness,FontWeights, Cursors, Stretch,FontFamily, BitmapImage, Uri, UriKind, ToolTipService, FontStyles, TextWrapping, Run, RichTextBox, Color, TextAlignment, Grid, GridLength, Border} from 'epma-platform/controls';
import { iLabel, TextBlock } from "epma-platform/controls";
import { iLabelInLineElement } from "../../../shared/epma-platform/controls/epma-label/epma-label.component"
import {ObjectHelper} from 'epma-platform/helper';
import {Type,Environment, NotImplementedException} from '../../../product/shared/models/Common';
import { Image } from '../../../shared/epma-platform/controls/epma-image/epma-image.component';
import { StackPanel } from '../../../shared/epma-platform/controls/epma-stackpanel/epma-stackpanel.component';
import {StringBuilder} from 'epma-platform/services';
import { CultureInfo } from "epma-platform/models";
import {Convert} from '../../../shared/epma-platform/services/convert.service';
import {StringComparison,double,Double,Enum,ClerkFormViewDeftBehaviour,ContextInfo} from 'epma-platform/models';
import { PatientContext} from 'src/app/lorappcommonbb/utilities/globalvariable';
import { ProfileData } from 'src/app/lorappmanageprescriptionbbui/utilities/profiledata';
import { LineDisplayHelper } from 'src/app/lorappmedicationcommonbb/converter/medicationconverters';
import { PrescriptionItemVM } from 'src/app/lorappmanageprescriptionbbui/viewmodel/PrescriptionItemVM';
import { Resource } from '../../../lorappmanageprescriptionbbui/resource/index';
import { ConflictIcons } from '../../../lorappmanageprescriptionbbui/model/common';
import { Common } from '../../../lorappmanageprescriptionbbui/utilities/common';
import { CommonFlags } from '../../../lorappmanageprescriptionbbui/utilities/globalvariable';
import { GPConnectItemVM } from 'src/app/lorappmanageprescriptionbbui/viewmodel/GPConnectItemVM';
import { ConflictsVM } from 'src/app/lorappmedicationcommonbb/viewmodel/conflictsvm';
import { TextDecorations } from 'src/app/shared/epma-platform/controls/Control';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { IPPMABaseVM } from 'src/app/lorappmanageprescriptionbbui/viewmodel/ippmabasevm';
import { Paragraph } from 'src/app/shared/epma-platform/controls/epma-richtextbox/epma-richtextbox.component';
import { InlineUIContainer } from 'src/app/shared/epma-platform/controls/epma-inline-uicontainer/epma-inline-uicontainer.component';
import { DispenseStatusListConceptCodeData, WarningConceptCode } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { DrugProperty } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { ScheduleDetailsCols, SupplyDetails } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemdetailsvm';
import { ColumnDefinition, RowDefinition } from 'src/app/shared/epma-platform/controls/epma-grid/epma-grid.component';
import { MedicationPrescribeVM } from 'src/app/lorappmanageprescriptionbbui/ca/prescribe/medicationprescribevm';
import { MedAccessConstraintsVM } from 'src/app/lorappmanageprescriptionbbui/viewmodel/medaccessconstraintsvm';
import { RelateItem } from 'src/app/lorappmanageprescriptionbbui/viewmodel/RelateItem';
import { MultipleDoseDetail } from 'src/app/lorappmanageprescriptionbbui/viewmodel/MultipleDoseDetail';
import { DrugItemBasicInfo, IPPMCPresctiptionItem, TechValidatedItem } from '../models/ippmamanageprescriptionws';
import { SupplyHistoryDetails } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { CommPrescriptionItemViewVM } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemviewvm';
import { ClinicallyVerifyVM } from "src/app/lorappmanageprescriptionbbui/viewmodel/clinicallyverifyvm";

export class CListItemsDisplay {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): any {
        let strDisplayText: StringBuilder = new StringBuilder();
        let oListItems: ObservableCollection<CListItem> = ObjectHelper.CreateType<ObservableCollection<CListItem>>(value, ObservableCollection<CListItem> );
        let sSeperator: string = ",";
        let sCntrl: string = String.Empty;
        if (parameter != null) {
            let sTemp: string = parameter.ToString();
            sSeperator = sTemp.Substring(0, 1);
            if (sTemp.length > 1)
                sCntrl = parameter.ToString().Substring(1);
        }
        if (oListItems instanceof ObservableCollection && oListItems.Count > 0) {
            let SelectedItems = oListItems.Where(oItem => oItem.IsSelected);
            let nLen: number = SelectedItems.Count();
            for (let i: number = 0; i < nLen; i++) {
                let oItem: CListItem = SelectedItems.ElementAt(i);
                if (oItem != null) {
                    if (String.Compare(oItem.Value, CConstants.OtherFreeText, StringComparison.CurrentCultureIgnoreCase) == 0) {
                        if (oItem.Tag != null) {
                            if (String.Equals(sCntrl, "P")) {
                                let stag: string = oItem.Tag.ToString();
                                stag = stag.Replace("\r\n", " ");
                                stag = stag.Replace("\r", " ");
                                stag = stag.Replace("\n", " ");
                                strDisplayText.Append(oItem.DisplayText + ":" + stag);
                            }
                            else {
                                strDisplayText.Append(oItem.DisplayText + ":" + oItem.Tag);
                            }
                        }
                        else {
                            strDisplayText.Append(oItem.DisplayText);
                        }
                    }
                    else {
                        strDisplayText.Append(oItem.DisplayText);
                    }
                    if (i < nLen - 1) {
                        strDisplayText.Append(sSeperator);
                    }
                }
            }
        }
        let sReturn: string = strDisplayText.ToString();
        if (String.IsNullOrEmpty(sReturn)) {
            if (String.Compare(sCntrl, "D") == 0) {
                sReturn = "Select dispensing instructions to enter value(s)";
            }
            else if (String.Compare(sCntrl, "M") == 0) {
                sReturn = "Select medication clerking source to enter value(s)";
            }
            else if (String.Compare(sCntrl, "E") == 0) {
                sReturn = "Select endorsement properties to enter value(s)";
            }
            else if (String.Compare(sCntrl, "I") == 0) {
                sReturn = "Select instalment instructions to enter value(s)";
            }
        }
        return sReturn;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class WrapToolTip {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): any {
        let sToolTip: string = String.Empty;
        if (value != null) {
            sToolTip = value.ToString();
        }
        let dMaxWidth: double;
        if (!(parameter != null && Double.TryParse(parameter.ToString(), (dMaxWidth) => {dMaxWidth=dMaxWidth})))
            dMaxWidth = 220;
        return ObjectHelper.CreateObject(new iLabel(), { MaxWidth: dMaxWidth, IsWordwrap: true, Text: sToolTip });
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let sToolTip: string = String.Empty;
        let lblToolTip: iLabel = <iLabel>value;
        if (lblToolTip instanceof iLabel)
            sToolTip = lblToolTip.Text;
        return sToolTip;
    }
}
export class DTTMDisplay {
    public Convert(value: Object, targetType: Type, parameter: Object, culture:CultureInfo): Object {
        let date: DateTime= <DateTime>value;
        if (date.Year >= CConstants.DateTimeMinYear && date.Year < DateTime.MaxValue.Year)
            return date.ToString(parameter.ToString());
        else return String.Empty;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture:CultureInfo): Object {
        if (culture == null)
            culture = CultureInfo.InvariantCulture;
        if (value != null && !String.IsNullOrEmpty(value.ToString()))
            return DateTime.ParseExact(value.ToString(), parameter.ToString(), culture);
        else return DateTime.MinValue;
    }
}
export class StartDTTMDisplay {
 Months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    public Convert(value: Object, targetType: Type, parameter: Object, culture:CultureInfo): Object {
        let sDTTM: string = String.Empty;
        let oPrescDetails: PrescriptionItemVM = <PrescriptionItemVM>value;
        let StartDate: DateTime= oPrescDetails.FormViewerDetails.BasicDetails.StartDTTM;
        if (StartDate.Date == DateTime.MinValue.Date)
            StartDate = oPrescDetails.FormViewerDetails.BasicDetails.CompleteStartDTTM;
        if (StartDate.Date == DateTime.MinValue.Date && !oPrescDetails.FormViewerDetails.BasicDetails.Partialdate)
            return String.Empty;
        else if (oPrescDetails.FormViewerDetails.BasicDetails.Completedate || oPrescDetails.FormViewerDetails.BasicDetails.Partialdate) {
            if (oPrescDetails.FormViewerDetails.BasicDetails.Completedate) {
                return StartDate.ToString(CConstants.ShortDateFormat);
            }
            else {
                let sStartDate: string = String.Empty;
                let MonthNo: number = 0;
                if (oPrescDetails.FormViewerDetails.BasicDetails.Month != null) {
                    MonthNo = Convert.ToInt32(Enum.Parse(/*typeof*/StartDTTMDisplay.EnumVals, oPrescDetails.FormViewerDetails.BasicDetails.Month.Value, true));
                }
                if (oPrescDetails.FormViewerDetails.BasicDetails.Year > 0) {
                    if (MonthNo != 0)
                        sStartDate = this.Months[MonthNo - 1] + "-" + oPrescDetails.FormViewerDetails.BasicDetails.Year.ToString();
                    else sStartDate = oPrescDetails.FormViewerDetails.BasicDetails.Year.ToString();
                }
                return sStartDate;
            }
        }
        else if (String.Compare(oPrescDetails.FormViewerDetails.BasicDetails.DateCommenced, "CC_Month", StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(oPrescDetails.FormViewerDetails.BasicDetails.DateCommenced, "CC_Year", StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(oPrescDetails.FormViewerDetails.BasicDetails.DateCommenced, "CC_Complete", StringComparison.OrdinalIgnoreCase) == 0) {
            if (String.Compare(oPrescDetails.FormViewerDetails.BasicDetails.DateCommenced, "CC_Month", StringComparison.OrdinalIgnoreCase) == 0) {
                return StartDate.ToString("MMM-yyyy");
            }
            else if (String.Compare(oPrescDetails.FormViewerDetails.BasicDetails.DateCommenced, "CC_Year", StringComparison.OrdinalIgnoreCase) == 0) {
                return StartDate.ToString("yyyy");
            }
            else if (String.Compare(oPrescDetails.FormViewerDetails.BasicDetails.DateCommenced, "CC_Complete", StringComparison.OrdinalIgnoreCase) == 0) {
                return StartDate.ToString(CConstants.ShortDateFormat);
            }
            else return String.Empty;
        }
        else return StartDate.ToString(CConstants.ShortDateFormat);
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        if (value != null && !String.IsNullOrEmpty(value.ToString()))
            return DateTime.ParseExact(value.ToString(), parameter.ToString(), culture);
        else return DateTime.MinValue;
    }
}
export class InfoIcon {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let InformationIcon: StackPanel = new StackPanel();
        let oVM: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(value, PrescriptionItemVM);
        let sToolTip: string = String.Empty;
        let IsDST: boolean = false, IsAmbiguous = false, IsInvalid = false;
        if (oVM instanceof PrescriptionItemVM) {
            let infoIcon: Image = null;
            if (parameter != null && parameter.ToString() == "TechCA") {
                if (oVM.IsAmendment == '1') {
                    InformationIcon.Children.Add(this.GetImage(Resource.prescribedrugs.Amend_Header, MedImage.GetPath(MedImages.CommentIcon), Resource.prescribedrugs.Commenticon_Tooltip));
                }
                let _prescriptionItemStatus: string = oVM.PrescriptionItemStatus;
                if (String.Equals(_prescriptionItemStatus, CConstants.CLINICALLYVERIFIED, StringComparison.InvariantCultureIgnoreCase)) {
                    if (oVM.FormViewerDetails != null && oVM.FormViewerDetails.BasicDetails != null && oVM.FormViewerDetails.BasicDetails.ClinicallyVerifiedAt != DateTime.MinValue && (!String.IsNullOrEmpty(oVM.FormViewerDetails.BasicDetails.ClinicallyVerifiedBy))) {
                        sToolTip = String.Format(Resource.prescribedrugs.InfoiconAcknowledged_Tooltip, oVM.FormViewerDetails.BasicDetails.ClinicallyVerifiedBy, oVM.FormViewerDetails.BasicDetails.ClinicallyVerifiedAt.ConvertToUser((o1) => {IsDST=o1}, (o2) => { IsAmbiguous = o2},(o3) => {IsInvalid=o3}).ToDateTimeString(IsDST, IsAmbiguous, CConstants.DateHMFormat));
                        if (!String.IsNullOrEmpty(oVM.FormViewerDetails.BasicDetails.ClinicallyVerifiedComments)) {
                            sToolTip = sToolTip + String.Format(Resource.prescribedrugs.InfoiconAcknowledgedComment_Tooltip, oVM.FormViewerDetails.BasicDetails.ClinicallyVerifiedComments);
                        }
                        infoIcon = this.GetImageWithScrollBar("Verified", MedImage.GetPath(MedImages.Acknowledged), sToolTip.Replace("\\r\\n", Environment.NewLine));
                    }
                    else {
                        infoIcon = this.GetImageWithScrollBar(Resource.prescribedrugs.Verified, MedImage.GetPath(MedImages.Acknowledged), Resource.prescribedrugs.Verified);
                    }
                }
                if (infoIcon != null) {
                    InformationIcon.Children.Add(infoIcon);
                }
            }
            else {
                let _prescriptionItemStatus: string = oVM.PrescriptionItemStatus;
                let bInformationIconAlreadyAddedWhileCV: boolean = false;
                if (parameter != null && (String.Equals(Convert.ToString(parameter), "ClinicalVerify") || String.Equals(Convert.ToString(parameter), "ClinicalVrfy") || String.Equals(Convert.ToString(parameter), "AuthorisePrescription")) && oVM.IsConflictsExists && String.Compare(_prescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase) != 0 && String.Compare(_prescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) != 0) {
                    if ((String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.InvariantCultureIgnoreCase) != 0 && !(PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory)) || (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.InvariantCultureIgnoreCase) == 0 && ProfileData.MedConflictConfig != null && ProfileData.MedConflictConfig.DisplayConflicts == '1')) {
                        InformationIcon.Children.Add(this.GetLinkImage("Conflicts", MedImage.GetPath(MedImages.MandatoryIndicator), Resource.prescribedrugs.BubbleConflicts_Tooltip, value));
                        bInformationIconAlreadyAddedWhileCV = true;
                    }
                }
                if (String.Compare(_prescriptionItemStatus, CConstants.CLINICALLYVERIFIED, StringComparison.InvariantCultureIgnoreCase) == 0) {
                    if (oVM.FormViewerDetails != null && oVM.FormViewerDetails.BasicDetails != null && oVM.FormViewerDetails.BasicDetails.ClinicallyVerifiedAt != DateTime.MinValue) {
                        sToolTip = String.Format(Resource.prescribedrugs.InfoiconAcknowledged_Tooltip, oVM.FormViewerDetails.BasicDetails.ClinicallyVerifiedBy, oVM.FormViewerDetails.BasicDetails.ClinicallyVerifiedAt.ConvertToUser((o1) => {IsDST=o1;},(o2) => { IsAmbiguous=o2;},(o3) => {IsInvalid=o3;}).ToDateTimeString(IsDST, IsAmbiguous, CConstants.DateHMFormat));
                        if (!String.IsNullOrEmpty(oVM.FormViewerDetails.BasicDetails.ClinicallyVerifiedComments)) {
                            sToolTip = sToolTip + String.Format(Resource.prescribedrugs.InfoiconAcknowledgedComment_Tooltip, oVM.FormViewerDetails.BasicDetails.ClinicallyVerifiedComments);
                        }
                    }
                    infoIcon = this.GetImageWithScrollBar("Verified", MedImage.GetPath(MedImages.Acknowledged), sToolTip.Replace("\\r\\n", Environment.NewLine));
                    if (parameter != null && (String.Equals((Convert.ToString(parameter)), "ClinicalVerify", StringComparison.InvariantCultureIgnoreCase)) || (String.Equals(Convert.ToString(parameter), "AuthorisePrescription", StringComparison.InvariantCultureIgnoreCase))) {
                        oVM.SubscribeConflictIconEventForPrescNote(infoIcon);
                    }
                }
                else if (String.Compare(_prescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) == 0) {
                    infoIcon = this.GetImage("Discontinued", MedImage.GetPath(MedImages.DiscontinuedIcon), Resource.prescribedrugs.dicontinueico_Tootlip);
                    if (parameter != null && (String.Equals((Convert.ToString(parameter)), "ClinicalVerify", StringComparison.InvariantCultureIgnoreCase)) || (String.Equals(Convert.ToString(parameter), "AuthorisePrescription", StringComparison.InvariantCultureIgnoreCase))) {
                        oVM.SubscribeConflictIconEventForPrescNote(infoIcon);
                    }
                    else if (parameter != null && (String.Equals((Convert.ToString(parameter)), "ClinicalVrfy", StringComparison.InvariantCultureIgnoreCase)) || (String.Equals(Convert.ToString(parameter), "AuthorisePrescription", StringComparison.InvariantCultureIgnoreCase))) {
                        if (oVM.SubscribeFormViewerIconClickEvent != undefined) {
                            oVM.SubscribeFormViewerIconClickEvent(infoIcon);
                        }
                    }
                }
                else if (String.Compare(_prescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase) == 0) {
                    if (oVM.IsPGD == '1') {
                        if (String.Equals(_prescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase)) {
                            infoIcon = this.GetImage("PGD administration cancelled", MedImage.GetPath(MedImages.CancelIcon), Resource.prescribedrugs.PGDCancelled);
                        }
                    }
                    else {
                        infoIcon = this.GetImage("Cancelled", MedImage.GetPath(MedImages.CancelIcon), Resource.prescribedrugs.cancelicon_Tooltip);
                    }
                    if (parameter != null && (String.Equals((Convert.ToString(parameter)), "ClinicalVerify", StringComparison.InvariantCultureIgnoreCase)) || (String.Equals(Convert.ToString(parameter), "AuthorisePrescription", StringComparison.InvariantCultureIgnoreCase))) {
                        oVM.SubscribeConflictIconEventForPrescNote(infoIcon);
                    }
                }
                else if (String.Compare(_prescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) == 0) {
                    if (String.Compare(oVM.PrescriptionItemStatusCode, CConstants.CLINICALLYVERIFIED, StringComparison.InvariantCultureIgnoreCase) == 0) {
                        InformationIcon.Children.Add(this.GetImageWithScrollBar("Verified", MedImage.GetPath(MedImages.Acknowledged), sToolTip.Replace("\\r\\n", Environment.NewLine)));
                    }
                    if (oVM.IsPGD == '1') {
                        if (String.Equals(_prescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)) {
                            infoIcon = this.GetImage("PGD administration completed", MedImage.GetPath(MedImages.CompletedIcon), Resource.prescribedrugs.PGDCompleted);
                        }
                    }
                    else {
                        infoIcon = this.GetImage("Completed", MedImage.GetPath(MedImages.CompletedIcon), Resource.prescribedrugs.CompletedIcon_Tooltip);
                    }
                    if (parameter != null && (String.Equals((Convert.ToString(parameter)), "ClinicalVerify", StringComparison.InvariantCultureIgnoreCase)) || (String.Equals(Convert.ToString(parameter), "AuthorisePrescription", StringComparison.InvariantCultureIgnoreCase))) {
                        oVM.SubscribeConflictIconEventForPrescNote(infoIcon);
                    }
                }
                else if (String.Compare(_prescriptionItemStatus, CConstants.ONHOLD, StringComparison.InvariantCultureIgnoreCase) == 0) {
                    infoIcon = this.GetImage("Hold", MedImage.GetPath(MedImages.HoldIcon), Resource.prescribedrugs.Holdicon_Tooltip);
                }
                else if (String.Compare(_prescriptionItemStatus, CConstants.AWAITINGAUTHORISE, StringComparison.InvariantCultureIgnoreCase) == 0) {
                    infoIcon = this.GetImage("PendingAuth", MedImage.GetPath(MedImages.PendingIcon), Resource.prescribedrugs.Pendingicon_Tooltip);
                }
                if (infoIcon != null) {
                    InformationIcon.Children.Add(infoIcon);
                }
                if (oVM.IsAmendment == '1') {
                    if (parameter != null && (String.Equals((Convert.ToString(parameter)), "ClinicalVerify", StringComparison.InvariantCultureIgnoreCase)) || (String.Equals(Convert.ToString(parameter), "AuthorisePrescription", StringComparison.InvariantCultureIgnoreCase))) 
                    {
                        let amend = this.GetImage("Amend", MedImage.GetPath(MedImages.CommentIcon), Resource.prescribedrugs.Commenticon_Tooltip)
                        InformationIcon.Children.Add(amend);
                        oVM.SubscribeConflictIconEventForPrescNote(ObjectHelper.CreateType<Image>(InformationIcon.Children[InformationIcon.Children.Count - 1], Image));
                    }
                    else if (parameter != null && (String.Equals((Convert.ToString(parameter)), "ClinicalVrfy", StringComparison.InvariantCultureIgnoreCase))) {
                        let amend = this.GetImage("Amend", MedImage.GetPath(MedImages.CommentIcon), Resource.prescribedrugs.Commenticon_Tooltip);
                        InformationIcon.Children.Add(amend);
                        if (oVM.SubscribeFormViewerIconClickEvent != undefined)
                            oVM.SubscribeFormViewerIconClickEvent(amend);
                    }
		    else 
		        InformationIcon.Children.Add(this.GetImage("Amend", MedImage.GetPath(MedImages.CommentIcon), Resource.prescribedrugs.Commenticon_Tooltip));

                }
                oVM.GetConflictImageStatus();
                let Istypeindrug: boolean = false;
                if (oVM.FormViewerDetails != null && oVM.FormViewerDetails.BasicDetails != null && !String.IsNullOrEmpty(oVM.FormViewerDetails.BasicDetails.IdentifyingType) && (String.Equals(oVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.InvariantCultureIgnoreCase) || String.Equals(oVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.Precatalog, StringComparison.InvariantCultureIgnoreCase))) {
                    Istypeindrug = true;
                }
                if (!Istypeindrug) {
                    if (oVM.TrafficSymbol as ConflictIcons == ConflictIcons.Red && (String.Compare(_prescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) != 0)) {
                        InformationIcon.Children.Add(this.GetLinkImage("Red", MedImage.GetPath(MedImages.RedStar), Resource.MedicationForm.MandatoryMsgTooltip, value));
                        if (!bInformationIconAlreadyAddedWhileCV)
                        InformationIcon.Children.Add(this.GetLinkImage("Conflicts", MedImage.GetPath(MedImages.MandatoryIndicator), Resource.prescribedrugs.BubbleConflicts_Tooltip, value));
                    }
                    else if (oVM.TrafficSymbol as ConflictIcons == ConflictIcons.Amber && (String.Compare(_prescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) != 0)) {
                        InformationIcon.Children.Add(this.GetLinkImage("Amber", MedImage.GetPath(MedImages.Amber), Resource.MedicationForm.NonMandatoryMsgTooltip, value));
                        if (!bInformationIconAlreadyAddedWhileCV)
                            InformationIcon.Children.Add(this.GetLinkImage("Conflicts", MedImage.GetPath(MedImages.MandatoryIndicator), Resource.prescribedrugs.BubbleConflicts_Tooltip, value));
                    }
                    else if (oVM.TrafficSymbol as ConflictIcons  == ConflictIcons.Question && (String.Compare(_prescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) != 0)) {
                        InformationIcon.Children.Add(this.GetLinkImage("Question", MedImage.GetPath(MedImages.WhiteQuestionMark), Resource.MedicationForm.NonMandatoryMsgTooltip, value));
                        if (!bInformationIconAlreadyAddedWhileCV)
                            InformationIcon.Children.Add(this.GetLinkImage("Conflicts", MedImage.GetPath(MedImages.MandatoryIndicator), Resource.prescribedrugs.BubbleConflicts_Tooltip, value));
                    }
                    else if (oVM.TrafficSymbol as ConflictIcons == ConflictIcons.MandatoryIndicator && (String.Compare(_prescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) != 0)) {
                        if (!bInformationIconAlreadyAddedWhileCV)
                            InformationIcon.Children.Add(this.GetLinkImage("Conflicts", MedImage.GetPath(MedImages.MandatoryIndicator), Resource.prescribedrugs.BubbleConflicts_Tooltip, value));
                    }
                }
            }
        }
        return InformationIcon;
    }
    private GetImage(sName: string, sPath: string, sToolTip: string): Image {
        let infoIcon: Image = new Image();
        infoIcon.HorizontalAlignment = HorizontalAlignment.Center;
        infoIcon.VerticalAlignment = VerticalAlignment.Center;
        infoIcon.Name = sName;
        infoIcon.Margin = new Thickness(2);
        infoIcon.Source = new BitmapImage(new Uri(sPath, UriKind.Relative));
        if (!String.IsNullOrEmpty(sToolTip))
            ToolTipService.SetToolTip(infoIcon, sToolTip);
        return infoIcon;
    }
    private GetLinkImage(sName: string, sPath: string, sToolTip: string, value: Object): Image {
        let infoIcon: Image = ObjectHelper.CreateObject(new Image(), {
            Stretch: Stretch.None,
            Cursor: Cursors.Hand,
            Name: sName,
            HorizontalAlignment: HorizontalAlignment.Center,
            VerticalAlignment: VerticalAlignment.Center,
            Margin: new Thickness(2),
            Source : new BitmapImage(new Uri(sPath, UriKind.Relative)),
            DataContext: value
        });
        if (!String.IsNullOrEmpty(sToolTip))
            ToolTipService.SetToolTip(infoIcon, sToolTip);
        let oVM: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(value, PrescriptionItemVM);
        if (oVM != null) {
            if (String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase)) {
                oVM.SubscribeConflictIconEventForPrescNote(infoIcon);
            }
            else {
                oVM.SubscribeConflictIconClickEvent(infoIcon);
            }
        }
        return infoIcon;
    }
    private GetImageWithScrollBar(sName: string, sPath: string, sToolTip: string): Image {
        let infoIcon: Image = new Image();
        infoIcon.HorizontalAlignment = HorizontalAlignment.Center;
        infoIcon.VerticalAlignment = VerticalAlignment.Center;
        infoIcon.Name = sName;
        infoIcon.Margin = new Thickness(2);
        infoIcon.Source = new BitmapImage(new Uri(sPath, UriKind.Relative))
        if (!String.IsNullOrEmpty(sToolTip))
            ToolTipService.SetToolTip(infoIcon, ObjectHelper.CreateObject(new iLabel(), { Text: sToolTip, IsWordwrap: true, Width: 200 }));
        return infoIcon;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class DisplayPrescriptionLineItem {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            let cntControl: iLabel = new iLabel();
            if (value instanceof PrescriptionItemVM) {
                let colWidth: number = Number.NaN;
                let oVM: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(value, PrescriptionItemVM);
                if (!(oVM.IsGroupHeader || oVM.OsInstance != null && oVM.OsInstance.OsIsGroupHeader)) {
                    let tbTextBlock: TextBlock = null;
                    let medlineText : string = String.Empty;
                    cntControl = LineDisplayHelper.GetPrescriptionItem(Common.GetPrescriptionLineItemVM(oVM), colWidth, parameter.ToString(),(tbTextBlockVal) => {tbTextBlock = tbTextBlockVal}, oVM.IsGPConnectItem);
                    if(tbTextBlock != null && tbTextBlock.InlinesElements != null && tbTextBlock.InlinesElements.Count() > 0)
                    {
                        tbTextBlock.InlinesElements.forEach(item => {
                            if(item && item!= null && item.Text && !String.IsNullOrEmpty(item.Text))
                                medlineText = medlineText + item.Text;
                        });

                        tbTextBlock.Text = medlineText;                        
                    }                                        
                    if (oVM.FormViewerDetails != null && oVM.FormViewerDetails.BasicDetails != null && oVM.FormViewerDetails.BasicDetails.InfusionDetails != null && oVM.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo > 0 && oVM.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo > 0 && !oVM.FormViewerDetails.BasicDetails.InfusionDetails.IsLastItem && !String.Equals(oVM.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oVM.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase) && (!String.Equals(oVM.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) || (String.Equals(parameter, "400") && String.Equals(oVM.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)))) {
                        let sRun: TextBlock = new TextBlock();
                        sRun.FontFamily = new FontFamily("Verdana");
                        sRun.Foreground = new SolidColorBrush(Colors.Black);
                        sRun.Text = " " + Resource.Infusion.InfSeqLineDsply_Txt;
                        sRun.FontStyle = FontStyles.Normal;
                        cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: sRun }));
                    }
                    else if (oVM.FormViewerDetails != null && oVM.FormViewerDetails.BasicDetails != null && oVM.FormViewerDetails.BasicDetails.InfusionDetails != null && oVM.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo > 0 && oVM.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo == 1 && !CommonFlags.IsTechnicallyValidate && oVM.ParentbaseVM != null && oVM.ParentbaseVM.MedsResolve != null && oVM.ParentbaseVM.MedsResolve.Count > 0) {
                        let MaxItemsequence: number = -1;
                        MaxItemsequence = oVM.ParentbaseVM.MedsResolve.Where(c => c.FormViewerDetails.BasicDetails.InfusionDetails != null && c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo == oVM.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo).Max(s => s.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo);
                        if (MaxItemsequence == 1) {
                            let sRun: TextBlock = new TextBlock();
                            sRun.FontFamily = new FontFamily("Verdana");
                            sRun.Foreground = new SolidColorBrush(Colors.Black);
                            sRun.Text = " " + Resource.Infusion.InfSeqLineDsply_Txt;
                            sRun.FontStyle = FontStyles.Normal;
                            cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: sRun }));
                        }
                    }
                    if (oVM.FormViewerDetails != null && oVM.FormViewerDetails.BasicDetails != null && oVM.FormViewerDetails.BasicDetails.SequenceInfo != null && oVM.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0 && oVM.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo > 0 && !oVM.FormViewerDetails.BasicDetails.SequenceInfo.IsLastItem && !CommonFlags.IsTechnicallyValidate && !String.Equals(oVM.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oVM.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase) && (!String.Equals(oVM.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) || (String.Equals(parameter, "400") && String.Equals(oVM.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)))) {
                        let sRun: TextBlock = new TextBlock();
                        sRun.FontFamily = new FontFamily("Verdana");
                        sRun.Foreground = new SolidColorBrush(Colors.Black);
                        sRun.Text = " " + Resource.Infusion.InfSeqLineDsply_Txt;
                        sRun.FontStyle = FontStyles.Normal;
                        cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: sRun }));
                    }
                    else if (oVM.FormViewerDetails != null && oVM.FormViewerDetails.BasicDetails != null && oVM.FormViewerDetails.BasicDetails.SequenceInfo != null && oVM.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0 && oVM.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo == 1 && !CommonFlags.IsTechnicallyValidate && oVM.ParentbaseVM != null && oVM.ParentbaseVM.MedsResolve != null && oVM.ParentbaseVM.MedsResolve.Count > 0) {
                        let MaxItemsequence: number = -1;
                        MaxItemsequence = oVM.ParentbaseVM.MedsResolve.Where(c => c.FormViewerDetails.BasicDetails.SequenceInfo != null && c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo == oVM.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo).Max(s => s.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo);
                        if (MaxItemsequence == 1) {
                            let sRun: TextBlock = new TextBlock();
                            sRun.FontFamily = new FontFamily("Verdana");
                            sRun.Foreground = new SolidColorBrush(Colors.Black);
                            sRun.Text = " " + Resource.Infusion.InfSeqLineDsply_Txt;
                            sRun.FontStyle = FontStyles.Normal;
                            cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: sRun }));
                        }
                    }
                    if (tbTextBlock != null && !String.IsNullOrEmpty(tbTextBlock.Text)) {
                        oVM.MedLineDisplayText = tbTextBlock.Text;
                    }
                    if (parameter != null && Convert.ToString(parameter).Equals("ORDERSETMEZZANINE", StringComparison.OrdinalIgnoreCase)) {
                        if (oVM.OsInstance != null && oVM.OsInstance.OsSeqGroupNo != 0 && !oVM.OsInstance.OsIsLastItem) {
                            let sRun: TextBlock = new TextBlock();
                            sRun.FontFamily = new FontFamily("Verdana");
                            sRun.Foreground = new SolidColorBrush(Colors.Black);
                            sRun.Text = " " + Resource.Infusion.InfSeqLineDsply_Txt;
                            sRun.FontStyle = FontStyles.Normal;
                            cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: sRun }));
                        }
                    }
                    if (tbTextBlock) tbTextBlock.Text = null;
                }
                else {
                    if (oVM != null && oVM.FormViewerDetails != null && oVM.FormViewerDetails.BasicDetails != null && oVM.FormViewerDetails.BasicDetails.InfusionDetails != null && oVM.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo > 0) {
                        cntControl.Text = String.Format(Resource.Infusion.ExsitingSequenceNo, oVM.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo);
                        cntControl.FontWeight = FontWeights.Bold;
                        cntControl.FontSize = 12;
                        cntControl.IsWordwrap = true;
                        cntControl.Foreground = new SolidColorBrush(Colors.Black);
                    }
                    else if (oVM != null && oVM.OsInstance != null && oVM.OsInstance.OsIsGroupHeader) {
                        cntControl.Text = oVM.OsInstance.OsGroupHeaderName;
                        cntControl.FontWeight = FontWeights.Bold;
                        cntControl.FontSize = 12;
                        cntControl.IsWordwrap = true;
                        cntControl.Foreground = new SolidColorBrush(Colors.Black);
                    }
                    else {
                        cntControl.Text = oVM.PrescriptionItem;
                        cntControl.FontWeight = FontWeights.Bold;
                        cntControl.FontSize = 12;
                        cntControl.IsWordwrap = true;
                        cntControl.Foreground = new SolidColorBrush(Colors.Black);
                    }
                }
            }
            else if (value instanceof CommPrescriptionItemViewVM) {
                let oVM: CommPrescriptionItemViewVM = ObjectHelper.CreateType<CommPrescriptionItemViewVM>(value, CommPrescriptionItemViewVM);
                let colWidth: number = Number.NaN;
                let tbToolTip: TextBlock = null;
                cntControl = LineDisplayHelper.GetPrescriptionItem(MedicationCommonBB.GetPrescriptionLineItemVMSeqMez(ObjectHelper.CreateType<CommPrescriptionItemViewVM>(value, CommPrescriptionItemViewVM)), colWidth, parameter.ToString(), (tbTextBlockVal) => { tbToolTip = tbTextBlockVal });
                if (oVM != null && oVM.GroupSequenceNo > 0 && oVM.ItemSequenceNo > 0 && !oVM.IsLastItem && !String.Equals(oVM.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oVM.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase)) {
                    let sRun: TextBlock = new TextBlock();
                    sRun.FontFamily = new FontFamily("Verdana");
                    sRun.Foreground = new SolidColorBrush(Colors.Black);
                    sRun.Text = " " + "AND THEN";
                    sRun.FontStyle = FontStyles.Normal;
                    cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: sRun }));
                }
                else if (oVM != null && oVM.GroupSequenceNo > 0 && oVM.ItemSequenceNo == 1 && oVM.MedsResolve != undefined && oVM.MedsResolve.Count > 0) {
                    let MaxItemsequence: number = -1;
                    MaxItemsequence = oVM.MedsResolve.Where(c => c.GroupSequenceNo == oVM.GroupSequenceNo).Max(s => s.ItemSequenceNo);
                    if (MaxItemsequence == 1) {
                        let sRun: TextBlock = new TextBlock();
                        sRun.FontFamily = new FontFamily("Verdana");
                        sRun.Foreground = new SolidColorBrush(Colors.Black);
                        sRun.Text = " " + "AND THEN";
                        sRun.FontStyle = FontStyles.Normal;
                        cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: sRun }));
                    }
                }
            }
            return cntControl;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture:CultureInfo): Object {
            return value;
        }
}
export class DisplayOtherInformationLineItem {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let cntControl: iLabel = new iLabel();
        if (value instanceof PrescriptionItemVM) {
            console.log(value);
            let colWidth: number = Number.NaN;
            cntControl = LineDisplayHelper.GetOtherInformation(Common.GetPrescriptionLineItemVM(ObjectHelper.CreateType<PrescriptionItemVM>(value, PrescriptionItemVM)), colWidth);
        }
        else if (value instanceof CommPrescriptionItemViewVM) {
            let colWidth: number = Number.NaN;
            cntControl = LineDisplayHelper.GetOtherInformation(MedicationCommonBB.GetPrescriptionLineItemVMSeqMez(ObjectHelper.CreateType<CommPrescriptionItemViewVM>(value, CommPrescriptionItemViewVM)), colWidth)
        }
        return cntControl;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class GPConnectLineItemDisplay {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let cntControl: iLabel = new iLabel();
        cntControl.IsWordwrap = true;
        if (value instanceof GPConnectItemVM) {
            let mainBlock: TextBlock = new TextBlock();
            mainBlock.TextWrapping = TextWrapping.Wrap;
            let fntVerdana: FontFamily = new FontFamily("Verdana");
            let blackBrush: SolidColorBrush = new SolidColorBrush(Colors.Black);
            let redBrush: SolidColorBrush = new SolidColorBrush(Colors.Red);
            let tbToolTip: TextBlock = new TextBlock();
            tbToolTip.TextWrapping = TextWrapping.Wrap;
            tbToolTip.MaxWidth = 300;
            let oVM: GPConnectItemVM = ObjectHelper.CreateType<GPConnectItemVM>(value, GPConnectItemVM);
            if (!String.IsNullOrEmpty(oVM.StatusDisplay) && oVM.StatusDisplay != GPcStatus.Active && !oVM.CanHideStatus) {
                mainBlock.Inlines.Add(ObjectHelper.CreateObject(new Run(), { FontFamily: fntVerdana, Text: "[" + oVM.StatusDisplay + "] ", FontWeight: FontWeights.Bold, FontStyle: FontStyles.Italic, Foreground: redBrush }));
                tbToolTip.Inlines.Add(ObjectHelper.CreateObject(new Run(), { FontFamily: fntVerdana, Text: "[" + oVM.StatusDisplay + "] ", FontWeight: FontWeights.Bold, FontStyle: FontStyles.Italic, Foreground: redBrush }));
            }
            {
                mainBlock.Inlines.Add(ObjectHelper.CreateObject(new Run(), { FontFamily: fntVerdana, Text: oVM.MedicationItemDetail, FontWeight: FontWeights.Bold, Foreground: blackBrush }));
                tbToolTip.Inlines.Add(ObjectHelper.CreateObject(new Run(), { FontFamily: fntVerdana, Text: oVM.MedicationItemDetail, FontWeight: FontWeights.Bold, Foreground: blackBrush }));
            }
            if (oVM.Dosage != null && oVM.Dosage.Length > 0) {
                let dosage: string = String.Empty, instruction = String.Empty;
                if (!String.IsNullOrEmpty(oVM.Dosage[0].Text)) {
                    dosage = oVM.Dosage[0].Text;
                }
                if (!String.IsNullOrEmpty(oVM.Dosage[0].Instruction)) {
                    instruction = oVM.Dosage[0].Instruction;
                }
                let txtBoxText: string = (!String.IsNullOrEmpty(dosage) ? " - " + Resource.Medlistdetails.GpConnectDoseLabel + " " + dosage : String.Empty) + (!String.IsNullOrEmpty(instruction) ? " - " + instruction : String.Empty);
                mainBlock.Inlines.Add(ObjectHelper.CreateObject(new Run(), { FontFamily: fntVerdana, Text: txtBoxText, Foreground: blackBrush }));
                tbToolTip.Inlines.Add(ObjectHelper.CreateObject(new Run(), { FontFamily: fntVerdana, Text: txtBoxText, Foreground: blackBrush }));
            }
            mainBlock.SetValue(ToolTipService.ToolTipProperty, tbToolTip);
            return mainBlock;
        }
        return null;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}

export class DisplayAcknowledgeStatus  {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let img: Image = new Image();
        
        img.Stretch = Stretch.None;
        img.HorizontalAlignment = HorizontalAlignment.Center;
        if (value != null) {
            if (ObjectHelper.CreateType<string>(value['AcknowledgeStatus'], "string") == "1") {
                img.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CheckedReadCheckIcon), UriKind.RelativeOrAbsolute));
                // ToolTipService.SetToolTip(img, Resource.prescribedrugs.Checkreadonlycheck_Tooltip);
            }
            else {
                img.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CheckedReadUnCheckIcon), UriKind.RelativeOrAbsolute));
                // ToolTipService.SetToolTip(img, Resource.prescribedrugs.CheckreadonlyUncheck_Tooltip);
            }
        }
        return img;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class FormatConflicts {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let sWarningMsg: string = String.Empty;
        let dMaxWidth: number;
        if (!(parameter != null && Number.TryParse(parameter.ToString(), (dMaxWidth) => {dMaxWidth=dMaxWidth})))
            dMaxWidth = Number.NaN;
        let oVM: ConflictsVM = ObjectHelper.CreateType<ConflictsVM>(value, ConflictsVM);
        return this.ConflictsFormatting(oVM.WarningMessage, oVM, dMaxWidth);
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
    public ConflictsFormatting(sWarningMsg: string, oVM: ConflictsVM, dMaxWidth: number): Object {
        let sWarnMsg: string[];
        if(sWarningMsg){
            sWarnMsg= sWarningMsg.Split('~');
       }
    
        let para: Paragraph = new Paragraph();
        para.Inlines.Add(sWarnMsg[0]);
        if (sWarnMsg.length > 1) {
            let inLineCont: InlineUIContainer = new InlineUIContainer();
            let tbLink: TextBlock = ObjectHelper.CreateObject(new TextBlock(), {
                Text: sWarnMsg[1],
                FontWeight: FontWeights.Bold,
                Foreground: new SolidColorBrush(Colors.Blue),
                Width: 70,
                TextDecorations: TextDecorations.Underline,
                Cursor: Cursors.Hand,
                InlineBlock:true
            });
            oVM.SubscribeMonographClickEvent(tbLink);
            inLineCont.Child = tbLink;
            para.Inlines.Add(inLineCont);
            if (sWarnMsg.length > 2)
                para.Inlines.Add(sWarnMsg[2]);
        }
        let rtb: RichTextBox = ObjectHelper.CreateObject(new RichTextBox(), {
            BorderBrush: null,
            IsReadOnly: true,
            Background: new SolidColorBrush(Colors.Transparent),
            BorderThickness: new Thickness(0),
            AcceptsReturn: false,
            IsEnabled: true,
            Margin: new Thickness(2),
            TextWrapping: TextWrapping.Wrap
        });
        if (!Number.isNaN(dMaxWidth))
            rtb.MaxWidth = dMaxWidth;
        rtb.Selection.Insert(para);
        ToolTipService.SetToolTip(rtb, para);
        return rtb;
    }
}
export class ShowStarImages {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let sWarningType: string = String.Empty;
        let oVM: ConflictsVM = ObjectHelper.CreateType<ConflictsVM>(value, ConflictsVM);
        sWarningType = oVM.WarningType;
        let sWarSubType: string = String.Empty;
        let rtb: RichTextBox = ObjectHelper.CreateObject(new RichTextBox(), {
            BorderBrush: null,
            IsReadOnly: true,
            Background: new SolidColorBrush(Colors.Transparent),
            BorderThickness: new Thickness(0),
            AcceptsReturn: false
        });
        let sWarnData: string[] = sWarningType.Split('-');
        rtb.Margin = new Thickness(2);
        let para: Paragraph = new Paragraph();
        para.Inlines.Add(sWarnData[0]);
        if (String.Equals(sWarnData[0].Trim(), "Warning") && !String.IsNullOrEmpty(oVM.WarningSubType) && !String.Equals(oVM.WarningSubType, CConstants.sAbsolute) && !String.Equals(oVM.WarningSubType, CConstants.sGeneric)) {
            let sWarSubTypes: string[] = !String.IsNullOrEmpty(oVM.WarningSubType) ? oVM.WarningSubType.Split(',') : null;
            if (sWarSubTypes != null && sWarSubTypes.length > 0) {
                para.Inlines.Add(" - ");
                for (let i: number = 0; i < sWarSubTypes.length; i++) {
                    if (!String.IsNullOrEmpty(sWarSubTypes[i])) {
                        sWarSubType = CommonBB.GetText(sWarSubTypes[i], WarningConceptCode.WarningCategoriesData);
                        if (i == 0) {
                            para.Inlines.Add(sWarSubType);
                        }
                        else {
                            para.Inlines.Add(",");
                            para.Inlines.Add(sWarSubType);
                        }
                    }
                }
            }
        }
        let inLineCont: InlineUIContainer = new InlineUIContainer();
        if (sWarnData.length > 1 && !String.Equals(sWarnData[0], "Warning ") && sWarnData[1] != null) {
            para.Inlines.Add(" - " + sWarningType.Substring(sWarningType.IndexOf('-') + 1));
            console.log(sWarnData)
            switch (sWarnData[1].Trim().ToUpper()) {
                case "LOW":
                    para.Inlines.Add(ObjectHelper.CreateObject(new InlineUIContainer(), { Child: this.GetImage() }));
                    break;
                case "MODERATE":
                    para.Inlines.Add(ObjectHelper.CreateObject(new InlineUIContainer(), { Child: this.GetImage() }));
                    para.Inlines.Add(" ");
                    para.Inlines.Add(ObjectHelper.CreateObject(new InlineUIContainer(), { Child: this.GetImage() }));
                    break;
                case "SIGNIFICANT":
                    para.Inlines.Add(ObjectHelper.CreateObject(new InlineUIContainer(), { Child: this.GetImage() }));
                    para.Inlines.Add(" ");
                    para.Inlines.Add(ObjectHelper.CreateObject(new InlineUIContainer(), { Child: this.GetImage() }));
                    para.Inlines.Add(" ");
                    para.Inlines.Add(ObjectHelper.CreateObject(new InlineUIContainer(), { Child: this.GetImage() }));
                    break;
                case "HIGH":
                    para.Inlines.Add(ObjectHelper.CreateObject(new InlineUIContainer(), { Child: this.GetImage() }));
                    para.Inlines.Add(" ");
                    para.Inlines.Add(ObjectHelper.CreateObject(new InlineUIContainer(), { Child: this.GetImage() }));
                    para.Inlines.Add(" ");
                    para.Inlines.Add(ObjectHelper.CreateObject(new InlineUIContainer(), { Child: this.GetImage() }));
                    para.Inlines.Add(" ");
                    para.Inlines.Add(ObjectHelper.CreateObject(new InlineUIContainer(), { Child: this.GetImage() }));
                    break;
            }
        }
        rtb.Selection.Insert(para);
        ToolTipService.SetToolTip(rtb, para);
        return rtb;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        throw new NotImplementedException();
    }
    private GetImage(): Image {
        let img1: Image = new Image();
        img1.Stretch = Stretch.None;
        img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.Star), UriKind.RelativeOrAbsolute));
        return img1;
    }
}
export class FormViewerImage {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let imgFormView: Image = ObjectHelper.CreateObject(new Image(), {
            Stretch: Stretch.None,
            Cursor: Cursors.Hand,
            Source: new BitmapImage(new Uri("./assets/Images/gridimage.png", UriKind.RelativeOrAbsolute))
        });
        ToolTipService.SetToolTip(imgFormView, "Select to view/Amend medication item details");
        let oVM: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(value, PrescriptionItemVM);
        if (oVM != null) {
            oVM.SubscribeFormViewerIconClickEvent(imgFormView);
        }
        return imgFormView;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class MCconflicticon {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let InformationIcon: StackPanel = new StackPanel();
        let oVM: IPPMCPresctiptionItem = ObjectHelper.CreateType<IPPMCPresctiptionItem>(value, IPPMCPresctiptionItem);
        if (oVM != null) {
            if (oVM.SealImage == "1") {
                InformationIcon.Children.Add(this.GetLinkImage("Red", MedImage.GetPath(MedImages.RedStar), Resource.MedicationForm.MandatoryMsgTooltip, value));
                InformationIcon.Children.Add(this.GetLinkImage("Bubble", MedImage.GetPath(MedImages.MandatoryIndicator),Resource.prescribedrugs.BubbleConflicts_Tooltip, value));
            }
            else if (oVM.SealImage == "0") {
                InformationIcon.Children.Add(this.GetLinkImage("Amber", MedImage.GetPath(MedImages.Amber), Resource.MedicationForm.NonMandatoryMsgTooltip, value));
                InformationIcon.Children.Add(this.GetLinkImage("Bubble", MedImage.GetPath(MedImages.MandatoryIndicator),Resource.prescribedrugs.BubbleConflicts_Tooltip, value));
            }
            else if (oVM.SealImage == "3") {
                InformationIcon.Children.Add(this.GetLinkImage("Question", MedImage.GetPath(MedImages.WhiteQuestionMark), Resource.MedicationForm.NonMandatoryMsgTooltip, value));
                InformationIcon.Children.Add(this.GetLinkImage("Bubble", MedImage.GetPath(MedImages.MandatoryIndicator), Resource.prescribedrugs.BubbleConflicts_Tooltip, value));
            }
            else if (oVM.SealImage == "2") {                
                InformationIcon.Children.Add(this.GetLinkImage("Bubble", MedImage.GetPath(MedImages.MandatoryIndicator), Resource.prescribedrugs.BubbleConflicts_Tooltip, value));
            }
        }
        return InformationIcon;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
    private GetLinkImage(sName: string, sPath: string, sToolTip: string, value: Object): Image {
        let infoIcon: Image = ObjectHelper.CreateObject(new Image(), {
            Stretch: Stretch.None,
            Cursor: Cursors.Hand,
            Name: sName,
            HorizontalAlignment: HorizontalAlignment.Center,
            VerticalAlignment: VerticalAlignment.Center,
            Margin: new Thickness(2),
            Source: new BitmapImage(new Uri(sPath, UriKind.Relative))
        });
        if (!String.IsNullOrEmpty(sToolTip))
            ToolTipService.SetToolTip(infoIcon, sToolTip);
        let oVM: IPPMCPresctiptionItem = ObjectHelper.CreateType<IPPMCPresctiptionItem>(value, IPPMCPresctiptionItem);
        return infoIcon;
    }
}
export class GpConnectWarningDisplay {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let vm: IPPMABaseVM = ObjectHelper.CreateType<IPPMABaseVM>(value, IPPMABaseVM);
        let grid: Grid = ObjectHelper.CreateObject(new Grid(), { Background: new SolidColorBrush(Color.FromArgb(255, 247, 234, 206)), Margin: new Thickness(0) });
        let txtBox: TextBlock = new TextBlock();
        txtBox.FontFamily = new FontFamily("Verdana");
        txtBox.Foreground = new SolidColorBrush(Colors.Brown);
        txtBox.FontStyle = FontStyles.Normal;
        txtBox.FontWeight = FontWeights.Normal;
        txtBox.TextWrapping = TextWrapping.Wrap;
        txtBox.TextAlignment = TextAlignment.Left;
        if (!String.IsNullOrEmpty(vm.GPConnectWarningText)) {
            txtBox.Inlines.Add(ObjectHelper.CreateObject(new Run(), { Text: vm.GPConnectWarningText }));
        }
        grid.Children.Add(txtBox);
        return grid;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}

export class TestDisplay {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let vm: IPPMABaseVM = ObjectHelper.CreateType<IPPMABaseVM>(value, IPPMABaseVM);
        let layout: Grid = ObjectHelper.CreateObject(new Grid(), { Background: new SolidColorBrush(Color.FromArgb(255, 247, 234, 206)), Margin: new Thickness(0) });
        let oColumnDefinition = new ColumnDefinition();
        oColumnDefinition.Width = GridLength.Auto;
        layout.ColumnDefinitions.Add(oColumnDefinition);
        let oColumnDefinition1 = new ColumnDefinition();
        oColumnDefinition1.Width = GridLength.Auto;
        layout.ColumnDefinitions.Add(oColumnDefinition1);

        layout.RowDefinitions.Add(new RowDefinition());
        return layout;
    }
}
export module StartDTTMDisplay {
    export enum EnumVals {
        CC_EXPJAN = 1,
        CC_EXPFEB = 2,
        CC_EXPMAR = 3,
        CC_EXPAPR = 4,
        CC_EXPMAY = 5,
        CC_EXPJUNE = 6,
        CC_EXPJULY = 7,
        CC_EXPAUG = 8,
        CC_EXPSEP = 9,
        CC_EXPOCT = 10,
        CC_EXPNOV = 11,
        CC_EXPDEC = 12
    }
}

export class FormviewerDisplayHelper {
    private static GetImage(sImagePath: string, sImageToolTip: string): Image {
        ObjectHelper.CreateObject(new Image(), { Margin: new Thickness(0, 0, 1, 0) });
        let img1: Image = ObjectHelper.CreateObject(new Image(), { Margin: new Thickness(0, 0, 1, 0), VerticalAlignment: VerticalAlignment.Bottom });
        img1.Stretch = Stretch.None;
        img1.Source = new BitmapImage(new Uri(sImagePath, UriKind.RelativeOrAbsolute));
        ToolTipService.SetToolTip(img1, ObjectHelper.CreateObject(new iLabel(), { MaxWidth: 300, IsWordwrap: true, Text: sImageToolTip }));
        return img1;
    }
    public static GetDrugProperties(DrugProperties: ObservableCollection<DrugProperty>, IdentType: string, stpImages: StackPanel, ItemSubType: string): void {
        let DistinctDrugprop = DrugProperties.GroupBy(x => x.DrugPropertyCode).Select((a, i, y) => y).First();
        for(let i:number = 0; i<DistinctDrugprop.Count();i++){
           let drugProp: DrugProperty = DistinctDrugprop[i]; 
            if (!(drugProp[0] instanceof DrugProperty))
                continue;
            let sImagePath: string = String.Empty;
            let sImageToolTip: string = String.Empty;
            let img1: Image = ObjectHelper.CreateObject(new Image(), { Margin: new Thickness(2) });
            img1.Stretch = Stretch.None;
            switch (drugProp[0].DrugPropertyCode) {
                case "CC_HIGHRISK":
                    if (!String.IsNullOrEmpty(ItemSubType) && String.Equals(ItemSubType, CConstants.SUBTYPE)) {
                        sImagePath = MedImage.GetPath(MedImages.CC_HIGHRISK);
                        sImageToolTip = Resource.prescribedrugs.CC_HIGHRISKif_Tooltip;
                    }
                    else {
                        let sHighRiskMsg: string = drugProp[0].HighRiskMsg;
                        if ((String.Compare(IdentType, "CATALOGUEITEM", StringComparison.OrdinalIgnoreCase) == 0 || String.Equals(IdentType, CConstants.ACTUALMOIETY, StringComparison.InvariantCultureIgnoreCase))) {
                            sHighRiskMsg = !String.IsNullOrEmpty(sHighRiskMsg) ? (" - " + sHighRiskMsg + " - ") : " - ";
                            if (String.Compare(drugProp[0].VMChildCode, "CC_OCCRALLCHILD", StringComparison.OrdinalIgnoreCase) == 0) {
                                sImagePath = MedImage.GetPath(MedImages.CC_HIGHRISK);
                                sImageToolTip = Resource.prescribedrugs.CC_HIGHRISKif_Tooltip + sHighRiskMsg + Resource.prescribedrugs.CC_HIGHRISKelse_Tooltip;
                            }
                            else if (String.Equals(drugProp[0].VMChildCode, CConstants.SomeChild_CC)) {
                                sImagePath = MedImage.GetPath(MedImages.CC_HIGHRISK);
                                sImageToolTip = Resource.prescribedrugs.CC_HIGHRISKif_Tooltip + sHighRiskMsg + Resource.prescribedrugs.CC_HIGHRISKSomePrd_Tooltip;
                            }
                        }
                        else {
                            sImagePath = MedImage.GetPath(MedImages.CC_HIGHRISK);
                            sImageToolTip = !String.IsNullOrEmpty(sHighRiskMsg) ? Resource.prescribedrugs.CC_HIGHRISKif_Tooltip + " - " + sHighRiskMsg : Resource.prescribedrugs.CC_HIGHRISKif_Tooltip;
                        }
                    }
                    if (!String.IsNullOrEmpty(sImagePath)) {
                        stpImages.Children.Add(FormviewerDisplayHelper.GetImage(sImagePath, sImageToolTip));
                    }
                    break;
                case "CC_UNLICENSED":
                    if (((String.Compare(IdentType, "CATALOGUEITEM", StringComparison.OrdinalIgnoreCase) == 0) || String.Equals(IdentType, CConstants.ACTUALMOIETY, StringComparison.InvariantCultureIgnoreCase))) {
                        if (String.Compare(drugProp[0].VMChildCode, "CC_OCCRALLCHILD", StringComparison.OrdinalIgnoreCase) == 0) {
                            sImagePath = MedImage.GetPath(MedImages.CC_UNLICENSED);
                            sImageToolTip = Resource.prescribedrugs.CC_UNLICENSEDif_Tooltip;
                        }
                    }
                    else {
                        sImagePath = MedImage.GetPath(MedImages.CC_UNLICENSED);
                        sImageToolTip = Resource.prescribedrugs.CC_UNLICENSEDelse_Tooltip;
                    }
                    if (!String.IsNullOrEmpty(sImagePath)) {
                        stpImages.Children.Add(FormviewerDisplayHelper.GetImage(sImagePath, sImageToolTip));
                    }
                    break;
                case "CC_NAMEDRUG":
                    if (String.Compare(IdentType, "CATALOGUEITEM", StringComparison.OrdinalIgnoreCase) == 0 || String.Equals(IdentType, CConstants.ACTUALMOIETY, StringComparison.InvariantCultureIgnoreCase)) {
                        if (String.Compare(drugProp[0].VMChildCode, "CC_OCCRALLCHILD", StringComparison.OrdinalIgnoreCase) == 0) {
                            sImagePath = MedImage.GetPath(MedImages.CC_NAMEDRUG);
                            sImageToolTip = Resource.prescribedrugs.CC_NAMEDRUGif_Tooltip;
                        }
                    }
                    else {
                        sImagePath = MedImage.GetPath(MedImages.CC_NAMEDRUG);
                        sImageToolTip = Resource.prescribedrugs.CC_NAMEDRUGelse_Tooltip;
                    }
                    if (!String.IsNullOrEmpty(sImagePath)) {
                        stpImages.Children.Add(FormviewerDisplayHelper.GetImage(sImagePath, sImageToolTip));
                    }
                    break;
                case "CC_CNTRLDDRUG":
                    if (String.Compare(IdentType, "CATALOGUEITEM", StringComparison.OrdinalIgnoreCase) == 0 || String.Equals(IdentType, CConstants.ACTUALMOIETY, StringComparison.InvariantCultureIgnoreCase)) {
                        if (String.Compare(drugProp[0].VMChildCode, "CC_OCCRALLCHILD", StringComparison.OrdinalIgnoreCase) == 0) {
                            sImagePath = MedImage.GetPath(MedImages.CC_CNTRLDDRUG);
                            sImageToolTip = Resource.prescribedrugs.CC_CNTRLDDRUGif_Tooltip;
                        }
                    }
                    else {
                        sImagePath = MedImage.GetPath(MedImages.CC_CNTRLDDRUG);
                        sImageToolTip = Resource.prescribedrugs.CC_CNTRLDDRUGelse_Tooltip;
                    }
                    if (!String.IsNullOrEmpty(sImagePath)) {
                        stpImages.Children.Add(FormviewerDisplayHelper.GetImage(sImagePath, sImageToolTip));
                    }
                    break;
                case "CC_NEWLY":
                    if (String.Compare(IdentType, "CATALOGUEITEM", StringComparison.OrdinalIgnoreCase) == 0 || String.Equals(IdentType, CConstants.ACTUALMOIETY, StringComparison.InvariantCultureIgnoreCase)) {
                        if (String.Compare(drugProp[0].VMChildCode, "CC_OCCRALLCHILD", StringComparison.OrdinalIgnoreCase) == 0) {
                            sImagePath = MedImage.GetPath(MedImages.CC_NEWLY);
                            sImageToolTip = Resource.prescribedrugs.CC_NEWLYif_Tooltip;
                        }
                    }
                    else {
                        sImagePath = MedImage.GetPath(MedImages.CC_NEWLY);
                        sImageToolTip = Resource.prescribedrugs.CC_NEWLYelse_Tooltip;
                    }
                    if (!String.IsNullOrEmpty(sImagePath)) {
                        stpImages.Children.Add(FormviewerDisplayHelper.GetImage(sImagePath, sImageToolTip));
                    }
                    break;
            }
        }
    }
}
export class RemoveDoseUOM  {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let oVM: ScheduleDetailsCols = ObjectHelper.CreateType<ScheduleDetailsCols>(value, ScheduleDetailsCols);
        let idx: number = Convert.ToInt32(parameter.ToString());
        if (oVM != null && idx < oVM.ScheduleDoseValue.Count()) {
            if (oVM.ScheduleDoseValue[idx] == String.Empty && !oVM.Scheduledoseflag[idx]) {
                return String.Empty;
            }
            else {
                return " " + oVM.ScheduleDoseUOM.Trim();
            }
        }
        return String.Empty;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}

export class PrescribingNote {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let cntControl: iLabel = new iLabel();
        if (value != null) {
            let prescribingNote: string = value.ToString().replace(/[\r]/gm, '');
            if (prescribingNote.Contains("\n")) {
                let PresNoteValue: string[] = prescribingNote.Split('\n');
                let PresNoteColln: List<string> = new List<string>();
                if (PresNoteValue.length > 0) {
                    for (let i: number = 0; i < PresNoteValue.length; i++) {
                        if (PresNoteValue[i].trim() != "") {		
                            PresNoteColln.Add(PresNoteValue[i]);
                        }
                    }
                }
                cntControl.Text = PresNoteColln[0] + "...";
            }
            else {
                cntControl.Text = prescribingNote;
            }
        }
        return cntControl.Text;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}

export class GPConnectPresItemDetail  {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let vm: GPConnectItemVM = null;
        if (value instanceof GPConnectItemVM) {
            vm = ObjectHelper.CreateType<GPConnectItemVM>(value, GPConnectItemVM);
        }
        //Revisit Required
        else if (value instanceof ClinicallyVerifyVM) {
            let cmvm: ClinicallyVerifyVM = ObjectHelper.CreateType<ClinicallyVerifyVM>(value, ClinicallyVerifyVM);
            if (cmvm != null && cmvm.GpConnectMedicationItem != null) {
                vm = cmvm.GpConnectMedicationItem;
            }
        }
        else if (value instanceof MedicationPrescribeVM) {
            let mpvm: MedicationPrescribeVM = ObjectHelper.CreateType<MedicationPrescribeVM>(value, MedicationPrescribeVM);
            if (mpvm != null && mpvm.GpConnectMedicationItem != null) {
                vm = mpvm.GpConnectMedicationItem;
            }
        }
        else if (value instanceof MedAccessConstraintsVM) {
            let oMedAccessConstraintsVM: MedAccessConstraintsVM = ObjectHelper.CreateType<MedAccessConstraintsVM>(value, MedAccessConstraintsVM);
            if (oMedAccessConstraintsVM != null && oMedAccessConstraintsVM.GpConnectMedicationItem != null) {
                vm = oMedAccessConstraintsVM.GpConnectMedicationItem;
            }
        }
        else if (value instanceof RelateItem) {
            let oRelateItemVM: RelateItem = ObjectHelper.CreateType<RelateItem>(value, RelateItem);
            if (oRelateItemVM != null && oRelateItemVM.GpConnectMedicationItem != null) {
                vm = oRelateItemVM.GpConnectMedicationItem;
            }
        }
        let mainGrid: Grid = ObjectHelper.CreateObject(new Grid(), { Background: new SolidColorBrush(Color.FromArgb(255, 106, 160, 160)), Margin: vm != null && vm.MedicationItemDetail != null ? '0,0,0,10' : '0,0,0,0', Padding: vm != null && vm.MedicationItemDetail != null ? '10,10,10,10' : '0,0,0,0' });
        if (vm != null && vm.MedicationItemDetail != null) {
            let mainBlock: TextBlock = new TextBlock();
            mainBlock.TextWrapping = TextWrapping.Wrap;
            //Revisit Required
            //mainBlock.Padding = new Thickness(10, 10, 10, 10);
            let fntVerdana: FontFamily = new FontFamily("Verdana");
            let blackBrush: SolidColorBrush = new SolidColorBrush(Colors.Black);
            let redBrush: SolidColorBrush = new SolidColorBrush(Colors.Red);
            let tbToolTip: TextBlock = new TextBlock();
            tbToolTip.MaxWidth = 300;
            tbToolTip.TextWrapping = TextWrapping.Wrap;
            {
                mainBlock.Inlines.Add(ObjectHelper.CreateObject(new Run(), {
                    Text: Resource.MedicationForm.GPConnectDetails,
                    FontStyle: FontStyles.Normal,
                    FontFamily: new FontFamily("Verdana"),
                    Foreground: new SolidColorBrush(Colors.Black),
                    FontWeight: FontWeights.Bold
                }));
            }
            {
                mainBlock.Inlines.Add(ObjectHelper.CreateObject(new Run(), {
                    Text: " : ",
                    FontStyle: FontStyles.Normal,
                    FontFamily: new FontFamily("Verdana"),
                    Foreground: new SolidColorBrush(Colors.White),
                    FontWeight: FontWeights.Bold
                }));
            }
            let dosage: string = String.Empty, instruction = String.Empty;
            if (vm.Dosage != null && vm.Dosage.Length > 0 && !String.IsNullOrEmpty(vm.Dosage[0].Text)) {
                dosage = vm.Dosage[0].Text;
            }
            if (vm.Dosage != null && vm.Dosage.Length > 0 && !String.IsNullOrEmpty(vm.Dosage[0].Instruction)) {
                instruction = vm.Dosage[0].Instruction;
            }
            {
                mainBlock.Inlines.Add(ObjectHelper.CreateObject(new Run(), {
                    Text: vm.MedicationItemDetail,
                    FontStyle: FontStyles.Normal,
                    FontFamily: new FontFamily("Verdana"),
                    Foreground: new SolidColorBrush(Colors.White),
                    FontWeight: FontWeights.Bold
                }));
                tbToolTip.Inlines.Add(ObjectHelper.CreateObject(new Run(), {
                    Text: vm.MedicationItemDetail,
                    FontStyle: FontStyles.Normal,
                    FontFamily: new FontFamily("Verdana"),
                    Foreground: new SolidColorBrush(Colors.Black),
                    FontWeight: FontWeights.Bold
                }));
            }
            {
                mainBlock.Inlines.Add(ObjectHelper.CreateObject(new Run(), {
                    Text: (!String.IsNullOrEmpty(dosage) ? " - " + Resource.Medlistdetails.GpConnectDoseLabel + " " + dosage : String.Empty) + (!String.IsNullOrEmpty(instruction) ? " - " + instruction : String.Empty),
                    FontStyle: FontStyles.Normal,
                    FontFamily: new FontFamily("Verdana"),
                    Foreground: new SolidColorBrush(Colors.White),
                    FontWeight: FontWeights.Normal
                }));
                tbToolTip.Inlines.Add(ObjectHelper.CreateObject(new Run(), {
                    Text: (!String.IsNullOrEmpty(dosage) ? " - " + Resource.Medlistdetails.GpConnectDoseLabel + " " + dosage : String.Empty) + (!String.IsNullOrEmpty(instruction) ? " - " + instruction : String.Empty),
                    FontStyle: FontStyles.Normal,
                    FontFamily: new FontFamily("Verdana"),
                    Foreground: new SolidColorBrush(Colors.Black),
                    FontWeight: FontWeights.Normal
                }));
            }
            mainGrid.Children.Add(mainBlock);
            mainGrid.SetValue(ToolTipService.ToolTipProperty, tbToolTip);
        }
        return mainGrid;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}

export class TechValidateTab{
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let oVM: DrugItemBasicInfo = ObjectHelper.CreateType<DrugItemBasicInfo>(value,DrugItemBasicInfo);
        let cntControl: iLabel = new iLabel();
        cntControl.IsWordwrap = true;
        cntControl.IsParagraph = true;
        let sParameter: string = parameter as string;
        let wardIcon: Image = null;
        let Testinline: iLabelInLineElement = new iLabelInLineElement();
        if (oVM != null) {
            if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "IdentityfyingName")) {
                cntControl.IsWordwrap = true;
                let TechValIdentName: TextBlock = ObjectHelper.CreateObject(new TextBlock(), { TextWrapping: TextWrapping.Wrap, MaxWidth: 220 });
                let IdentityfyingName: TextBlock = new TextBlock();
                IdentityfyingName.Text = oVM.IdentifyingName;
                // Testinline.IswordWrap = true;
                TechValIdentName.Inlines.Add(ObjectHelper.CreateObject(new Run(), { Text: IdentityfyingName.Text }));
                cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: TechValIdentName }));
                
                // Testinline.IswordWrap = true;
                if (ProfileData.AdditionalPrescConfig != null && ProfileData.AdditionalPrescConfig.EnableWardStockConfig && oVM.IsWardStock && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.InvariantCultureIgnoreCase) && !(PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory)) {
                    wardIcon = this.GetImage("Ward", MedImage.GetPath(MedImages.WardStockIcon), "Item is stocked at this location");
                    cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: wardIcon }));
                }
                
            }
        }
        ToolTipService.SetToolTip(
            cntControl,
            ObjectHelper.CreateObject(new iLabel(), {
            Text: oVM.IdentifyingName,
            MaxWidth: 250,
            IsWordwrap: true,
        })
      );
        cntControl.InLines.Add(Testinline);
        return cntControl;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
    private GetImage(sName: string, sPath: string, sToolTip: string): Image {
        let StatusIcon: Image = new Image();
        StatusIcon.HorizontalAlignment = HorizontalAlignment.Center;
        StatusIcon.VerticalAlignment = VerticalAlignment.Stretch;
        StatusIcon.Name = sName;
        StatusIcon.Stretch = Stretch.None;
        StatusIcon.Margin = new Thickness(2);
        StatusIcon.Source = new BitmapImage(new Uri(sPath, UriKind.Relative));
        if (!String.IsNullOrEmpty(sToolTip))
            ToolTipService.SetToolTip(StatusIcon, sToolTip);
        return StatusIcon;
    }
}

export class DoseCombination {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let oVM: TechValidatedItem = ObjectHelper.CreateType<TechValidatedItem>(value,TechValidatedItem);
        let cntControl: iLabel = new iLabel();
        cntControl.IsWordwrap = true;
        cntControl.IsParagraph = true;
        let sParameter: string = parameter as string;
        let wardIcon: Image = null;
        let Testinline: iLabelInLineElement = new iLabelInLineElement();
        if (oVM != null) {
            if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "IdentityfyingName")) {
                cntControl.IsWordwrap = true;
                let DoseCombIdentName: TextBlock = ObjectHelper.CreateObject(new TextBlock(), { TextWrapping: TextWrapping.Wrap, MaxWidth: 220 });
                let IdentityfyingName: TextBlock = new TextBlock();
                IdentityfyingName.Text = oVM.DrugItem.IdentifyingName;
                // Testinline.IswordWrap = true;
                DoseCombIdentName.Inlines.Add(ObjectHelper.CreateObject(new Run(), { Text: IdentityfyingName.Text }));
                cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: DoseCombIdentName }));
                if (ProfileData.AdditionalPrescConfig != null && ProfileData.AdditionalPrescConfig.EnableWardStockConfig && oVM.IsWardStock && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.InvariantCultureIgnoreCase) && !(PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory)) {
                    wardIcon = this.GetImage("Ward", MedImage.GetPath(MedImages.WardStockIcon), "Item is stocked at this location");
                    cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: wardIcon }));
                }
            }
        }
        ToolTipService.SetToolTip(
            cntControl,
            ObjectHelper.CreateObject(new iLabel(), {
            Text: oVM.DrugItem.IdentifyingName,
            MaxWidth: 250,
            IsWordwrap: true,
        })
      );
      
        return cntControl;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
    private GetImage(sName: string, sPath: string, sToolTip: string): Image {
        let StatusIcon: Image = new Image();
        StatusIcon.HorizontalAlignment = HorizontalAlignment.Center;
        StatusIcon.VerticalAlignment = VerticalAlignment.Stretch;
        StatusIcon.Name = sName;
        StatusIcon.Stretch = Stretch.None;
        StatusIcon.Margin = new Thickness(2);
        StatusIcon.Source = new BitmapImage(new Uri(sPath, UriKind.Relative));
        if (!String.IsNullOrEmpty(sToolTip))
            ToolTipService.SetToolTip(StatusIcon, sToolTip);
        return StatusIcon;
    }
}

export class MCItemDisplay {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let cntControl: iLabel = new iLabel();
        let oPrescriptionItemVm: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(value, PrescriptionItemVM);
        cntControl.IsParagraph = true;
        cntControl.IsWordwrap = true;
        let sParameter: string = parameter as string;
        if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "IdentifyingName")) {
            if (!String.IsNullOrEmpty(oPrescriptionItemVm.FormViewerDetails.BasicDetails.IdentifyingName) && oPrescriptionItemVm.FluidPrescribableItemListOID <= 0) {
                if (oPrescriptionItemVm != null && oPrescriptionItemVm.FormViewerDetails != null && oPrescriptionItemVm.FormViewerDetails.BasicDetails != null && oPrescriptionItemVm.FormViewerDetails.BasicDetails.ParentMCIItem != null && !String.IsNullOrEmpty(oPrescriptionItemVm.FormViewerDetails.BasicDetails.ParentMCIItem.ItemSubType) && oPrescriptionItemVm.FormViewerDetails.BasicDetails.ParentMCIItem.ItemSubType == "CC_MULCMPNTITM") {
                    oPrescriptionItemVm.FormViewerDetails.BasicDetails.IsMCIChildcomponent = true;
                }
                let sMCIName: string[] = null;
                let Prop: string = String.Empty;
                let MCINameBlock: TextBlock = ObjectHelper.CreateObject(new TextBlock(), { TextWrapping: TextWrapping.Wrap, MaxWidth: 220 });
                let MCIName: TextBlock = new TextBlock();
                sMCIName = oPrescriptionItemVm.FormViewerDetails.BasicDetails.IdentifyingName.Split('~');
                MCIName.Text = sMCIName[0];
                if (!String.IsNullOrEmpty(oPrescriptionItemVm.VMVPIdentifyingName) && !MCIName.Text.Contains(" - ")) {
                    MCIName.Text = oPrescriptionItemVm.VMVPIdentifyingName + " - " + MCIName.Text;
                }
                MCINameBlock.Inlines.Add(ObjectHelper.CreateObject(new Run(), { Text: MCIName.Text }));
                cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: MCINameBlock }));
                let Testinline: iLabelInLineElement = new iLabelInLineElement();
                // Testinline.IswordWrap = true;
                let wardIcon: Image = null;
                if (ProfileData.AdditionalPrescConfig != null && ProfileData.AdditionalPrescConfig.EnableWardStockConfig && oPrescriptionItemVm.IsWardStock && !String.Equals(ContextInfo.MenuCode, CConstants.TechnicallyValidateMenuCode, StringComparison.InvariantCultureIgnoreCase) && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.InvariantCultureIgnoreCase) && !(PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory)) {
                    wardIcon = this.GetImage("Ward", MedImage.GetPath(MedImages.WardStockIcon), "Item is stocked at this location");
                    cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: wardIcon }));
                }
                if (sMCIName.length > 1)
                    Prop = sMCIName[1];
                if (!String.IsNullOrEmpty(Prop)) {
                    let sprop: string[] = null;
                    let sPrprty: string = String.Empty;
                    sprop = Prop.Split(',');
                    let nlength: number = sprop.length;
                    for (let j: number = 0; j < nlength; j++) {
                        sPrprty = sprop[j];
                        MCItemDisplay.SetMCDrugProperty(sPrprty, cntControl);
                    }
                }
            }
            else if (!String.IsNullOrEmpty(oPrescriptionItemVm.FormViewerDetails.BasicDetails.IdentifyingName) && oPrescriptionItemVm.FluidPrescribableItemListOID > 0) {
                let FluidBlock: TextBlock;
                FluidBlock = ObjectHelper.CreateObject(new TextBlock(), { TextWrapping: TextWrapping.Wrap, MaxWidth: 220 });
                let FluidName: TextBlock = new TextBlock();
                FluidName.Text = oPrescriptionItemVm.FormViewerDetails.BasicDetails.IdentifyingName + Resource.TechValidate.FluidText;
                FluidBlock.Inlines.Add(ObjectHelper.CreateObject(new Run(), { Text: FluidName.Text }));
                cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: FluidBlock }));
                let wardIcon: Image = null;
                if (ProfileData.AdditionalPrescConfig != null && ProfileData.AdditionalPrescConfig.EnableWardStockConfig && oPrescriptionItemVm.IsWardStockFluid && !String.Equals(ContextInfo.MenuCode, CConstants.TechnicallyValidateMenuCode, StringComparison.InvariantCultureIgnoreCase) && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.InvariantCultureIgnoreCase) && !(PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory)) {
                    wardIcon = this.GetImage("Ward", MedImage.GetPath(MedImages.WardStockIcon), "Item is stocked at this location");
                    cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: wardIcon }));
                }
            }
            else {
                cntControl.Text = (<PrescriptionItemVM>(value)).FormViewerDetails.BasicDetails.IdentifyingName;
            }
        }
        else if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "LatestSupply")) {
            if (!String.IsNullOrEmpty(oPrescriptionItemVm.FormViewerDetails.BasicDetails.IdentifyingName) && oPrescriptionItemVm.FluidPrescribableItemListOID <= 0) {
                let LatestSupDT: TextBlock = new TextBlock();
                let TestinlineforLatestsupply: iLabelInLineElement = new iLabelInLineElement();
                let rnLatestSupply: iLabel = new iLabel();
                let wardIcon: Image = null;
                if (ProfileData.AdditionalPrescConfig != null && ProfileData.AdditionalPrescConfig.EnableWardStockConfig && oPrescriptionItemVm.IsWardStock && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.InvariantCultureIgnoreCase) && !(PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory)) {
                    wardIcon = this.GetImage("Ward", MedImage.GetPath(MedImages.WardStockIcon), "Item is stocked at this location");
                    wardIcon.HorizontalAlignment = HorizontalAlignment.Left;
                    rnLatestSupply.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: wardIcon }));
                }
                if (!String.IsNullOrEmpty(oPrescriptionItemVm.LastSupplyNameMCIChild) && oPrescriptionItemVm.LastSupplyDTTMMCIChild != DateTime.MinValue) {
                    let LtSupplyDet: iLabel = new iLabel();
                    LtSupplyDet.MaxWidth = 100;
                    LtSupplyDet.Width = 100;
                    LtSupplyDet.IsWordwrap = true;
                    LtSupplyDet.IsParagraph = true;
                    let tb3: TextBlock = new TextBlock();
                    tb3.Text = oPrescriptionItemVm.LastSupplyNameMCIChild;
                    let ilb3: iLabelInLineElement = new iLabelInLineElement();
                    // ilb3.IswordWrap = true;
                    ilb3.InLine = tb3;
                    LtSupplyDet.InLines.Add(ilb3);
                    let tb4: TextBlock = new TextBlock();
                    tb4.Text = oPrescriptionItemVm.LastSupplyDTTMMCIChild.ToString(CConstants.DateHMFormat);
                    let ilb4: iLabelInLineElement = new iLabelInLineElement();
                    // ilb4.IswordWrap = true;
                    ilb4.InLine = tb4;
                    LtSupplyDet.InLines.Add(ilb4);
                    rnLatestSupply.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: LtSupplyDet }));
                }
                TestinlineforLatestsupply.InLine = rnLatestSupply;
                cntControl.InLines.Add(TestinlineforLatestsupply);
            }
        }
        return cntControl;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
    private GetImage(sName: string, sPath: string, sToolTip: string): Image {
        let StatusIcon: Image = new Image();
        StatusIcon.HorizontalAlignment = HorizontalAlignment.Center;
        StatusIcon.VerticalAlignment = VerticalAlignment.Stretch;
        StatusIcon.Name = sName;
        StatusIcon.Stretch = Stretch.None;
        StatusIcon.Margin = new Thickness(2);
        StatusIcon.Source = new BitmapImage(new Uri(sPath, UriKind.Relative));
        if (!String.IsNullOrEmpty(sToolTip))
            ToolTipService.SetToolTip(StatusIcon, sToolTip);
        return StatusIcon;
    }
    public static SetMCDrugProperty(DrugProps: string, paraLineDisplay: iLabel): void {
        switch (DrugProps) {
            case "CC_CNTRLDDRUG":
                let sTip: string =  "Controlled drug";
                let img1: Image = new Image();
                img1.Margin = new Thickness(2, 0, 2, 0);
                img1.Stretch = Stretch.None;
                img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_CNTRLDDRUG), UriKind.RelativeOrAbsolute));
                ToolTipService.SetToolTip(img1, sTip);
                paraLineDisplay.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img1 }));
                break;
            case "CC_UNLICENSED":
                let sTip2: string = 'Unlicensed';
                let img2: Image = new Image();
                img2.Margin = new Thickness(2, 0, 2, 0);
                img2.Stretch = Stretch.None;
                img2.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_UNLICENSED), UriKind.RelativeOrAbsolute));
                ToolTipService.SetToolTip(img2, sTip2);
                paraLineDisplay.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img2 }));
                break;
            case "CC_HIGHRISK":
                let sTip1: string = 'High risk';
                let img3: Image = new Image();
                img3.Margin = new Thickness(2, 0, 2, 0);
                img3.Stretch = Stretch.None;
                img3.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_HIGHRISK), UriKind.RelativeOrAbsolute));
                ToolTipService.SetToolTip(img3, sTip1);
                paraLineDisplay.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img3 }));
                break;
            case "CC_NEWLY":
                let sTip3: string = 'Newly marketed';
                let img4: Image = new Image();
                img4.Margin = new Thickness(2, 0, 2, 0);
                img4.Stretch = Stretch.None;
                img4.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_NEWLY), UriKind.RelativeOrAbsolute));
                ToolTipService.SetToolTip(img4, sTip3);
                paraLineDisplay.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img4 }));
                break;
            case "CC_NAMEDRUG":
                let sTip4: string = 'Named patient';
                let img5: Image = new Image();
                img5.Margin = new Thickness(2, 0, 2, 0);
                img5.Stretch = Stretch.None;
                img5.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_NAMEDRUG), UriKind.RelativeOrAbsolute));
                ToolTipService.SetToolTip(img5, sTip4);
                paraLineDisplay.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img5 }));
                break;
        }
    }
}

export class MedMCIOtherDisplay {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let cntControl: iLabel = new iLabel();
        let oPrescriptionItemVm: PrescriptionItemVM = value as PrescriptionItemVM;

        if (oPrescriptionItemVm != null && oPrescriptionItemVm.FormViewerDetails != null 
            && oPrescriptionItemVm.FormViewerDetails.BasicDetails != null && oPrescriptionItemVm.FormViewerDetails.BasicDetails.ParentMCIItem != null
            && !String.IsNullOrEmpty(oPrescriptionItemVm.FormViewerDetails.BasicDetails.ParentMCIItem.ItemSubType)
            && oPrescriptionItemVm.FormViewerDetails.BasicDetails.ParentMCIItem.ItemSubType == "CC_MULCMPNTITM")
        {
            oPrescriptionItemVm.FormViewerDetails.BasicDetails.IsMCIChildcomponent = true;
        }

        if (oPrescriptionItemVm != null && oPrescriptionItemVm.FormViewerDetails != null && oPrescriptionItemVm.FormViewerDetails.BasicDetails != null
            && oPrescriptionItemVm.FormViewerDetails.BasicDetails.ParentMCIItem != null && !String.IsNullOrEmpty(oPrescriptionItemVm.FormViewerDetails.BasicDetails.ParentMCIItem.ItemSubType)
            && String.Equals(oPrescriptionItemVm.FormViewerDetails.BasicDetails.ParentMCIItem.ItemSubType, CConstants.SUBTYPE, StringComparison.InvariantCultureIgnoreCase)
            && oPrescriptionItemVm.FluidPrescribableItemListOID <= 0)
        {
            if (value instanceof PrescriptionItemVM)
            {
                let colWidth = Double.NaN;
                cntControl = LineDisplayHelper.GetOtherInformation(Common.GetPrescriptionLineItemVM(value as PrescriptionItemVM), colWidth);
            }
        }
        return cntControl;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}

export class DisplayChangingDose {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let oVM: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(value, MultipleDoseDetail);        
        let txtChangingDose: iLabel = new iLabel();
        if (oVM != null) {
            if (oVM.ScheduleDetailsData != null && oVM.LowerDose == 0 && oVM.UpperDose == 0) {
                txtChangingDose.Cursor = Cursors.Hand;
                txtChangingDose.Text = oVM.HyperlinkText;
                txtChangingDose.IsWordwrap = true;
                txtChangingDose.TextDecorations = TextDecorations.Underline;
                ToolTipService.SetToolTip(txtChangingDose, "Click here to change dose values");
            }
            else {
                if (!String.IsNullOrEmpty(oVM.DoseValueDisplay) && !String.Equals(oVM.DoseValueDisplay, "0")) {
                    txtChangingDose.Text = oVM.DoseValueDisplay;
                }
                else {
                    txtChangingDose.Text = String.Empty;
                }
                ToolTipService.SetToolTip(txtChangingDose, oVM.HyperlinkText);
            }
            txtChangingDose.IsWordwrap = true;
        }
        return txtChangingDose;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}

export class DisplayChangingDoseMedStp {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let oVM: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(value, MultipleDoseDetail);        
        let txtChangingDose: iLabel = new iLabel();
        if (oVM != null) {
            if (oVM.ScheduleDetailsData != null && oVM.LowerDose == 0 && oVM.UpperDose == 0) {
                txtChangingDose.Text = oVM.HyperlinkText;
                ToolTipService.SetToolTip(txtChangingDose, txtChangingDose.Text);
            }
            else {
                if (!String.IsNullOrEmpty(oVM.DoseValueDisplay) && !String.Equals(oVM.DoseValueDisplay, "0")) {                    
                    if (oVM.DoseUOM != null && !String.IsNullOrEmpty(oVM.DoseUOM.DisplayText) &&  !oVM.DoseValueDisplay.Contains(oVM.DoseUOM.DisplayText))
                     txtChangingDose.Text= oVM.DoseValueDisplay +" "+ oVM.DoseUOM.DisplayText;
                    else
                     txtChangingDose.Text = oVM.DoseValueDisplay;
                }
                else {
                    txtChangingDose.Text = String.Empty;
                }
                ToolTipService.SetToolTip(txtChangingDose, txtChangingDose.Text);
            }
            txtChangingDose.IsWordwrap = true;
        }
        return txtChangingDose;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}

export class DisplayInfusionRate {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let oVM: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(value, MultipleDoseDetail);
        let txtInfusionRate: iLabel = new iLabel();
        if (oVM != null) {
            var strBuild: StringBuilder = new StringBuilder();
            if (!String.IsNullOrEmpty(oVM.InfusionRate)) {
                strBuild.Append(Convert.ToChar(160));
                strBuild.Append(oVM.InfusionRate);
            }
            if (!String.IsNullOrEmpty(oVM.InfusionUpperrate)) {
                strBuild.Append(" - ");
                strBuild.Append(oVM.InfusionUpperrate);
            }
            if (oVM.Infratenumeratoruom != null && !String.IsNullOrEmpty(oVM.Infratenumeratoruom.DisplayText)) {
                strBuild.Append(Convert.ToChar(160));
                strBuild.Append(oVM.Infratenumeratoruom.DisplayText);
            }
            if (oVM.InfrateDenominatoruom != null && !String.IsNullOrEmpty(oVM.InfrateDenominatoruom.DisplayText)) {
                strBuild.Append(Convert.ToChar(47));
                strBuild.Append(oVM.InfrateDenominatoruom.DisplayText);
            }
            txtInfusionRate.Text = strBuild.ToString();
            ToolTipService.SetToolTip(txtInfusionRate, strBuild.ToString());
            txtInfusionRate.IsWordwrap = true;
        }
        return txtInfusionRate;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class DisplayFrequency {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let oVM: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(value, MultipleDoseDetail);
        let txtChangingFrequency: iLabel = new iLabel();
        if (oVM != null && oVM.Frequency != null && !(String.IsNullOrEmpty(oVM.Frequency.DisplayText))) {
            txtChangingFrequency.Text = oVM.Frequency.DisplayText;
            ToolTipService.SetToolTip(txtChangingFrequency, oVM.Frequency.DisplayText);
            txtChangingFrequency.IsWordwrap = true;
        }
        return txtChangingFrequency;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class DisplayDuration {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let oVM: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(value, MultipleDoseDetail);
        let txtDuration: iLabel = new iLabel();
        if (oVM != null) {
            txtDuration.Text = oVM.DurationValueDisplay;
            ToolTipService.SetToolTip(txtDuration, oVM.DurationValueDisplay);
            txtDuration.IsWordwrap = true;
        }
        return txtDuration;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class DisplayOperationMode {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let oVM: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(value, MultipleDoseDetail);
        let txtOperationMode: iLabel = new iLabel();
        if (oVM != null) {
            txtOperationMode.Text = oVM.OperationMode.ToString();
        }
        return txtOperationMode;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class DisplayVariableDoseInst {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let oVM: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(value, MultipleDoseDetail);
        let txtVariableDoseInst: iLabel = new iLabel();
        if (oVM != null) {
            txtVariableDoseInst.Text = oVM.DoseInstructions;
            ToolTipService.SetToolTip(txtVariableDoseInst, oVM.DoseInstructions);
            txtVariableDoseInst.IsWordwrap = true;
        }
        return txtVariableDoseInst;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class DisplayVarInstTooltip {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let oVM: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(value, MultipleDoseDetail);
        let txtVariableDoseInst: iLabel = new iLabel();
        if (oVM != null) {
            txtVariableDoseInst.Text = oVM.DoseInstructions;
            ToolTipService.SetToolTip(txtVariableDoseInst, oVM.DoseInstructions);
            txtVariableDoseInst.IsWordwrap = true;
            txtVariableDoseInst.Width = 250;
        }
        return txtVariableDoseInst;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class DisplayAdminTimes {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let oVM: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(value, MultipleDoseDetail);
        let txtAdminTimes: iLabel = new iLabel();
        if (oVM != null) {
            txtAdminTimes.Text = oVM.AdministrationTimes;
            ToolTipService.SetToolTip(txtAdminTimes, oVM.AdministrationTimes);
            txtAdminTimes.IsWordwrap = true;
            txtAdminTimes.FontSize = 11;
        }
        return txtAdminTimes;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class NumberToImageUrl {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        if (value != null)
        {
            let _val: Int32 = Convert.ToInt32(value.ToString());
            if (_val == 1)
            {
                return new Uri(MedImage.GetPath(MedImages.DCIcon), UriKind.RelativeOrAbsolute);
            }
            else if (_val == 2)
            {
                return new Uri(MedImage.GetPath(MedImages.DCIconWithAlert), UriKind.RelativeOrAbsolute);
            }
        }
        return null;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class SupplyHistory  {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let oVM: SupplyHistoryDetails = ObjectHelper.CreateType<SupplyHistoryDetails>(value, SupplyHistoryDetails);
        let cntControl: iLabel = new iLabel();
        cntControl.IsWordwrap = true;
        cntControl.IsParagraph = true;
        let sParameter: string = ObjectHelper.CreateType<string>(parameter, "string");
        let Testinline: iLabelInLineElement = new iLabelInLineElement();
        if (oVM != null) {
            if (String.Equals(oVM.PresItemstatusCode, CConstants.CANCELLED)) {
                cntControl.IsStrike = true;
            }
            if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "Medicationitem")) {
                cntControl.IsWordwrap = true;
                let DrugName: TextBlock = new TextBlock();
                DrugName.Text = oVM.Drugname;
                Testinline.IsWordwrap = true;
                Testinline.InLine = DrugName;
            }
            else if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "SupplystatusCode")) {
                let sSupplystatusCode: TextBlock = new TextBlock();
                sSupplystatusCode.Text = oVM.SupplystatusCode;
                Testinline.IsWordwrap = true;
                Testinline.InLine = sSupplystatusCode;
            }
            else if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "SupplieddBy")) {
                if(!String.IsNullOrEmpty(oVM.SupplieddBy)){
                let dt: iLabel = new iLabel();
                dt.MaxWidth = 100;
                dt.IsWordwrap = true;
                if (String.Equals(oVM.PresItemstatusCode, CConstants.CANCELLED)) {
                    dt.IsStrike = true;
                }
                let tb3: TextBlock = new TextBlock();
                tb3.Text = oVM.SupplieddBy;
                let ilb3: iLabelInLineElement = new iLabelInLineElement();
                ilb3.IsWordwrap = true;
                ilb3.InLine = tb3;
                dt.InLines.Add(ilb3);
                let tb4: TextBlock = new TextBlock();
                //tb4.Text = oVM.SuppliedDTTM.ToString();
                tb4.Text=oVM.SuppliedDTTM == DateTime.MinValue? "": oVM.SuppliedDTTM.ToString("dd-MMM-yyyy HH:mm");
                let ilb4: iLabelInLineElement = new iLabelInLineElement();
                ilb4.IsWordwrap = true;
                ilb4.InLine = tb4;
                dt.InLines.Add(ilb4);

                // let dt: TextBlock = new TextBlock();
                // dt.MaxWidth = 100;
                // dt.IsWordwrap = true;
                // dt.Text = oVM.SupplieddBy;

                // dt.Text = oVM.SupplieddBy + oVM.DispenseStatus[0].ResponseDTTM.ToString(CConstants.LongDateWithoutSecs);
                Testinline.IsWordwrap = true;
                Testinline.InLine = dt;
            }
            }
            else if (!String.IsNullOrEmpty(sParameter) && (String.Equals(sParameter, "Supplyinstruction") || String.Equals(sParameter, "SupplyinstructionToolTip"))) {
                let sSupplyinstruction: TextBlock = new TextBlock();
                if (oVM.Supplyinstruction != null && oVM.Supplyinstruction.Contains("\r\n")) {
                    let drugType: string = "0,1,2,3,4,5,6,7,8,9";
                    let myData: string[] = drugType.Split(',');
                    let st1: string = String.Empty;
                    for (let dnt: number = 0; dnt < myData.length; dnt++) {
                        let st: string = " " + myData[dnt] + " ";
                        if (!oVM.Supplyinstruction.Contains(st)) {
                            st1 = oVM.Supplyinstruction.Replace("\r\n", "   ");
                            if (!String.IsNullOrEmpty(st1) && st1.Contains('\n')) {
                                let newlinesplit: string[] = st1.Split('\n');
                                if (newlinesplit != null) {
                                    st1 = String.Empty;
                                    for (let i: number = 0; i < newlinesplit.Count(); i++) {
                                        st1 = st1 + " " + newlinesplit[i];
                                    }
                                }
                            }
                        }
                    }
                    sSupplyinstruction.Text = st1;
                }
                else if (!String.IsNullOrEmpty(oVM.Supplyinstruction) && oVM.Supplyinstruction.Contains("\n")) {
                    let drugType: string = "0,1,2,3,4,5,6,7,8,9";
                    let myData: string[] = drugType.Split(',');
                    let st1: string = String.Empty;
                    for (let dnt: number = 0; dnt < myData.length; dnt++) {
                        let st: string = " " + myData[dnt] + " ";
                        if (!oVM.Supplyinstruction.Contains(st)) {
                            st1 = oVM.Supplyinstruction.Replace("\n", " ");
                        }
                    }
                    sSupplyinstruction.Text = st1;
                }
                else if (oVM.Supplyinstruction != null) {
                    sSupplyinstruction.Text = oVM.Supplyinstruction;
                }
                if (!String.IsNullOrEmpty(sSupplyinstruction.Text) && String.Equals(sParameter, "SupplyinstructionToolTip")) {
                    let whitespace: string[] = [];
                    let str = sSupplyinstruction.Text.Split(whitespace);
                    let stooltip: StringBuilder = new StringBuilder();
                    str.forEach( (i)=> {
                        let iterator: string = i; 
                        let max_Char: number = 33;
                        let quotient: number = i.length / max_Char; 
                        if (i.length > max_Char) { 
                            for (let m: number = 1; m <= quotient; m++) { 
                                let index: number = m * max_Char; 
                                if (index <= i.length) {
                                    // iterator = iterator.Insert(index, " ");  
                                    iterator = this.StringInsert(iterator, index, " "); 
                                }
                            }
                            stooltip.Append(iterator);
                        }
                        else {
                            stooltip.Append(i);
                            stooltip.Append(" ");
                        }
                    });
                    sSupplyinstruction.Text = stooltip.ToString();
                    sSupplyinstruction.TextWrapping = TextWrapping.Wrap;
                    sSupplyinstruction.MaxWidth = Number.Parse("250");
                    cntControl.MaxWidth = Number.Parse("250");
                    cntControl.IsWordwrap = true;
                }
                Testinline.IsWordwrap = true;
                Testinline.InLine = sSupplyinstruction;
            }
            else if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "LocationName")) {
                let sLocationName: TextBlock = new TextBlock();
                sLocationName.Text = oVM.LocationName;
                Testinline.IsWordwrap = true;
                Testinline.InLine = sLocationName;
            }
            else if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "NextSupplyDttm")) {
                let sNextsupply: TextBlock = new TextBlock();
                // sNextsupply.Text = oVM.NextSupplyDTTM.ToString("dd-MMM-yyyy");
                let date =oVM.NextSupplyDTTM
                sNextsupply.Text = date == DateTime.MinValue? "": date.ToString("dd-MMM-yyyy");
                Testinline.IsWordwrap = true;
                Testinline.InLine = sNextsupply;
            }
            else if (!String.IsNullOrEmpty(sParameter) && (String.Equals(sParameter, "DispensingDetail") || String.Equals(sParameter, "DispensingDetailTooltip"))) {
                if (oVM.DispenseStatus != null) {
                    let layout: Grid = new Grid();
                    let oColumnDefinition: ColumnDefinition = new ColumnDefinition();
                    oColumnDefinition.Width = GridLength.Auto;
                    layout.ColumnDefinitions.Add(oColumnDefinition);
                    let oColumnDefinition1: ColumnDefinition = new ColumnDefinition();
                    oColumnDefinition1.Width = GridLength.Auto;
                    layout.ColumnDefinitions.Add(oColumnDefinition1);
                    let cnt: number = oVM.DispenseStatus.Count;
                    for (let i: number = 0; i <= cnt - 1; i++) {
                        let Dispstatus: string = CommonBB.GetText(oVM.DispenseStatus[i].Status, DispenseStatusListConceptCodeData.ConceptCodes);
                        layout.RowDefinitions.Add(new RowDefinition());
                        let status: iLabel = ObjectHelper.CreateObject(new iLabel(), { Text: Dispstatus, VerticalAlignment: VerticalAlignment.Top });
                        // status.Margin = new Thickness(5);
                        if (String.Equals(oVM.PresItemstatusCode, CConstants.CANCELLED)) {
                            status.IsStrike = true;
                        }
                        let brdr1: Border = new Border();
                        brdr1.BorderBrush = Colors.LightGray.color;
                        // brdr1.BorderThickness = new Thickness(1);
                        brdr1.BorderThickness= "1";
                        brdr1.isContent=true
                        brdr1.Child = status;
                        layout.Children.Add(brdr1);
                        layout.SetGridColumn(brdr1, 1);
                        layout.SetGridRow(brdr1, i+1);
                        let dt: iLabel = new iLabel();
                        dt.TextAlignment = TextAlignment.Left;
                        // dt.Margin = new Thickness(5);
                        dt.IsWordwrap = true;
                        dt.IsParagraph = true;
                        dt.MaxWidth = 360;
                        if (String.Equals(oVM.PresItemstatusCode, CConstants.CANCELLED)) {
                            dt.IsStrike = true;
                        }
                        let sb: StringBuilder = new StringBuilder();
                        sb.Append(oVM.DispenseStatus[i].ResponseDTTM.ToString(CConstants.LongDateWithoutSecs));
                        let tb1: TextBlock = new TextBlock();
                        tb1.Text = sb.ToString();
                        let ilb1: iLabelInLineElement = new iLabelInLineElement();
                        ilb1.IsWordwrap = true;
                        ilb1.InLine = tb1;
                        dt.InLines.Add(ilb1);
                        if (!String.Equals(oVM.DispenseStatus[i].Status, CConstants.DispStRequestSent, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oVM.DispenseStatus[i].Status, CConstants.DispStCancelledEPR, StringComparison.InvariantCultureIgnoreCase)) {
                            if (String.Equals(oVM.DispenseStatus[i].Status, CConstants.DispStIssued, StringComparison.InvariantCultureIgnoreCase)) {
                                if (!String.IsNullOrEmpty(oVM.DispenseStatus[i].DispensedDrugName)) {
                                    sb = new StringBuilder();
                                    sb.Append(oVM.DispenseStatus[i].DispensedDrugName);
                                    let tb2: TextBlock = new TextBlock();
                                    tb2.Text = sb.ToString();
                                    let ilb2: iLabelInLineElement = new iLabelInLineElement();
                                    ilb2.IsWordwrap = true;
                                    ilb2.InLine = tb2;
                                    dt.InLines.Add(ilb2);
                                }
                                if (!String.IsNullOrEmpty(oVM.DispenseStatus[i].Servicename) && !String.IsNullOrEmpty(oVM.DispenseStatus[i].Locationname)) {
                                    sb = new StringBuilder();
                                    sb.Append(oVM.DispenseStatus[i].Servicename + "-" + oVM.DispenseStatus[i].Locationname);
                                    let tb3: TextBlock = new TextBlock();
                                    tb3.Text = sb.ToString();
                                    let ilb3: iLabelInLineElement = new iLabelInLineElement();
                                    ilb3.IsWordwrap = true;
                                    ilb3.InLine = tb3;
                                    dt.InLines.Add(ilb3);
                                }
                                else if (!String.IsNullOrEmpty(oVM.DispenseStatus[i].Servicename)) {
                                    sb = new StringBuilder();
                                    sb.Append(oVM.DispenseStatus[i].Servicename);
                                    let tb3: TextBlock = new TextBlock();
                                    tb3.Text = sb.ToString();
                                    let ilb3: iLabelInLineElement = new iLabelInLineElement();
                                    ilb3.IsWordwrap = true;
                                    ilb3.InLine = tb3;
                                    dt.InLines.Add(ilb3);
                                }
                                else if (!String.IsNullOrEmpty(oVM.DispenseStatus[i].Locationname)) {
                                    sb = new StringBuilder();
                                    sb.Append(oVM.DispenseStatus[i].Locationname);
                                    let tb3: TextBlock = new TextBlock();
                                    tb3.Text = sb.ToString();
                                    let ilb3: iLabelInLineElement = new iLabelInLineElement();
                                    ilb3.IsWordwrap = true;
                                    ilb3.InLine = tb3;
                                    dt.InLines.Add(ilb3);
                                }
                                if (!String.IsNullOrEmpty(oVM.DispenseStatus[i].Name)) {
                                    sb = new StringBuilder();
                                    sb.Append(oVM.DispenseStatus[i].Name);
                                    let tb4: TextBlock = new TextBlock();
                                    tb4.Text = sb.ToString();
                                    let ilb4: iLabelInLineElement = new iLabelInLineElement();
                                    ilb4.IsWordwrap = true;
                                    ilb4.InLine = tb4;
                                    dt.InLines.Add(ilb4);
                                }
                            }
                            else {
                                if (!String.IsNullOrEmpty(oVM.DispenseStatus[i].Name)) {
                                    sb = new StringBuilder();
                                    sb.Append(oVM.DispenseStatus[i].Name);
                                    let tb2: TextBlock = new TextBlock();
                                    tb2.Text = sb.ToString();
                                    let ilb2: iLabelInLineElement = new iLabelInLineElement();
                                    ilb2.IsWordwrap = true;
                                    ilb2.InLine = tb2;
                                    dt.InLines.Add(ilb2);
                                }
                                if (!String.IsNullOrEmpty(oVM.DispenseStatus[i].Reason)) {
                                    sb = new StringBuilder();
                                    sb.Append(oVM.DispenseStatus[i].Reason);
                                    let tb3: TextBlock = new TextBlock();
                                    tb3.Text = sb.ToString();
                                    let ilb3: iLabelInLineElement = new iLabelInLineElement();
                                    ilb3.IsWordwrap = true;
                                    ilb3.InLine = tb3;
                                    dt.InLines.Add(ilb3);
                                }
                            }
                        }
                        let brdr2: Border = new Border();
                        brdr2.BorderBrush = Colors.LightGray.color;
                        // brdr2.BorderThickness = new Thickness(0, 1, 1, 1);
                        brdr2.BorderThickness= "1";
                        brdr2.isContent=true
                        brdr2.Child = dt;
                        layout.Children.Add(brdr2);
                        layout.SetGridColumn(brdr2, 2);
                        layout.SetGridRow(brdr2, i+1);
                    }
                    if (String.Equals(sParameter, "DispensingDetailTooltip")) {
                        layout.MaxWidth = Number.Parse("450");
                    }
                    Testinline.InLine = layout;
                }
            }
            else if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "Prescriptiontype")) {
                let sPrescriptiontype: TextBlock = new TextBlock();
                sPrescriptiontype.Text = oVM.Prescriptiontype;
                Testinline.IsWordwrap = true;
                Testinline.InLine = sPrescriptiontype;
            }
        }
        cntControl.InLines.Add(Testinline);
        return cntControl;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
    private StringInsert(value: string, index: number, insertValue: string) {
        return [value.slice(0, index), insertValue, value.slice(index)].join('');
    }
}
