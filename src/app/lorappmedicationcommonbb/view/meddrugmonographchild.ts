import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, CListItem, SelectionChangedEventArgs, HtmlPage, Visibility, ObservableCollection } from 'epma-platform/models';
import { AppDialog, Border, iComboBox, iLabel } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { MonoGraphVM } from '../viewmodel/MonographVM';
import { MonographInfo } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { CConstants } from '../utilities/constants';
import { Grid, GridViewCellClickEventArgs, GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { GridComponent, GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { Resource } from '../resource';
import { empty } from 'rxjs';

@Component({
    selector: 'app-meddrugmonographchild',
    templateUrl: './meddrugmonographchild.html',
    styleUrls: ['./meddrugmonographchild.css']
})
export class meddrugmonographChild extends iAppDialogWindow implements AfterViewInit {
    public LayoutRoot: Grid;
    public Styles = ControlStyles;
    cboComponent_SelectionChanged_Func: Function;
    public monographchild = Resource.ResMedDrugMonograph;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public SelectedItemBorder: Border;
    @ViewChild("SelectedItemBorderTempRef", { read: Border, static: false }) set _SelectedItemBorder(c: Border) {
        if (c) { this.SelectedItemBorder = c; }
    };
    public lblSelectItem: iLabel;
    @ViewChild("lblSelectItemTempRef", { read: iLabel, static: false }) set _lblSelectItem(c: iLabel) {
        if (c) { this.lblSelectItem = c; }
    };
    public cboComponent: iComboBox;
    @ViewChild("cboComponentTempRef", { read: iComboBox, static: false }) set _cboComponent(c: iComboBox) {
        if (c) { this.cboComponent = c; }
    };
    public grdDetails: GridExtension = new GridExtension();
    @ViewChild('grdDetailsTempRef', { read: GridComponent, static: false })
    set _grdDetails(c: GridComponent) {
        if (c) {
            this.grdDetails.grid = c;
            this.grdDetails.columns = c.columns;
        }
    }
    public gridView: GridDataResult;
    public totalCount: number = 0;
    public pageSize = 50;
    public skip: number = 0;
    public currentPage: number = 1;

    objMonoGraphVM: MonoGraphVM;
    objMonographInfo: MonographInfo;
    private profile: ProfileFactoryType = new ProfileFactoryType();
    constructor() {
        super();

    }
   
    public pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.gridView = {
            data: this.objMonoGraphVM.MonoGraophInfo.ToArray().slice(this.skip, this.skip + this.pageSize),
            total: this.objMonoGraphVM.MonoGraophInfo.Length
        };
      this.grdDetails.SetBinding('data', this.objMonoGraphVM.MonoGraophInfo);
      if (this.grdDetails != null && this.grdDetails.Rows != null && this.grdDetails.Rows.Count > 0) {
        this.grdDetails.setSelectedItemByIndex(this.skip);
      }
    }

   
    ngAfterViewInit(): void {
        this.grdDetails.GenerateColumns();
        this.ChildWindow_Loaded(null, null);
        this.grdDetails.onCellClick = (s, e) => { this.grdDetails_onCellClick(s, e); };
        this.cboComponent_SelectionChanged_Func = (s, e) => { this.cboComponent_SelectionChanged(s, e) };
    }
    private DisposeFormEvents(): void {
        if (this.grdDetails != null)
            this.grdDetails.onCellClick = (s, e) => { this.grdDetails_onCellClick(s, e); };

    }
    private ChildWindow_UnLoaded(sender: Object, e: RoutedEventArgs): void {
        this.DisposeFormEvents();
    }
    private ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
        let RecCount: number;
        this.objMonoGraphVM = (ObjectHelper.CreateType<MonoGraphVM>(this.DataContext, MonoGraphVM));
        if (this.objMonoGraphVM != null) {
            if (this.objMonoGraphVM.MonographParams != null) {
                RecCount = this.objMonoGraphVM.MonographParams.Count;
                if (RecCount == 1) {
                    this.cboComponent.Visibility = Visibility.Collapsed;
                    this.SelectedItemBorder.Visibility = Visibility.Collapsed;
                    this.lblSelectItem.Visibility = Visibility.Collapsed;
                    if (this.objMonoGraphVM.MonographParams[0] != null) {
                        this.objMonoGraphVM.GetMonographDetails(Convert.ToInt64(this.objMonoGraphVM.MonographParams[0].Value), Convert.ToString(this.objMonoGraphVM.MonographParams[0].Tag), this.objMonoGraphVM.MonographParams[0].Level);
                        this.objMonoGraphVM.monographservicedata.subscribe(x => {                           
                            this.gridView = {
                                data: this.objMonoGraphVM.MonoGraophInfo.ToArray().slice(this.skip, this.skip + this.pageSize),
                                total: this.objMonoGraphVM.MonoGraophInfo.Length
                            };
                            this.grdDetails.SetBinding('data', this.objMonoGraphVM.MonoGraophInfo);
                            if (this.grdDetails != null && this.grdDetails.Rows != null && this.grdDetails.Rows.Count > 0) {
                                this.grdDetails.setSelectedItemByIndex(0);
                            }
                        })

                    }

                }

                else {
                    this.cboComponent.Visibility = Visibility.Visible;
                    this.SelectedItemBorder.Visibility = Visibility.Visible;
                    this.lblSelectItem.Visibility = Visibility.Visible;
                    //TODO count>1 then only loop should happen
                    // Added if condition and count>1
                    if (RecCount > 1) {
                        for (let icnt: number = 0; icnt < RecCount; icnt++) {
                            if (String.Compare(this.objMonoGraphVM.MonographParams[icnt].DisplayText, CConstants.NOTANPREDEFMCI) != 0) {
                                //not needed as itemsource is directly binding in html
                                //  this.cboComponent.Items.Add(this.objMonoGraphVM.MonographParams[icnt]);                            
                            }
                        }
                    }
                    this.cboComponent.SelectedIndex = 0;
                }
            }
            this.DataContext = this.objMonoGraphVM;

        }
    }
    grdDetails_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
        if (this.grdDetails.GetColumnIndexByName("Section") == args.ColumnIndex) {         
           this.objMonographInfo = ObjectHelper.CreateType<MonographInfo>(this.grdDetails.GetRowData(args.RowIndex), MonographInfo);
           console.log(this.grdDetails?.GetRowData(args.RowIndex),"rowindexcheck");          
            if (this.objMonographInfo != null) {
                //need to dicuss with hari
              //   let GrdCellValue: Object = this.grdDetails.GetCellValue(args.RowIndex, args.ColumnIndex);
              let GrdCellValue: Object = this.grdDetails.GetRowData(args.RowIndex).Section;
                this.objMonoGraphVM.GetMonoGraphList(this.objMonographInfo, GrdCellValue);
            }
        }
    }
    //e: Telerik.Windows.Controls.SelectionChangedEventArgs
    public cboComponent_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        if (!String.IsNullOrEmpty(this.cboComponent.GetValue())) {
            this.objMonoGraphVM.GetMonographDetails(Convert.ToInt64(this.cboComponent.GetValue()), Convert.ToString((<CListItem>(this.cboComponent.SelectedItem)).Tag), (<CListItem>(this.cboComponent.SelectedItem)).Level);
            this.gridView = null;
            this.skip = 0;
            if (this.objMonoGraphVM != null) {
                this.objMonoGraphVM.monographservicedata.subscribe(x => {
                    this.gridView = {
                        data: this.objMonoGraphVM.MonoGraophInfo.ToArray().slice(this.skip, this.skip + this.pageSize),
                        total: this.objMonoGraphVM.MonoGraophInfo.Length
                    };
                    this.grdDetails.SetBinding('data', this.objMonoGraphVM.MonoGraophInfo);
                })
            }

        }
    }
}
