import { Component, OnInit, ViewChild, Injectable,AfterViewInit, Input } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection } from 'epma-platform/models';
import { AppDialog, BitmapImage, Border, Color, Colors, FontFamily, Grid, Image, SolidColorBrush, TextBlock, Thickness, ToolTipService, Uri, UriKind, UserControl, iLabel } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { InfusionChartCell } from '../../common/InfusionChartCell';
import { ImageAlignment } from 'src/app/shared/epma-platform/models/eppma-common-types';
import { Visibility } from 'epma-platform/models';

import { LineFlowDirection } from '../../common/InfusionProcessIcon';

import { InfusionProcessIcon } from '../../common/InfusionProcessIcon';
import { Environment } from 'src/app/product/shared/models/Common';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { Canvas } from 'src/app/shared/epma-platform/controls/epma-canvas/epma-canvas.component';
import { Line } from 'src/app/shared/epma-platform/controls/line.component/line.component';
import { Observable, Subscription } from 'rxjs';


@Component({
    selector: 'InfusionCell',
    templateUrl: './infusion-cell.component.html',
    styleUrls: ['./infusion-cell.component.css']
})

export class InfusionCell extends UserControl {

    public Chartgrid: Grid = new Grid();
    private eventsSubscription: Subscription;
    @ViewChild("ChartgridTempRef", { read: Grid, static: false }) set _Chartgrid(c: Grid) {
        if (c) { this.Chartgrid = c; }
    };
@Input() rowrefresh :boolean;
@Input() events : Observable<boolean>;
  override _DataContext: InfusionChartCell;
  override get DataContext() {
    return this._DataContext;
  }
  @Input() override set DataContext(value: InfusionChartCell) {
    this._DataContext = value;
  }
    constructor() {
        super();
        if(this.rowrefresh){
         //   console.log('infusioncell-datacontext',this.DataContext);
            }
    }
    ngAfterViewInit(): void { 
   this.Grid_Loaded({},null); 
    }
    ngOnInit() {
        if (this.rowrefresh) {
            this.events.subscribe((t: any) => {
                if (t && t == true) {
                    this.Grid_Loaded({}, null);
                }
            });
        }
        
    }
    viewModel: InfusionChartCell = new InfusionChartCell;
    public noOfAlertIcon: number = 0;
    public noOfIcon: number = 0;
    public noOfProgressIcon: number = 0;
    public StartRange: number = 0;
    public EndRange: number = 0;
    public CurrentDatetime: DateTime;
    public CInterval: any;
    public RowHeight: number = 0;
    objGrid: Grid = new Grid();
    public cnvHeight: number = 0;
    public cnvWidth: number = 0;
    public VposX: number = 0;
    CellBackground: SolidColorBrush;
    InfusionBagAlign: ImageAlignment;
    public DisplayProgressLine: boolean = false;
    public DrawProgressLineAfter: boolean = false;
    public DrawProgressLineBefore: boolean = false;
    private _Disptime: boolean;
    public get DisplayTimeLine(): boolean {
        return this._Disptime;
    }
    public set DisplayTimeLine(value: boolean) {
        this._Disptime = value;
    }
    private Grid_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.Chartgrid.Children.Clear();
        if(this.objGrid.Children)
        this.objGrid.Children.Clear();
        //revisit divya
       if(this.DataContext !== undefined) {
        this.viewModel = ObjectHelper.CreateType<InfusionChartCell>(this.DataContext, InfusionChartCell);
        if (this.viewModel.ProcessChartIcon != null)
            this.noOfProgressIcon = this.viewModel.ProcessChartIcon.Count;
        if (this.viewModel.AlertIcons != null)
            this.noOfAlertIcon = this.viewModel.AlertIcons.Count;
        if (this.viewModel.InfusionIcons != null)
            this.noOfIcon = this.viewModel.InfusionIcons.Count;
        if (this.viewModel != null) {
            this.DisplayTimeLine = this.viewModel.DisplayTimeLine;
            this.CurrentDatetime = this.viewModel.CurrentDateTime;
            this.EndRange = this.viewModel.EndRange;
            this.StartRange = this.viewModel.StartRange;
            this.CInterval = this.viewModel.CInterval;
            this.cnvHeight = this.viewModel.cnvHeight;
            this.cnvWidth = this.viewModel.cnvWidth;
            this.CellBackground = this.viewModel.ChartBackground;
            this.InfusionBagAlign = this.viewModel.InfusionAlignment;
        }
        if (this.viewModel != null && !String.IsNullOrEmpty(this.viewModel.ToolTip))
            ToolTipService.SetToolTip(this.Chartgrid, this.viewModel.ToolTip.ToString());
        let cnv1: Canvas = new Canvas();
        cnv1.Height = this.cnvHeight;
        cnv1.Width = this.cnvWidth;
        //    if (this.viewModel.HighlightReviewSlot) {
        //        let myBorder: Border = new Border();
        //        myBorder.BorderBrush = new SolidColorBrush(Colors.Red);
        //        myBorder.BorderThickness = new Thickness(2);
        //        myBorder.Child = cnv1;
        //        // Reveist the Bug Id 36624
        //        this.objGrid.Children.Add(myBorder);
        //    }
        //    else 
          // {
               if (this.objGrid.Children)
                   this.objGrid.Children.Add(cnv1);
       // }
        this.objGrid.Width = this.cnvWidth;
        if (this.DisplayTimeLine) {
            this.GetXYPosition(this.cnvWidth);
        }
        if (this.noOfProgressIcon >= 1)
            this.PaintProgressIcon(this.viewModel, cnv1);
        if (this.noOfAlertIcon >= 1)
            this.PaintAlertIcon(this.viewModel, cnv1);
        if (this.noOfIcon >= 1)
            this.PaintConflictIcon(this.viewModel, cnv1);
        this.DrawCellFullLine(this.viewModel, cnv1);
        let posxX: number = 0;
        if (this.viewModel.AdministrationIcon != null) {
            let oImage4: Image = new Image();
            oImage4.Height = 10;
            oImage4.Width = 10;
            if(this.viewModel.LastColum){
                oImage4.TooltipPosition ='left';
            }
            oImage4.Source = new BitmapImage(new Uri(this.viewModel.AdministrationIcon.UriString, UriKind.RelativeOrAbsolute));
            if (this.viewModel.AdministrationIcon.Tooltip != null && !String.IsNullOrEmpty(this.viewModel.AdministrationIcon.Tooltip.ToString()))
                ToolTipService.SetToolTip(oImage4, this.viewModel.AdministrationIcon.Tooltip);
            cnv1.Children.Add(oImage4);
            posxX = this.cnvWidth - (Number(oImage4.Width) + 2);
            //revisit Divya.
            let posyY: number = this.cnvHeight - (oImage4.Height) //this.Chartgrid.ActualHeight - (oImage4.Height + 1);
            if (this.viewModel.HighlightReviewSlot) {
                posyY = posyY - 3;
            }
            oImage4.Margin = new Thickness(posxX, posyY, 0, 0);
        }
        let posY: number = 0;
        if (this.viewModel.HomeLeaveIcon != null) {
            let oImage5: Image = new Image();
            oImage5.Height = 10;
            oImage5.Width = 10;
            if(this.viewModel.LastColum){
                oImage5.TooltipPosition ='left';
            }
            oImage5.Source = new BitmapImage(new Uri(this.viewModel.HomeLeaveIcon.UriString, UriKind.RelativeOrAbsolute));
            if (this.viewModel.HomeLeaveIcon.Tooltip != null && !String.IsNullOrEmpty(this.viewModel.HomeLeaveIcon.Tooltip.ToString()))
                ToolTipService.SetToolTip(oImage5, this.viewModel.HomeLeaveIcon.Tooltip);
            cnv1.Children.Add(oImage5);
            posY = this.cnvHeight - (oImage5.Height); //this.Chartgrid.ActualHeight - (oImage5.Height + 1);
            if (this.viewModel.HighlightReviewSlot) {
                posY = posY - 3;
            }
            oImage5.Margin = new Thickness(0, posY, 0, 0);
        }
    }
    }
    private GetXYPosition(Width: any): void {
        if (this.CInterval <= 60) {
            if (this.CurrentDatetime.Minute == 0)
                this.VposX = 1 * (Width / this.CInterval);
            else this.VposX = this.CurrentDatetime.Minute * (Width / this.CInterval);
        }
        else if (this.StartRange < this.CurrentDatetime.Hour && this.CurrentDatetime.Hour < this.EndRange) {
            this.VposX = (60 + this.CurrentDatetime.Minute) * (Width / this.CInterval);
        }
        else if (this.CurrentDatetime.Hour == this.StartRange && this.CurrentDatetime.Hour < this.EndRange) {
            if (this.CurrentDatetime.Minute == 0)
                this.VposX = 1 * (Width / this.CInterval);
            else this.VposX = this.CurrentDatetime.Minute * (Width / this.CInterval);
        }
    }
    private GetLineFlowDirection(LineDirection: LineFlowDirection, out1: (DrawProgressLineBefore: boolean) => void, out2: (DrawProgressLineAfter: boolean) => void): void {
        let DrawProgressLineBefore: boolean; 
        let DrawProgressLineAfter: boolean; 
         
                DrawProgressLineAfter = false;
                DrawProgressLineBefore = false;
                if (LineDirection == LineFlowDirection.Right)
                    DrawProgressLineAfter = true;
                if (LineDirection == LineFlowDirection.Left)
                    DrawProgressLineBefore = true;
                if (LineDirection == LineFlowDirection.Both) {
                    DrawProgressLineBefore = true;
                    DrawProgressLineAfter = true;
                }
             
        out1(DrawProgressLineBefore); 
        out2(DrawProgressLineAfter); 
         
        }
    private SetStrokeDashArray(objline: Line): Line {
        let dashArr: ObservableCollection<Double> = new ObservableCollection<Double>();
        dashArr.Add(2);
        objline.StrokeDashArray = dashArr;
        return objline;
    }
    PaintProgressIcon(objInCell: InfusionChartCell, cnv1: Canvas): void {
        let posY: number = 0;
        let posX: number = 0;
        let canRowHeight: number = this.cnvHeight / 5;
        if (this.noOfProgressIcon > 0) {
            posY = (canRowHeight / 2 - 7) + (canRowHeight * 2 + 6);
            if (objInCell.HighlightReviewSlot) {
                posY = posY - 2;
            }
            let TextBlockposY: number = posY + 28;  //posY + 14;
            if (this.noOfProgressIcon == 1) {
                this.GetLineFlowDirection(objInCell.ProcessChartIcon[0].LineDirection, (o1) => { this.DrawProgressLineBefore = o1; }, (o2) => { this.DrawProgressLineAfter = o2; });
                let oImage: Image = new Image();
                oImage.Height = 14;
                oImage.Width = 14;
                oImage.Source = new BitmapImage(new Uri(objInCell.ProcessChartIcon[0].UriString, UriKind.RelativeOrAbsolute));
                if(objInCell.LastColum){
                    oImage.TooltipPosition ='left';
                }
                //oImage.Source = new BitmapImage(new Uri("assets/Images/arrow_rightNOR.png", UriKind.RelativeOrAbsolute));
                if (objInCell.ProcessChartIcon[0].IsImageInvisible)
                    oImage.Visibility = Visibility.Collapsed;
                if (objInCell.ProcessChartIcon[0].Tooltip != null && !String.IsNullOrEmpty(objInCell.ProcessChartIcon[0].Tooltip.ToString()))
                    ToolTipService.SetToolTip(oImage, objInCell.ProcessChartIcon[0].Tooltip);
                cnv1.Children.Add(oImage);
                let imgGap: number = (this.cnvWidth - Number(oImage.Width)) / 2;
                posX = imgGap;
                let imgwidth: number = Number(oImage.Width);
                oImage.Margin = new Thickness(posX, posY, 0, 0);
                let FisrtimgposX: number = posX;
                if (!objInCell.ProcessChartIcon[0].IsImageInvisible) {
                    let txtBlk1: TextBlock = new TextBlock();
                    txtBlk1.Text = objInCell.ProcessChartIcon[0].TimeTooltip;
                    txtBlk1.Visibility = Visibility.Visible;
                    txtBlk1.Margin = new Thickness(posX - 5, TextBlockposY, 0, 0); //new Thickness(posX - 10, TextBlockposY, 0, 0);
                    txtBlk1.FontFamily = new FontFamily("Verdana");
                    txtBlk1.FontSize = 10;
                    txtBlk1.Foreground = new SolidColorBrush(Colors.Black);
                    cnv1.Children.Add(txtBlk1);
                }
                if (this.DrawProgressLineBefore) {
                    let ln: Line = null;
                    if (objInCell.ProcessChartIcon[0].IsImageInvisible)
                        ln = this.DrawLine(0, FisrtimgposX + imgwidth, posY + 7, posY + 7, objInCell.ProcessChartIcon[0].LeftLineColor, 2, objInCell.ProcessChartIcon[0].LeftLineType, false);
                    else ln = this.DrawLine(0, FisrtimgposX, posY + 7, posY + 7, objInCell.ProcessChartIcon[0].LeftLineColor, 2, objInCell.ProcessChartIcon[0].LeftLineType, false);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
                if (this.DrawProgressLineAfter) {
                    if (objInCell.ProcessChartIcon[0].IsImageInvisible)
                        imgwidth = 0;
                    let ln: Line = this.DrawLine(FisrtimgposX + imgwidth, this.cnvWidth, posY + 7, posY + 7, objInCell.ProcessChartIcon[0].RightLineColor, 2, objInCell.ProcessChartIcon[0].RightLineType, objInCell.ProcessChartIcon[0].StopAtTimeline);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
            }
            if (this.noOfProgressIcon == 2) {
                let oImage: Image = new Image();
                oImage.Height = 14;
                oImage.Width = 14;
                if(objInCell.LastColum){
                    oImage.TooltipPosition ='left';
                }
                oImage.Source = new BitmapImage(new Uri(objInCell.ProcessChartIcon[0].UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.ProcessChartIcon[0].IsImageInvisible)
                    oImage.Visibility = Visibility.Collapsed;
                if (objInCell.ProcessChartIcon[0].Tooltip != null && !String.IsNullOrEmpty(objInCell.ProcessChartIcon[0].Tooltip.ToString()))
                    ToolTipService.SetToolTip(oImage, objInCell.ProcessChartIcon[0].Tooltip);
                cnv1.Children.Add(oImage);
                let imgGap: number = (this.cnvWidth - (Number(oImage.Width) * 2)) / 3;
                let imgwidth: number;
                imgwidth = Number(oImage.Width);
                posX = imgGap;
                let FisrtimgposX: number, SecondimageX;
                FisrtimgposX = posX;
                SecondimageX = (imgGap * 2) + Number(oImage.Width);
                oImage.Margin = new Thickness(posX, posY, 0, 0);
                let posxB4Line: number = posX;
                if (!objInCell.ProcessChartIcon[0].IsImageInvisible) {
                    let txtBlk1: TextBlock = new TextBlock();
                    txtBlk1.Text = objInCell.ProcessChartIcon[0].TimeTooltip;
                    txtBlk1.Visibility = Visibility.Visible;
                    txtBlk1.Margin = new Thickness(posX - 5, TextBlockposY, 0, 0);
                    txtBlk1.FontFamily = new FontFamily("Verdana");
                    txtBlk1.FontSize = 10;
                    txtBlk1.Foreground = new SolidColorBrush(Colors.Black);
                    cnv1.Children.Add(txtBlk1);
                }
                this.GetLineFlowDirection(objInCell.ProcessChartIcon[0].LineDirection, (o1) => { this.DrawProgressLineBefore = o1; }, (o2) => { this.DrawProgressLineAfter = o2; });
                if (this.DrawProgressLineBefore) {
                    let posY1: number = (canRowHeight / 2) + (canRowHeight * 2);
                    let ln: Line = null;
                    if (objInCell.ProcessChartIcon[0].IsImageInvisible)
                        ln = this.DrawLine(0, FisrtimgposX + imgwidth, posY + 7, posY + 7, objInCell.ProcessChartIcon[0].LeftLineColor, 2, objInCell.ProcessChartIcon[0].LeftLineType, false);
                    else ln = this.DrawLine(0, FisrtimgposX, posY + 7, posY + 7, objInCell.ProcessChartIcon[0].LeftLineColor, 2, objInCell.ProcessChartIcon[0].LeftLineType, false);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
                if (this.DrawProgressLineAfter) {
                    if (objInCell.ProcessChartIcon[0].IsImageInvisible)
                        imgwidth = 0;
                    let ln: Line = this.DrawLine(FisrtimgposX + imgwidth, SecondimageX, posY + 7, posY + 7, objInCell.ProcessChartIcon[0].RightLineColor, 2, objInCell.ProcessChartIcon[0].RightLineType, objInCell.ProcessChartIcon[0].StopAtTimeline);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
                let oImage2: Image = new Image();
                oImage2.Height = 14;
                oImage2.Width = 14;
                if(objInCell.LastColum){
                    oImage2.TooltipPosition ='left';
                }
                if (objInCell.ProcessChartIcon[1].IsImageInvisible)
                    oImage2.Visibility = Visibility.Collapsed;
                oImage2.Source = new BitmapImage(new Uri(objInCell.ProcessChartIcon[1].UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.ProcessChartIcon[1].Tooltip != null && !String.IsNullOrEmpty(objInCell.ProcessChartIcon[1].Tooltip.ToString()))
                    ToolTipService.SetToolTip(oImage2, objInCell.ProcessChartIcon[1].Tooltip);
                cnv1.Children.Add(oImage2);
                posX = (imgGap * 2) + Number(oImage2.Width);
                imgwidth = Number(oImage2.Width);
                oImage2.Margin = new Thickness(posX, posY, 0, 0);
                SecondimageX = posX;
                let posxAfterLine: number = posX;
                if (!objInCell.ProcessChartIcon[1].IsImageInvisible) {
                    let txtBlk2: TextBlock = new TextBlock();
                    txtBlk2.Text = objInCell.ProcessChartIcon[1].TimeTooltip;
                    txtBlk2.Visibility = Visibility.Visible;
                    txtBlk2.Margin = new Thickness(posX - 6, TextBlockposY, 0, 0);
                    txtBlk2.FontFamily = new FontFamily("Verdana");
                    txtBlk2.FontSize = 10;
                    txtBlk2.Foreground = new SolidColorBrush(Colors.Black);
                    cnv1.Children.Add(txtBlk2);
                }
                this.GetLineFlowDirection(objInCell.ProcessChartIcon[1].LineDirection, (o1) => { this.DrawProgressLineBefore = o1; }, (o2) => { this.DrawProgressLineAfter = o2; });
                if (this.DrawProgressLineBefore) {
                    if (objInCell.ProcessChartIcon[1].IsImageInvisible && objInCell.ProcessChartIcon[1].LineDirection != LineFlowDirection.Both)
                        imgwidth = 0;
                    let ln: Line = this.DrawLine(FisrtimgposX + imgwidth, SecondimageX, posY + 7, posY + 7, objInCell.ProcessChartIcon[1].LeftLineColor, 2, objInCell.ProcessChartIcon[1].LeftLineType, false);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
                if (this.DrawProgressLineAfter) {
                    if (objInCell.ProcessChartIcon[1].IsImageInvisible)
                        imgwidth = 0;
                    let ln: Line = this.DrawLine(SecondimageX + imgwidth, this.cnvWidth, posY + 7, posY + 7, objInCell.ProcessChartIcon[1].RightLineColor, 2, objInCell.ProcessChartIcon[1].RightLineType, objInCell.ProcessChartIcon[1].StopAtTimeline);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
            }
            if (this.noOfProgressIcon == 3) {
                let FirstImgX: number, SecondImgX, ThirdImgX;
                let imgwidth: number;
                let oImage: Image = new Image();
                oImage.Height = 14;
                oImage.Width = 14;
                if(objInCell.LastColum){
                    oImage.TooltipPosition ='left';
                }
                oImage.Source = new BitmapImage(new Uri(objInCell.ProcessChartIcon[0].UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.ProcessChartIcon[0].IsImageInvisible)
                    oImage.Visibility = Visibility.Collapsed;
                if (objInCell.ProcessChartIcon[0].Tooltip != null && !String.IsNullOrEmpty(objInCell.ProcessChartIcon[0].Tooltip.ToString()))
                    ToolTipService.SetToolTip(oImage, objInCell.ProcessChartIcon[0].Tooltip);
                cnv1.Children.Add(oImage);
                let oImage2: Image = new Image();
                oImage2.Height = 14;
                oImage2.Width = 14;
                if(objInCell.LastColum){
                    oImage2.TooltipPosition ='left';
                }
                oImage2.Source = new BitmapImage(new Uri(objInCell.ProcessChartIcon[1].UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.ProcessChartIcon[1].IsImageInvisible)
                    oImage2.Visibility = Visibility.Collapsed;
                if (objInCell.ProcessChartIcon[1].Tooltip != null && !String.IsNullOrEmpty(objInCell.ProcessChartIcon[1].Tooltip.ToString()))
                    ToolTipService.SetToolTip(oImage2, objInCell.ProcessChartIcon[1].Tooltip);
                cnv1.Children.Add(oImage2);
                let oImage3: Image = new Image();
                oImage3.Height = 14;
                oImage3.Width = 14;
                if(objInCell.LastColum){
                    oImage3.TooltipPosition ='left';
                }
                oImage3.Source = new BitmapImage(new Uri(objInCell.ProcessChartIcon[2].UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.ProcessChartIcon[2].IsImageInvisible)
                    oImage3.Visibility = Visibility.Collapsed;
                if (objInCell.ProcessChartIcon[2].Tooltip != null && !String.IsNullOrEmpty(objInCell.ProcessChartIcon[2].Tooltip.ToString()))
                    ToolTipService.SetToolTip(oImage3, objInCell.ProcessChartIcon[2].Tooltip);
                cnv1.Children.Add(oImage3);
                let imgGap: number = (this.cnvWidth - (Number(oImage.Width) * 3)) / 4;
                imgwidth = Number(oImage.Width);
                posX = imgGap;
                oImage.Margin = new Thickness(posX, posY, 0, 0);
                FirstImgX = posX;
                let posxB4Line: number = posX;
                posX = (imgGap * 2) + Number(oImage.Width);
                oImage2.Margin = new Thickness(posX, posY, 0, 0);
                SecondImgX = posX;
                this.GetLineFlowDirection(objInCell.ProcessChartIcon[0].LineDirection, (o1) => { this.DrawProgressLineBefore = o1; }, (o2) => { this.DrawProgressLineAfter = o2; });
                if (this.DrawProgressLineBefore) {
                    let ln: Line = this.DrawLine(0, FirstImgX, posY + 7, posY + 7, objInCell.ProcessChartIcon[0].LeftLineColor, 2, objInCell.ProcessChartIcon[0].LeftLineType, false);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
                if (this.DrawProgressLineAfter) {
                    if (objInCell.ProcessChartIcon[0].IsImageInvisible)
                        imgwidth = 0;
                    else imgwidth = Number(oImage.Width);
                    let ln: Line = this.DrawLine(FirstImgX + imgwidth, SecondImgX, posY + 7, posY + 7, objInCell.ProcessChartIcon[0].RightLineColor, 2, objInCell.ProcessChartIcon[0].RightLineType, objInCell.ProcessChartIcon[0].StopAtTimeline);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
                posX = (imgGap * 3) + (Number(oImage.Width) * 2);
                oImage3.Margin = new Thickness(posX, posY, 0, 0);
                ThirdImgX = posX;
                let posxAfterLine: number = posX;
                this.GetLineFlowDirection(objInCell.ProcessChartIcon[1].LineDirection, (o1) => { this.DrawProgressLineBefore = o1; }, (o2) => { this.DrawProgressLineAfter = o2; });
                if (this.DrawProgressLineBefore) {
                    if (objInCell.ProcessChartIcon[1].IsImageInvisible && objInCell.ProcessChartIcon[1].LineDirection != LineFlowDirection.Both)
                        imgwidth = 0;
                    else imgwidth = Number(oImage.Width);
                    let ln: Line = this.DrawLine(FirstImgX + imgwidth, SecondImgX, posY + 7, posY + 7, objInCell.ProcessChartIcon[1].LeftLineColor, 2, objInCell.ProcessChartIcon[1].LeftLineType, false);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
                if (this.DrawProgressLineAfter) {
                    if (objInCell.ProcessChartIcon[1].IsImageInvisible)
                        imgwidth = 0;
                    else imgwidth = Number(oImage2.Width);
                    let ln: Line = this.DrawLine(SecondImgX + imgwidth, ThirdImgX, posY + 7, posY + 7, objInCell.ProcessChartIcon[1].RightLineColor, 2, objInCell.ProcessChartIcon[1].RightLineType, objInCell.ProcessChartIcon[1].StopAtTimeline);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
                this.GetLineFlowDirection(objInCell.ProcessChartIcon[2].LineDirection, (o1) => { this.DrawProgressLineBefore = o1; }, (o2) => { this.DrawProgressLineAfter = o2; });
                if (this.DrawProgressLineBefore) {
                    if (objInCell.ProcessChartIcon[2].IsImageInvisible && objInCell.ProcessChartIcon[2].LineDirection != LineFlowDirection.Both)
                        imgwidth = 0;
                    else imgwidth = Number(oImage2.Width);
                    let ln: Line = this.DrawLine(SecondImgX + 14, ThirdImgX, posY + 7, posY + 7, objInCell.ProcessChartIcon[2].LeftLineColor, 2, objInCell.ProcessChartIcon[2].LeftLineType, false);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
                if (this.DrawProgressLineAfter) {
                    if (objInCell.ProcessChartIcon[2].IsImageInvisible)
                        imgwidth = 0;
                    else imgwidth = Number(oImage3.Width);
                    let ln: Line = this.DrawLine(ThirdImgX + imgwidth, this.cnvWidth, posY + 7, posY + 7, objInCell.ProcessChartIcon[2].RightLineColor, 2, objInCell.ProcessChartIcon[2].RightLineType, objInCell.ProcessChartIcon[2].StopAtTimeline);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
            }
            if (this.noOfProgressIcon == 4) {
                let FirstImgX: number, SecondImgX, ThirdImgX, ForthImgX;
                let imgwidth: number;
                let ln1: Line = new Line();
                ln1.Stroke = new SolidColorBrush(Colors.Grey);
                ln1.StrokeThickness = 2;
                cnv1.Children.Add(ln1);
                let ln2: Line = new Line();
                ln2.Stroke = new SolidColorBrush(Colors.Green);
                ln2.StrokeThickness = 2;
                cnv1.Children.Add(ln2);
                let ln3: Line = new Line();
                ln3.Stroke = new SolidColorBrush(Colors.Blue);
                ln3.StrokeThickness = 2;
                cnv1.Children.Add(ln3);
                let oImage: Image = new Image();
                oImage.Height = 14;
                oImage.Width = 14;
                if(objInCell.LastColum){
                    oImage.TooltipPosition ='left';
                }
                oImage.Source = new BitmapImage(new Uri(objInCell.ProcessChartIcon[0].UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.ProcessChartIcon[0].IsImageInvisible)
                    oImage.Visibility = Visibility.Collapsed;
                if (objInCell.ProcessChartIcon[0].Tooltip != null && !String.IsNullOrEmpty(objInCell.ProcessChartIcon[0].Tooltip.ToString()))
                    ToolTipService.SetToolTip(oImage, objInCell.ProcessChartIcon[0].Tooltip);
                cnv1.Children.Add(oImage);
                let oImage2: Image = new Image();
                oImage2.Height = 14;
                oImage2.Width = 14;
                if(objInCell.LastColum){
                    oImage2.TooltipPosition ='left';
                }
                oImage2.Source = new BitmapImage(new Uri(objInCell.ProcessChartIcon[1].UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.ProcessChartIcon[1].IsImageInvisible)
                    oImage2.Visibility = Visibility.Collapsed;
                if (objInCell.ProcessChartIcon[1].Tooltip != null && !String.IsNullOrEmpty(objInCell.ProcessChartIcon[1].Tooltip.ToString()))
                    ToolTipService.SetToolTip(oImage2, objInCell.ProcessChartIcon[1].Tooltip);
                cnv1.Children.Add(oImage2);
                let oImage3: Image = new Image();
                oImage3.Height = 14;
                oImage3.Width = 14;
                if(objInCell.LastColum){
                    oImage3.TooltipPosition ='left';
                }
                oImage3.Source = new BitmapImage(new Uri(objInCell.ProcessChartIcon[2].UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.ProcessChartIcon[2].IsImageInvisible)
                    oImage3.Visibility = Visibility.Collapsed;
                if (objInCell.ProcessChartIcon[2].Tooltip != null && !String.IsNullOrEmpty(objInCell.ProcessChartIcon[2].Tooltip.ToString()))
                    ToolTipService.SetToolTip(oImage3, objInCell.ProcessChartIcon[2].Tooltip);
                cnv1.Children.Add(oImage3);
                let oImage4: Image = new Image();
                oImage4.Height = 14;
                oImage4.Width = 14;
                if(objInCell.LastColum){
                    oImage4.TooltipPosition ='left';
                }
                oImage4.Source = new BitmapImage(new Uri(objInCell.ProcessChartIcon[3].UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.ProcessChartIcon[3].IsImageInvisible)
                    oImage4.Visibility = Visibility.Collapsed;
                if (objInCell.ProcessChartIcon[3].Tooltip != null && !String.IsNullOrEmpty(objInCell.ProcessChartIcon[3].Tooltip.ToString()))
                    ToolTipService.SetToolTip(oImage4, objInCell.ProcessChartIcon[3].Tooltip);
                cnv1.Children.Add(oImage4);
                let imgGap: number = (this.cnvWidth - (Number(oImage4.Width) * 4)) / 5;
                posX = imgGap;
                oImage.Margin = new Thickness(posX, posY, 0, 0);
                FirstImgX = posX;
                let posxB4Line: number = posX;
                ln1.X1 = posX + 14;
                ln1.Y1 = posY + 7;
                posX = (imgGap * 2) + Number(oImage4.Width);
                oImage2.Margin = new Thickness(posX, posY, 0, 0);
                SecondImgX = posX;
                ln1.X2 = posX;
                ln1.Y2 = posY + 7;
                this.GetLineFlowDirection(objInCell.ProcessChartIcon[0].LineDirection, (o1) => { this.DrawProgressLineBefore = o1; }, (o2) => { this.DrawProgressLineAfter = o2; });
                if (this.DrawProgressLineBefore) {
                    let ln: Line = this.DrawLine(0, FirstImgX, posY + 7, posY + 7, objInCell.ProcessChartIcon[0].LeftLineColor, 2, objInCell.ProcessChartIcon[0].LeftLineType, false);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
                if (this.DrawProgressLineAfter) {
                    if (objInCell.ProcessChartIcon[0].IsImageInvisible)
                        imgwidth = 0;
                    else imgwidth = Number(oImage.Width);
                    let ln: Line = this.DrawLine(FirstImgX + imgwidth, SecondImgX, posY + 7, posY + 7, objInCell.ProcessChartIcon[0].RightLineColor, 2, objInCell.ProcessChartIcon[0].RightLineType, objInCell.ProcessChartIcon[0].StopAtTimeline);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
                ln2.X1 = posX + 14;
                ln2.Y1 = posY + 7;
                posX = (imgGap * 3) + (Number(oImage4.Width) * 2);
                oImage3.Margin = new Thickness(posX, posY, 0, 0);
                ThirdImgX = posX;
                this.GetLineFlowDirection(objInCell.ProcessChartIcon[1].LineDirection, (o1) => { this.DrawProgressLineBefore = o1; }, (o2) => { this.DrawProgressLineAfter = o2; });
                if (this.DrawProgressLineBefore) {
                    if (objInCell.ProcessChartIcon[1].IsImageInvisible && objInCell.ProcessChartIcon[1].LineDirection != LineFlowDirection.Both)
                        imgwidth = 0;
                    else imgwidth = Number(oImage.Width);
                    let ln: Line = this.DrawLine(FirstImgX + imgwidth, SecondImgX, posY + 7, posY + 7, objInCell.ProcessChartIcon[1].LeftLineColor, 2, objInCell.ProcessChartIcon[1].LeftLineType, false);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
                if (this.DrawProgressLineAfter) {
                    if (objInCell.ProcessChartIcon[1].IsImageInvisible)
                        imgwidth = 0;
                    else imgwidth = Number(oImage2.Width);
                    let ln: Line = this.DrawLine(SecondImgX + imgwidth, ThirdImgX, posY + 7, posY + 7, objInCell.ProcessChartIcon[1].RightLineColor, 2, objInCell.ProcessChartIcon[1].RightLineType, objInCell.ProcessChartIcon[1].StopAtTimeline);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
                ln2.X2 = posX;
                ln2.Y2 = posY + 7;
                ln3.X1 = posX + 14;
                ln3.Y1 = posY + 7;
                posX = (imgGap * 4) + (Number(oImage4.Width) * 3);
                oImage4.Margin = new Thickness(posX, posY, 0, 0);
                ForthImgX = posX;
                this.GetLineFlowDirection(objInCell.ProcessChartIcon[2].LineDirection, (o1) => { this.DrawProgressLineBefore = o1; }, (o2) => { this.DrawProgressLineAfter = o2; });
                if (this.DrawProgressLineBefore) {
                    if (objInCell.ProcessChartIcon[2].IsImageInvisible && objInCell.ProcessChartIcon[2].LineDirection != LineFlowDirection.Both)
                        imgwidth = 0;
                    else imgwidth = Number(oImage2.Width);
                    let ln: Line = this.DrawLine(SecondImgX + imgwidth, ThirdImgX, posY + 7, posY + 7, objInCell.ProcessChartIcon[2].LeftLineColor, 2, objInCell.ProcessChartIcon[2].LeftLineType, false);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
                if (this.DrawProgressLineAfter) {
                    if (objInCell.ProcessChartIcon[2].IsImageInvisible)
                        imgwidth = 0;
                    else imgwidth = Number(oImage3.Width);
                    let ln: Line = this.DrawLine(ThirdImgX + imgwidth, ForthImgX, posY + 7, posY + 7, objInCell.ProcessChartIcon[2].RightLineColor, 2, objInCell.ProcessChartIcon[2].RightLineType, objInCell.ProcessChartIcon[2].StopAtTimeline);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
                let posxAfterLine: number = posX;
                ln3.X2 = posX;
                ln3.Y2 = posY + 7;
                this.GetLineFlowDirection(objInCell.ProcessChartIcon[3].LineDirection, (o1) => { this.DrawProgressLineBefore = o1; }, (o2) => { this.DrawProgressLineAfter = o2; });
                if (this.DrawProgressLineBefore) {
                    if (objInCell.ProcessChartIcon[3].IsImageInvisible && objInCell.ProcessChartIcon[3].LineDirection != LineFlowDirection.Both)
                        imgwidth = 0;
                    else imgwidth = Number(oImage3.Width);
                    let ln: Line = this.DrawLine(ThirdImgX + imgwidth, ForthImgX, posY + 7, posY + 7, objInCell.ProcessChartIcon[3].LeftLineColor, 2, objInCell.ProcessChartIcon[3].LeftLineType, false);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
                if (this.DrawProgressLineAfter) {
                    if (objInCell.ProcessChartIcon[3].IsImageInvisible)
                        imgwidth = 0;
                    else imgwidth = Number(oImage4.Width);
                    let ln: Line = this.DrawLine(ForthImgX + imgwidth, this.cnvWidth, posY + 7, posY + 7, objInCell.ProcessChartIcon[3].RightLineColor, 2, objInCell.ProcessChartIcon[3].RightLineType, objInCell.ProcessChartIcon[3].StopAtTimeline);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
            }
            if (this.noOfProgressIcon > 4) {
                let FirstImgX: number, SecondImgX, ThirdImgX;
                let imgwidth: number;
                let oImage: Image = new Image();
                oImage.Height = 14;
                oImage.Width = 14;
                if(objInCell.LastColum){
                    oImage.TooltipPosition ='left';
                }
                oImage.Source = new BitmapImage(new Uri(objInCell.ProcessChartIcon[0].UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.ProcessChartIcon[0].IsImageInvisible)
                    oImage.Visibility = Visibility.Collapsed;
                if (objInCell.ProcessChartIcon[0].Tooltip != null && !String.IsNullOrEmpty(objInCell.ProcessChartIcon[0].Tooltip.ToString()))
                
                    ToolTipService.SetToolTip(oImage, objInCell.ProcessChartIcon[0].Tooltip);
                cnv1.Children.Add(oImage);
                let oImage2: Image = new Image();
                oImage2.Height = 14;
                oImage2.Width = 14;
                if(objInCell.LastColum){
                    oImage2.TooltipPosition ='left';
                }
                oImage2.Source = new BitmapImage(new Uri(objInCell.MultiActuionIcon.UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.MultiActuionIcon.Tooltip != null && !String.IsNullOrEmpty(objInCell.MultiActuionIcon.Tooltip.ToString()))
                    ToolTipService.SetToolTip(oImage2, this.setTooltipForMultipleIcons(objInCell.MultiActuionIcon.Tooltip));
                else {
                    let sTooltip: string = String.Empty;
                    for (let i: number = 0; i < objInCell.ProcessChartIcon.Count; i++) {
                        if (objInCell.ProcessChartIcon[i].Tooltip != null && !String.IsNullOrEmpty(objInCell.ProcessChartIcon[i].Tooltip.ToString())) {
                            sTooltip = sTooltip + objInCell.ProcessChartIcon[i].Tooltip + Environment.NewLine; 
                        }
                    }
                    if (sTooltip != null && !String.IsNullOrEmpty(sTooltip))
                        ToolTipService.SetToolTip(oImage2, sTooltip);
                }
                cnv1.Children.Add(oImage2);
                let ncnt: number = this.noOfProgressIcon - 1;
                let oImage3: Image = new Image();
                oImage3.Height = 14;
                oImage3.Width = 14;
                if(objInCell.LastColum){
                    oImage3.TooltipPosition ='left';
                }
                oImage3.Source = new BitmapImage(new Uri(objInCell.ProcessChartIcon[ncnt].UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.ProcessChartIcon[ncnt].Tooltip != null && !String.IsNullOrEmpty(objInCell.ProcessChartIcon[ncnt].Tooltip.ToString()))
                    ToolTipService.SetToolTip(oImage3, objInCell.ProcessChartIcon[ncnt].Tooltip);
                cnv1.Children.Add(oImage3);
                let imgGap: number = (this.cnvWidth - (Number(oImage.Width) * 3)) / 4;
                imgwidth = Number(oImage.Width);
                posX = imgGap;
                oImage.Margin = new Thickness(posX, posY, 0, 0);
                FirstImgX = posX;
                let posxB4Line: number = posX;
                posX = (imgGap * 2) + Number(oImage.Width);
                oImage2.Margin = new Thickness(posX, posY, 0, 0);
                SecondImgX = posX;
                this.GetLineFlowDirection(objInCell.ProcessChartIcon[0].LineDirection, (o1) => { this.DrawProgressLineBefore = o1; }, (o2) => { this.DrawProgressLineAfter = o2; });
                if (this.DrawProgressLineBefore) {
                    let ln: Line = this.DrawLine(0, FirstImgX, posY + 7, posY + 7, objInCell.ProcessChartIcon[0].LeftLineColor, 2, objInCell.ProcessChartIcon[0].LeftLineType, false);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
                imgwidth = Number(oImage.Width);
                let ln1: Line = this.DrawLine(FirstImgX + imgwidth, SecondImgX, posY + 7, posY + 7, new SolidColorBrush(Colors.Green), 2, InfusionProcessIcon.LineTypes.Continuous, objInCell.ProcessChartIcon[0].StopAtTimeline);
                if (ln1 != null)
                    cnv1.Children.Add(ln1);
                posX = (imgGap * 3) + (Number(oImage.Width) * 2);
                oImage3.Margin = new Thickness(posX, posY, 0, 0);
                ThirdImgX = posX;
                let posxAfterLine: number = posX;
                imgwidth = Number(oImage2.Width);
                let ln2: Line = this.DrawLine(SecondImgX + imgwidth, ThirdImgX, posY + 7, posY + 7, new SolidColorBrush(Colors.Green), 2, InfusionProcessIcon.LineTypes.Continuous, false);
                if (ln2 != null)
                    cnv1.Children.Add(ln2);
                this.GetLineFlowDirection(objInCell.ProcessChartIcon[ncnt].LineDirection, (o1) => { this.DrawProgressLineBefore = o1; }, (o2) => { this.DrawProgressLineAfter = o2; });
                imgwidth = Number(oImage2.Width);
                let ln3: Line = this.DrawLine(SecondImgX + 14, ThirdImgX, posY + 7, posY + 7, new SolidColorBrush(Colors.Green), 2, InfusionProcessIcon.LineTypes.Continuous, false);
                if (ln3 != null)
                    cnv1.Children.Add(ln3);
                if (this.DrawProgressLineAfter) {
                    imgwidth = Number(oImage3.Width);
                    let ln: Line = this.DrawLine(ThirdImgX + imgwidth, this.cnvWidth, posY + 7, posY + 7, objInCell.ProcessChartIcon[ncnt].RightLineColor, 2, objInCell.ProcessChartIcon[ncnt].RightLineType, objInCell.ProcessChartIcon[ncnt].StopAtTimeline);
                    if (ln != null)
                        cnv1.Children.Add(ln);
                }
            }
        }
    }
    private DrawLine(x1: number, x2: number, y1: number, y2: number, slBrush: SolidColorBrush, Thickness: number, lType: InfusionProcessIcon.LineTypes, StopAtTimeLine: boolean): Line {
        if (lType == InfusionProcessIcon.LineTypes.None)
            return null;
        let ln: Line = new Line();
        ln.X1 = x1;
        if (StopAtTimeLine) {
            if (this.noOfProgressIcon == 1) {
                if (this.VposX <= x2)
                    ln.X2 = x2 - 14;
                else ln.X2 = this.VposX;
            }
            else ln.X2 = x2;
        }
        else {
            ln.X2 = x2;
        }
        ln.Y1 = y1;
        ln.Y2 = y2;
        ln.lType = lType; //dotted handled in line component
        // if (lType == InfusionProcessIcon.LineTypes.Dotted) {
        //    ln = this.SetStrokeDashArray(ln);
          
        // }
        ln.Stroke = slBrush;
        ln.StrokeThickness = Thickness;
        return ln;
    }
    DrawCellFullLine(objInCell: InfusionChartCell, cnv1: Canvas): void {
        if (!objInCell.DisplayFullLine)
            return
        let canRowHeight: number = this.cnvHeight / 5;
        let posY1: number = (canRowHeight / 2) + (canRowHeight * 2 + 6);
        if (objInCell.HighlightReviewSlot) {
            posY1 = posY1 - 2;
        }
        let prBefore: Line = this.DrawLine(0, this.cnvWidth, posY1, posY1, objInCell.LineColour, 2, objInCell.LineType, objInCell.StopAtTimeline);
        if (prBefore != null)
            cnv1.Children.Add(prBefore);
    }
    PaintAlertIcon(objInCell: InfusionChartCell, cnv1: Canvas): void {
        let posY: number = 0;
        let posX: number = 0;
        let canRowHeight: number = this.cnvHeight / 5;
        if (this.noOfAlertIcon > 0) {
            posY = canRowHeight / 2 - 7;
            if (this.noOfAlertIcon == 1) {
                let oImage: Image = new Image();
                oImage.Height = 14;
                oImage.Width = 14;
                if(objInCell.LastColum){
                    oImage.TooltipPosition ='left';
                }
                oImage.Source = new BitmapImage(new Uri(objInCell.AlertIcons[0].UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.AlertIcons[0].Tooltip != null && !String.IsNullOrEmpty(objInCell.AlertIcons[0].Tooltip.ToString()))
                    ToolTipService.SetToolTip(oImage, objInCell.AlertIcons[0].Tooltip);
                cnv1.Children.Add(oImage);
                posX = this.cnvWidth - (Number(oImage.Width) +6);
                oImage.Margin = new Thickness(posX, posY, 0, 0);
            }
            if (this.noOfAlertIcon == 2) {
                let oImage: Image = new Image();
                oImage.Height = 14;
                oImage.Width = 14;
                if(objInCell.LastColum){
                    oImage.TooltipPosition ='left';
                }
                oImage.Source = new BitmapImage(new Uri(objInCell.AlertIcons[0].UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.AlertIcons[0].Tooltip != null && !String.IsNullOrEmpty(objInCell.AlertIcons[0].Tooltip.ToString()))
                    ToolTipService.SetToolTip(oImage, objInCell.AlertIcons[0].Tooltip);
                cnv1.Children.Add(oImage);
                posX = this.cnvWidth - (Number(oImage.Width) + 6);
                oImage.Margin = new Thickness(posX, posY, 0, 0);
                let oImage1: Image = new Image();
                oImage1.Height = 14;
                oImage1.Width = 14;
                if(objInCell.LastColum){
                    oImage1.TooltipPosition ='left';
                }
                oImage1.Source = new BitmapImage(new Uri(objInCell.AlertIcons[1].UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.AlertIcons[1].Tooltip != null && !String.IsNullOrEmpty(objInCell.AlertIcons[1].Tooltip.ToString()))
                    ToolTipService.SetToolTip(oImage1,objInCell.AlertIcons[1].Tooltip);
                cnv1.Children.Add(oImage1);
                posX = this.cnvWidth - ((Number(oImage.Width) * 2) + 8);
                oImage1.Margin = new Thickness(posX, posY, 0, 0);
            }
            if (this.noOfAlertIcon == 3) {
                let oImage: Image = new Image();
                oImage.Height = 14;
                oImage.Width = 14;
                if(objInCell.LastColum){
                    oImage.TooltipPosition ='left';
                }
                oImage.Source = new BitmapImage(new Uri(objInCell.AlertIcons[0].UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.AlertIcons[0].Tooltip != null && !String.IsNullOrEmpty(objInCell.AlertIcons[0].Tooltip.ToString()))
                    ToolTipService.SetToolTip(oImage, objInCell.AlertIcons[0].Tooltip);
                cnv1.Children.Add(oImage);
                posX = this.cnvWidth - (Number(oImage.Width) + 6);
                oImage.Margin = new Thickness(posX, posY, 0, 0);
                let oImage1: Image = new Image();
                oImage1.Height = 14;
                oImage1.Width = 14;
                if(objInCell.LastColum){
                    oImage1.TooltipPosition ='left';
                }
                oImage1.Source = new BitmapImage(new Uri(objInCell.AlertIcons[1].UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.AlertIcons[1].Tooltip != null && !String.IsNullOrEmpty(objInCell.AlertIcons[1].Tooltip.ToString()))
                    ToolTipService.SetToolTip(oImage1, objInCell.AlertIcons[1].Tooltip);
                cnv1.Children.Add(oImage1);
                posX = this.cnvWidth - ((Number(oImage.Width) * 2) + 8);
                oImage1.Margin = new Thickness(posX, posY, 0, 0);
                let oImage2: Image = new Image();
                oImage2.Height = 14;
                oImage2.Width = 14;
                if(objInCell.LastColum){
                    oImage2.TooltipPosition ='left';
                }
                oImage2.Source = new BitmapImage(new Uri(objInCell.AlertIcons[2].UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.AlertIcons[2].Tooltip != null && !String.IsNullOrEmpty(objInCell.AlertIcons[2].Tooltip.ToString()))
                    ToolTipService.SetToolTip(oImage2, objInCell.AlertIcons[2].Tooltip);
                cnv1.Children.Add(oImage2);
                posX = this.cnvWidth - ((Number(oImage.Width) * 3) + 10);
                oImage2.Margin = new Thickness(posX, posY, 0, 0);
            }
        }
    }
    PaintConflictIcon(objInCell: InfusionChartCell, cnv1: Canvas): void {
        let posY: number = 0;
        let posX: number = 0;
        let canRowHeight: number = this.cnvHeight / 5;
        if (this.noOfIcon > 0) {
            posY = (canRowHeight / 2 - 7) + (canRowHeight+2);// removed+4 (canRowHeight + 4)
            if (this.noOfIcon == 1) {
                let oImage: Image = new Image();
                oImage.Height = 14;
                oImage.Width = 14;
                if(objInCell.LastColum){
                    oImage.TooltipPosition ='left';
                }
                oImage.Source = new BitmapImage(new Uri(objInCell.InfusionIcons[0].UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.InfusionIcons[0].Tooltip != null && !String.IsNullOrEmpty(objInCell.InfusionIcons[0].Tooltip.ToString())) {
                    ToolTipService.SetToolTip(oImage, objInCell.InfusionIcons[0].Tooltip);
                    oImage.TooltipPosition = 'left';
                }
                cnv1.Children.Add(oImage);
                if (this.InfusionBagAlign == ImageAlignment.Left || this.InfusionBagAlign == ImageAlignment.None || this.InfusionBagAlign == ImageAlignment.Right) {
                    posX = 2;
                }
                else if (this.InfusionBagAlign == ImageAlignment.Center) {
                    let imgGap: number = (this.cnvWidth - Number(oImage.Width)) / 2;
                    posX = imgGap;
                }
                oImage.Margin = new Thickness(posX, posY, 0, 0);
            }
            if (this.noOfIcon == 2) {
                let oImage: Image = new Image();
                oImage.Height = 14;
                oImage.Width = 14;
                oImage.Source = new BitmapImage(new Uri(objInCell.InfusionIcons[0].UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.InfusionIcons[0].Tooltip != null && !String.IsNullOrEmpty(objInCell.InfusionIcons[0].Tooltip.ToString())) {
                    ToolTipService.SetToolTip(oImage,objInCell.InfusionIcons[0].Tooltip);
                    oImage.TooltipPosition = 'left';
                }
                if(objInCell.LastColum){
                    oImage.TooltipPosition ='left';
                }
                cnv1.Children.Add(oImage);
                if (this.InfusionBagAlign == ImageAlignment.Left || this.InfusionBagAlign == ImageAlignment.None || this.InfusionBagAlign == ImageAlignment.Right) {
                    posX = posX + 2;
                }
                else if (this.InfusionBagAlign == ImageAlignment.Center) {
                    let imgGap: number = (this.cnvWidth - (Number(oImage.Width) * 2)) / 2;
                    posX = imgGap;
                }
                oImage.Margin = new Thickness(posX, posY, 0, 0);
                let oImage1: Image = new Image();
                oImage1.Height = 14;
                oImage1.Width = 14;
                if(objInCell.LastColum){
                    oImage1.TooltipPosition ='left';
                }
                oImage1.Source = new BitmapImage(new Uri(objInCell.InfusionIcons[1].UriString, UriKind.RelativeOrAbsolute));
                if (objInCell.InfusionIcons[1].Tooltip != null && !String.IsNullOrEmpty(objInCell.InfusionIcons[1].Tooltip.ToString())) {
                    ToolTipService.SetToolTip(oImage1, objInCell.InfusionIcons[1].Tooltip);
                      oImage1.TooltipPosition = 'left';
                }
                cnv1.Children.Add(oImage1);
                if (this.InfusionBagAlign == ImageAlignment.Left || this.InfusionBagAlign == ImageAlignment.None || this.InfusionBagAlign == ImageAlignment.Right) {
                    posX = posX + (Number(oImage.Width) + 2);
                }
                else if (this.InfusionBagAlign == ImageAlignment.Center) {
                    posX = posX + (Number(oImage.Width) + 2);
                }
                oImage1.Margin = new Thickness(posX, posY, 0, 0);
            }
        }
    }
    PaintCurrentTimeLine(cnv1: Canvas): void {
        if (this.DisplayTimeLine) {
            let Vline: Line = new Line();
            Vline.StrokeThickness = 1;
            Vline.Stroke = new SolidColorBrush(Color.FromArgb(255, 255, 114, 0));
            Vline.X1 = this.VposX;
            Vline.Y1 = 0;
            Vline.X2 = this.VposX;
            Vline.Y2 = cnv1.Height;
            cnv1.Children.Add(Vline);
        }
    }

setToolTip(s){
    let sToolTip: string = String.Empty;
    if (typeof s === "string") {
        sToolTip = ObjectHelper.CreateType<string>(s, String);
    }
    else if (s instanceof iLabel) {
        let objLabel: iLabel = ObjectHelper.CreateType<iLabel>(s, iLabel);
        sToolTip = objLabel.Text;
    }
    return sToolTip;
}


    setTooltipForMultipleIcons(strTempTooltip) {
        let strArray: string[] = null;
        if (strTempTooltip && strTempTooltip.Contains('~')) {
            strArray = strTempTooltip.Split('~');
            if (strArray && strArray.length > 1) {
                strTempTooltip = (strTempTooltip).Replace("~", Environment.NewLine + Environment.NewLine);
            }
        }
        return strTempTooltip;
    }

}
