import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection } from 'epma-platform/models';
import { AppDialog, Colors, SolidColorBrush } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { InfusionProcessIcon, LineFlowDirection } from './InfusionProcessIcon';
import { ChartIcon } from './ChartIcon';
import { CIcon } from './CIcon';
import { CLine } from './CLine';
import { ImageAlignment } from 'src/app/shared/epma-platform/models/eppma-common-types';
  
    export class InfusionChartCell{
        private _AlertIcons: ObservableCollection<ChartIcon>;
        private _InfusionIcons: ObservableCollection<ChartIcon>;
        private _ProcessIcons: ObservableCollection<InfusionProcessIcon>;
        private _CLines: ObservableCollection<CLine>;
        private _lineColour: SolidColorBrush;
        private _LineType: InfusionProcessIcon.LineTypes;

        private _Tag: Object;
        private _EnableCellClick: boolean;
        private _InfusionAlignment: ImageAlignment = ImageAlignment.Left;
        private _MultiActuionIcon: ChartIcon;
        private _AdministrationIcon: ChartIcon;
        private _HomeLeaveIcon: ChartIcon;
        private _ToolTip: string = String.Empty;
        private _lastColumn : boolean= false;
        constructor() {
            this._CLines = new ObservableCollection<CLine>();
            this._ProcessIcons = new ObservableCollection<InfusionProcessIcon>();
            this._AlertIcons = new ObservableCollection<ChartIcon>();
            this._InfusionIcons = new ObservableCollection<ChartIcon>();
        }
        public ColIndex: number;
        public Key: string;
        public get AlertIcons(): ObservableCollection<ChartIcon> {
            return this._AlertIcons;
        }
        public set AlertIcons(value: ObservableCollection<ChartIcon>) {
            this._AlertIcons = value;
            //NotifyPropertyChanged("AlertIcons");
        }
        public get InfusionIcons(): ObservableCollection<ChartIcon> {
            return this._InfusionIcons;
        }
        public set InfusionIcons(value: ObservableCollection<ChartIcon>) {
            this._InfusionIcons = value;
            //NotifyPropertyChanged("InfusionIcons");
        }
        public get MultiActuionIcon(): ChartIcon {
            return this._MultiActuionIcon;
        }
        public set MultiActuionIcon(value: ChartIcon) {
            this._MultiActuionIcon = value;
            //NotifyPropertyChanged("MultiActuionIcon");
        }
        public get ProcessChartIcon(): ObservableCollection<InfusionProcessIcon> {
            return this._ProcessIcons;
        }
        public set ProcessChartIcon(value: ObservableCollection<InfusionProcessIcon>) {
            this._ProcessIcons = value;
            //NotifyPropertyChanged("ProcessChartIcon");
        }
        public get AdministrationIcon(): ChartIcon {
            return this._AdministrationIcon;
        }
        public set AdministrationIcon(value: ChartIcon) {
            this._AdministrationIcon = value;
            //NotifyPropertyChanged("AdministrationIcon");
        }
        public get HomeLeaveIcon(): ChartIcon {
            return this._HomeLeaveIcon;
        }
        public set HomeLeaveIcon(value: ChartIcon) {
            this._HomeLeaveIcon = value;
            //NotifyPropertyChanged("HomeLeaveIcon");
        }
        public CurrentDateTime: DateTime;
        public cnvHeight: number;
        public cnvWidth: number;
        // cahnge the type for iinfusionchart
        public CInterval: Double ;
        public StartRange: number;
        public EndRange: number;
        public DisplayTimeLine: boolean;
        private oChartBackground: SolidColorBrush = new SolidColorBrush(Colors.Transparent);
        public get ChartBackground(): SolidColorBrush {
            return this.oChartBackground;
        }
        public set ChartBackground(value: SolidColorBrush) {
            this.oChartBackground = value;
        }
        public get CLines(): ObservableCollection<CLine> {
            return this._CLines;
        }
        public set CLines(value: ObservableCollection<CLine>) {
            this._CLines = value;
            //NotifyPropertyChanged("CLines");
        }
        public DisplayFullLine: boolean;
        public get LineColour(): SolidColorBrush {
            return this._lineColour;
        }
        public set LineColour(value: SolidColorBrush) {
            if (value != this._lineColour) {
                this._lineColour = value;
                //this.NotifyPropertyChanged("LineColour");
            }
        }
        public get LineType(): InfusionProcessIcon.LineTypes {
            return this._LineType;
        }
        public set LineType(value: InfusionProcessIcon.LineTypes) {
            this._LineType = value;
            //NotifyPropertyChanged("LineType");
        }
        public StopAtTimeline: boolean;
        private GetUriString(objIcon: CIcon): string {
            if (objIcon != null)
                return objIcon.UriString;
            return null;
        }
        public get Tag(): Object {
            return this._Tag;
        }
        public set Tag(value: Object) {
            this._Tag = value;
            //NotifyPropertyChanged("Tag");
        }
        public get EnableCellClick(): boolean {
            return this._EnableCellClick;
        }
        public set EnableCellClick(value: boolean) {
            this._EnableCellClick = value;
            //NotifyPropertyChanged("EnableCellClick");
        }
        public get InfusionAlignment(): ImageAlignment {
            return this._InfusionAlignment;
        }
        public set InfusionAlignment(value: ImageAlignment) {
            this._InfusionAlignment = value;
            //NotifyPropertyChanged("InfusionAlignment");
        }
        public get ToolTip(): string {
            return this._ToolTip;
        }
        public set ToolTip(value: string) {
            this._ToolTip = value;
            //NotifyPropertyChanged("ToolTip");
        }

       public HighlightReviewSlot:boolean = false;

       public get LastColum() : boolean {
        return this._lastColumn
       }
       public set LastColum(lastCol : boolean) {
        this._lastColumn = lastCol;
        
       }
       
        // public _HighlightReviewSlot: boolean;
        // static HighlightReviewSlotProperty = "HighlightReviewSlot";
        // public get HighlightReviewSlot(): boolean {
        //     return ObjectHelper.GetValue(this,InfusionChartCell.HighlightReviewSlotProperty)
        //     // return <boolean>GetValue(InfusionChartCell.HighlightReviewSlotProperty);
           
        // }
        // public set HighlightReviewSlot(value: boolean) {
        //     ObjectHelper.SetValue(this, InfusionChartCell.HighlightReviewSlotProperty, value);
        //     // SetValue(InfusionChartCell.HighlightReviewSlotProperty, value);
        // }
        // public static HighlightReviewSlotProperty: DependencyProperty = DependencyProperty.Register("HighlightReviewSlot",/*typeof*/boolean,/*typeof*/InfusionChartCell, new PropertyMetadata(false));
        
        public CreateProgressIconCollectionForCell(objIcell: InfusionChartCell): void {
            objIcell.ProcessChartIcon.Clear();
            let objPIcon: InfusionProcessIcon;
            let objPIcon1: InfusionProcessIcon;
            let objPIcon2: InfusionProcessIcon;
            let objCurActivePIcon: InfusionProcessIcon = null;
            let lstCellLines: ObservableCollection<CLine> = objIcell.CLines;
            for (let nLineObjCnt: number = 0; nLineObjCnt < lstCellLines.Count; nLineObjCnt++) {
                objPIcon = new InfusionProcessIcon();
                objPIcon1 = new InfusionProcessIcon();
                objPIcon2 = new InfusionProcessIcon();
                objCurActivePIcon = objPIcon;
                if (lstCellLines[nLineObjCnt].StartIcon != null && lstCellLines[nLineObjCnt].EndIcon != null) {
                    objPIcon1.LineDirection = LineFlowDirection.Right;
                    objPIcon1.RightLineType = lstCellLines[nLineObjCnt].LineType;
                    objPIcon1.RightLineColor = lstCellLines[nLineObjCnt].LineColour;
                    objPIcon1.StopAtTimeline = lstCellLines[nLineObjCnt].StopAtTimeline;
                    objPIcon1.UriString = this.GetUriString(lstCellLines[nLineObjCnt].StartIcon);
                    objPIcon1.TimeTooltip = lstCellLines[nLineObjCnt].StartDTTM.Value.ToString("HH:mm");
                    objPIcon1.IsImageInvisible = lstCellLines[nLineObjCnt].StartIcon.IsImageInvisible;
                    if (lstCellLines[nLineObjCnt].StartIcon.IconToolTip != null && !String.IsNullOrEmpty(lstCellLines[nLineObjCnt].StartIcon.IconToolTip.ToString()))
                        objPIcon1.Tooltip = lstCellLines[nLineObjCnt].StartIcon.IconToolTip;
                    objPIcon2.LineDirection = LineFlowDirection.Left;
                    objPIcon2.LeftLineType = lstCellLines[nLineObjCnt].LineType;
                    objPIcon2.LeftLineColor = lstCellLines[nLineObjCnt].LineColour;
                    objPIcon2.UriString = this.GetUriString(lstCellLines[nLineObjCnt].EndIcon);
                    objPIcon2.IsImageInvisible = lstCellLines[nLineObjCnt].EndIcon.IsImageInvisible;
                    ;
                    objPIcon2.TimeTooltip = lstCellLines[nLineObjCnt].EndDTTDM.Value.ToString("HH:mm");
                    if (lstCellLines[nLineObjCnt].EndIcon.IconToolTip != null && !String.IsNullOrEmpty(lstCellLines[nLineObjCnt].EndIcon.IconToolTip.ToString()))
                        objPIcon2.Tooltip = lstCellLines[nLineObjCnt].EndIcon.IconToolTip;
                    objIcell.ProcessChartIcon.Add(objPIcon1);
                    objIcell.ProcessChartIcon.Add(objPIcon2);
                    objCurActivePIcon = objPIcon2;
                }
                else if (lstCellLines[nLineObjCnt].StartIcon == null && lstCellLines[nLineObjCnt].EndIcon == null) {
                    objIcell.DisplayFullLine = true;
                    objIcell.LineType = lstCellLines[nLineObjCnt].LineType;
                    objIcell.LineColour = lstCellLines[nLineObjCnt].LineColour;
                    objIcell.StopAtTimeline = lstCellLines[nLineObjCnt].StopAtTimeline;
                }
                else if (lstCellLines[nLineObjCnt].StartIcon != null && DateTime.Equals(lstCellLines[nLineObjCnt].StartDTTM,lstCellLines[nLineObjCnt].EndDTTDM)) {
                    objPIcon.LineDirection = LineFlowDirection.None;
                    objPIcon.UriString = this.GetUriString(lstCellLines[nLineObjCnt].StartIcon);
                    objPIcon.IsImageInvisible = lstCellLines[nLineObjCnt].StartIcon.IsImageInvisible;
                    objPIcon.TimeTooltip = lstCellLines[nLineObjCnt].StartDTTM.Value.ToString("HH:mm");
                    if (lstCellLines[nLineObjCnt].StartIcon.IconToolTip != null && !String.IsNullOrEmpty(lstCellLines[nLineObjCnt].StartIcon.IconToolTip.ToString()))
                        objPIcon.Tooltip = lstCellLines[nLineObjCnt].StartIcon.IconToolTip;
                    objIcell.ProcessChartIcon.Add(objPIcon);
                }
                else if (lstCellLines[nLineObjCnt].StartIcon != null && DateTime.NotEquals(lstCellLines[nLineObjCnt].StartDTTM , lstCellLines[nLineObjCnt].EndDTTDM)) {
                    objPIcon.LineDirection = LineFlowDirection.Right;
                    objPIcon.RightLineType = lstCellLines[nLineObjCnt].LineType;
                    objPIcon.RightLineColor = lstCellLines[nLineObjCnt].LineColour;
                    objPIcon.UriString = this.GetUriString(lstCellLines[nLineObjCnt].StartIcon);
                    objPIcon.IsImageInvisible = lstCellLines[nLineObjCnt].StartIcon.IsImageInvisible;
                    objPIcon.StopAtTimeline = lstCellLines[nLineObjCnt].StopAtTimeline;
                    objPIcon.TimeTooltip = lstCellLines[nLineObjCnt].StartDTTM.Value.ToString("HH:mm");
                    if (lstCellLines[nLineObjCnt].StartIcon.IconToolTip != null && !String.IsNullOrEmpty(lstCellLines[nLineObjCnt].StartIcon.IconToolTip.ToString()))
                        objPIcon.Tooltip = lstCellLines[nLineObjCnt].StartIcon.IconToolTip;
                    objIcell.ProcessChartIcon.Add(objPIcon);
                }
                else if (lstCellLines[nLineObjCnt].EndIcon != null &&  DateTime.Equals(lstCellLines[nLineObjCnt].StartDTTM,lstCellLines[nLineObjCnt].EndDTTDM)) {
                    objPIcon.LineDirection = LineFlowDirection.None;
                    objPIcon.UriString = this.GetUriString(lstCellLines[nLineObjCnt].EndIcon);
                    objPIcon.IsImageInvisible = lstCellLines[nLineObjCnt].EndIcon.IsImageInvisible;
                    objPIcon.TimeTooltip = lstCellLines[nLineObjCnt].EndDTTDM.Value.ToString("HH:mm");
                    if (lstCellLines[nLineObjCnt].EndIcon.IconToolTip != null && !String.IsNullOrEmpty(lstCellLines[nLineObjCnt].EndIcon.IconToolTip.ToString()))
                        objPIcon.Tooltip = lstCellLines[nLineObjCnt].EndIcon.IconToolTip;
                    objIcell.ProcessChartIcon.Add(objPIcon);
                }
                else if (lstCellLines[nLineObjCnt].EndIcon != null &&  DateTime.NotEquals(lstCellLines[nLineObjCnt].StartDTTM,lstCellLines[nLineObjCnt].EndDTTDM)) {
                    objPIcon.LineDirection = LineFlowDirection.Left;
                    objPIcon.LeftLineType = lstCellLines[nLineObjCnt].LineType;
                    objPIcon.LeftLineColor = lstCellLines[nLineObjCnt].LineColour;
                    objPIcon.UriString = this.GetUriString(lstCellLines[nLineObjCnt].EndIcon);
                    objPIcon.IsImageInvisible = lstCellLines[nLineObjCnt].EndIcon.IsImageInvisible;
                    objPIcon.TimeTooltip = lstCellLines[nLineObjCnt].EndDTTDM.Value.ToString("HH:mm");
                    if (lstCellLines[nLineObjCnt].EndIcon.IconToolTip != null && !String.IsNullOrEmpty(lstCellLines[nLineObjCnt].EndIcon.IconToolTip.ToString()))
                        objPIcon.Tooltip = lstCellLines[nLineObjCnt].EndIcon.IconToolTip;
                    objIcell.ProcessChartIcon.Add(objPIcon);
                }
                if (((nLineObjCnt + 1) < lstCellLines.Count) && lstCellLines[nLineObjCnt + 1] != null) {
                    if (lstCellLines[nLineObjCnt + 1].StartIcon == null && lstCellLines[nLineObjCnt + 1].EndIcon == null) {
                        objCurActivePIcon.LineDirection = LineFlowDirection.Both;
                        objCurActivePIcon.RightLineType = lstCellLines[nLineObjCnt + 1].LineType;
                        objCurActivePIcon.RightLineColor = lstCellLines[nLineObjCnt + 1].LineColour;
                        objCurActivePIcon.StopAtTimeline = lstCellLines[nLineObjCnt + 1].StopAtTimeline;
                        nLineObjCnt = nLineObjCnt + 1;
                    }
                }
            }
        }
    }
