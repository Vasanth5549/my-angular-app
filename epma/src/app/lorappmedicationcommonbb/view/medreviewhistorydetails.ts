import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import {
  EventArgs,
  Grid,
  UserControl,
  iLabel
} from 'epma-platform/controls';
import { ObjectHelper } from 'epma-platform/helper';
import {
  Visibility
} from 'epma-platform/models';
import {
  base
} from 'epma-platform/services';
import 'epma-platform/stringextension';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import {
  GridExtension,
  SelectionChangeEventArgs,
} from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import * as ControlStyles from '../../shared/epma-platform/controls/ControlStyles';
import { Resource } from '../resource';
import { CConstants } from '../utilities/constants';
import {
  PrescriptionItemDetailsVM,
  ReviewHistoryDetails,
} from '../viewmodel/prescriptionitemdetailsvm';

@Component({
  selector: 'medreviewhistorydetails',
  templateUrl: './medreviewhistorydetails.html',
  styleUrls: ['./medreviewhistorydetails.css'],
})
export class medreviewhistorydetails extends UserControl {
  isEPRview: boolean;
  public ddkey = Resource.DrugDetails;
  public mdkey = Resource.medlistdetails;
  public Styles = ControlStyles;
  private LayoutRoot: Grid;
  @ViewChild('LayoutRootTempRef', { read: Grid, static: false })
  set _LayoutRoot(c: Grid) {
    if (c) {
      this.LayoutRoot = c;
    }
  }
  public grdReviewHistoryDetails: GridExtension = new GridExtension();
  @ViewChild('grdReviewHistoryDetailsTempRef', {
    read: GridComponent,
    static: false,
  })
  set _grdReviewHistoryDetails(c: GridComponent) {
    if (c) {
      this.grdReviewHistoryDetails.grid = c;
      this.grdReviewHistoryDetails.columns = c.columns;
    }
  }
  private lblReviewHistoryDetails: iLabel;
  @ViewChild('lblReviewHistoryDetailsTempRef', { read: iLabel, static: false })
  set _lblReviewHistoryDetails(c: iLabel) {
    if (c) {
      this.lblReviewHistoryDetails = c;
    }
  }
  private lblReviewrequestedby: iLabel;
  @ViewChild('lblReviewrequestedbyTempRef', { read: iLabel, static: false })
  set _lblReviewrequestedby(c: iLabel) {
    if (c) {
      this.lblReviewrequestedby = c;
    }
  }
  private lblReviewrequestedbyselected: iLabel;
  @ViewChild('lblReviewrequestedbyselectedTempRef', {
    read: iLabel,
    static: false,
  })
  set _lblReviewrequestedbyselected(c: iLabel) {
    if (c) {
      this.lblReviewrequestedbyselected = c;
    }
  }
  private lblReviewrequestedon: iLabel;
  @ViewChild('lblReviewrequestedonTempRef', { read: iLabel, static: false })
  set _lblReviewrequestedon(c: iLabel) {
    if (c) {
      this.lblReviewrequestedon = c;
    }
  }
  private lblReviewrequestedonselected: iLabel;
  @ViewChild('lblReviewrequestedonselectedTempRef', {
    read: iLabel,
    static: false,
  })
  set _lblReviewrequestedonselected(c: iLabel) {
    if (c) {
      this.lblReviewrequestedonselected = c;
    }
  }
  private lblReviewperiod: iLabel;
  @ViewChild('lblReviewperiodTempRef', { read: iLabel, static: false })
  set _lblReviewperiod(c: iLabel) {
    if (c) {
      this.lblReviewperiod = c;
    }
  }
  private lblReviewperiodselected: iLabel;
  @ViewChild('lblReviewperiodselectedTempRef', { read: iLabel, static: false })
  set _lblReviewperiodselected(c: iLabel) {
    if (c) {
      this.lblReviewperiodselected = c;
    }
  }
  private lblReviewrequestdue: iLabel;
  @ViewChild('lblReviewrequestdueTempRef', { read: iLabel, static: false })
  set _lblReviewrequestdue(c: iLabel) {
    if (c) {
      this.lblReviewrequestdue = c;
    }
  }
  private lblReviewrequestdueselected: iLabel;
  @ViewChild('lblReviewrequestdueselectedTempRef', {
    read: iLabel,
    static: false,
  })
  set _lblReviewrequestdueselected(c: iLabel) {
    if (c) {
      this.lblReviewrequestdueselected = c;
    }
  }
  private lblReviewrequestcomments: iLabel;
  @ViewChild('lblReviewrequestcommentsTempRef', { read: iLabel, static: false })
  set _lblReviewrequestcomments(c: iLabel) {
    if (c) {
      this.lblReviewrequestcomments = c;
    }
  }
  private lblReviewrequestcommentsselected: iLabel;
  @ViewChild('lblReviewrequestcommentsselectedTempRef', {
    read: iLabel,
    static: false,
  })
  set _lblReviewrequestcommentsselected(c: iLabel) {
    if (c) {
      this.lblReviewrequestcommentsselected = c;
    }
  }
  private lblReviewtype: iLabel;
  @ViewChild('lblReviewtypeTempRef', { read: iLabel, static: false })
  set _lblReviewtype(c: iLabel) {
    if (c) {
      this.lblReviewtype = c;
    }
  }
  private lblReviewtypeselected: iLabel;
  @ViewChild('lblReviewtypeselectedTempRef', { read: iLabel, static: false })
  set _lblReviewtypeselected(c: iLabel) {
    if (c) {
      this.lblReviewtypeselected = c;
    }
  }
  private lblReviewedby: iLabel;
  @ViewChild('lblReviewedbyTempRef', { read: iLabel, static: false })
  set _lblReviewedby(c: iLabel) {
    if (c) {
      this.lblReviewedby = c;
    }
  }
  private lblReviewedbyselected: iLabel;
  @ViewChild('lblReviewedbyselectedTempRef', { read: iLabel, static: false })
  set _lblReviewedbyselected(c: iLabel) {
    if (c) {
      this.lblReviewedbyselected = c;
    }
  }
  private lblReviewedon: iLabel;
  @ViewChild('lblReviewedonTempRef', { read: iLabel, static: false })
  set _lblReviewedon(c: iLabel) {
    if (c) {
      this.lblReviewedon = c;
    }
  }
  private lblReviewedonselected: iLabel;
  @ViewChild('lblReviewedonselectedTempRef', { read: iLabel, static: false })
  set _lblReviewedonselected(c: iLabel) {
    if (c) {
      this.lblReviewedonselected = c;
    }
  }
  private lblReviewoutcome: iLabel;
  @ViewChild('lblReviewoutcomeTempRef', { read: iLabel, static: false })
  set _lblReviewoutcome(c: iLabel) {
    if (c) {
      this.lblReviewoutcome = c;
    }
  }
  private lblReviewoutcomeselected: iLabel;
  @ViewChild('lblReviewoutcomeselectedTempRef', { read: iLabel, static: false })
  set _lblReviewoutcomeselected(c: iLabel) {
    if (c) {
      this.lblReviewoutcomeselected = c;
    }
  }
  private lblReviewoutcomecomments: iLabel;
  @ViewChild('lblReviewoutcomecommentsTempRef', { read: iLabel, static: false })
  set _lblReviewoutcomecomments(c: iLabel) {
    if (c) {
      this.lblReviewoutcomecomments = c;
    }
  }
  private lblReviewoutcomecommentsselected: iLabel;
  @ViewChild('lblReviewoutcomecommentsselectedTempRef', {
    read: iLabel,
    static: false,
  })
  set _lblReviewoutcomecommentsselected(c: iLabel) {
    if (c) {
      this.lblReviewoutcomecommentsselected = c;
    }
  }
  objPrescriptionItemDetailsVM: PrescriptionItemDetailsVM;
  constructor() {
    super();
    // InitializeComponent();
  }
  ngOnInit(): void {
    this.medreviewhistorydetails_Loaded({}, {});
    this.grdReviewHistoryDetails.GridSelectionChange = (s, e) => {
      this.grdReviewHistoryDetails_SelectionChanged(s, e);
    };
    this.grdReviewHistoryDetails.RowIndicatorVisibility = Visibility.Visible;
    let viewcheck: any = base.WizardContext;
    if (viewcheck?.IconClick) {
      this.isEPRview = true;
    }
    else this.isEPRview = false;
  }
  medreviewhistorydetails_Loaded(sender: Object, e: RoutedEventArgs) {
    if (this.DataContext != null) {
      this.objPrescriptionItemDetailsVM =
        ObjectHelper.CreateType<PrescriptionItemDetailsVM>(
          this.DataContext,
          PrescriptionItemDetailsVM
        );
      this.objPrescriptionItemDetailsVM.GetReviewHistory();
      this.DataContext = this.objPrescriptionItemDetailsVM;
      this.grdReviewHistoryDetails.ItemsSource =
        this.objPrescriptionItemDetailsVM.ReviewHistory;
      this.grdReviewHistoryDetails.SetBinding(
        'data',
        this.objPrescriptionItemDetailsVM.ReviewHistory
      );
      this.objPrescriptionItemDetailsVM.ReviewHistoryEvent = (s, e) => {
        this.grdReviewHistoryDetails_DataLoaded(s, {});
      };
    }
  }
  onKeyDown(e: KeyboardEvent, grid: GridComponent) {
    let selectedIdx = this.grdReviewHistoryDetails.selectedRowsIndex[0];
    if (
      e.key === 'ArrowDown' &&
      grid.activeRow.dataItem &&
      this.grdReviewHistoryDetails.selectedRowsIndex.length > 0 &&
      selectedIdx < this.grdReviewHistoryDetails.GetRowCount() - 1
    ) {
      this.grdReviewHistoryDetails.selectedRowsIndex = [selectedIdx + 1];
      let selectedItem: any = {
        selectedRows: [this.grdReviewHistoryDetails.GetRowData(selectedIdx)],
      };
      this.grdReviewHistoryDetails_SelectionChanged({}, selectedItem);
    } else {
      return;
    }
  }

  onKeyUp(e: KeyboardEvent) {
    let selectedIdx = this.grdReviewHistoryDetails.selectedRowsIndex[0];
    if (
      e.key === 'ArrowUp' &&
      this.grdReviewHistoryDetails.selectedRowsIndex.length > 0 &&
      selectedIdx > 0
    ) {
      this.grdReviewHistoryDetails.selectedRowsIndex = [
        selectedIdx - 1,
      ];
      let selectedItem: any = {
        selectedRows: [
          this.grdReviewHistoryDetails.GetRowData(
            selectedIdx
          ),
        ],
      };
      this.grdReviewHistoryDetails_SelectionChanged({}, selectedItem);
    } else {
      return;
    }
  }

  grdReviewHistoryDetails_DataLoaded(sender: Object, e: EventArgs): void {
    if (this.grdReviewHistoryDetails.GetRowCount() > 0) {
      this.grdReviewHistoryDetails.selectedRowsIndex = [0];
      let selectedItem: any = {
        selectedRows: [this.grdReviewHistoryDetails.GetRowData(0)],
      };
      this.grdReviewHistoryDetails_SelectionChanged({}, selectedItem);
    }
  }
  public grdReviewHistoryDetails_SelectionChanged(
    sender: Object,
    e: SelectionChangeEventArgs
  ): void {
    if (e.selectedRows[0] != null) {
      let oReviewHistoryDetails: ReviewHistoryDetails =
        ObjectHelper.CreateType<ReviewHistoryDetails>(
          this.grdReviewHistoryDetails.SelectedItem,
          ReviewHistoryDetails
        );
      if (oReviewHistoryDetails != null) {
        if (this.objPrescriptionItemDetailsVM != null) {
          this.lblReviewrequestedbyselected.Text =
            oReviewHistoryDetails.ReviewRequestedBy;
          if (oReviewHistoryDetails.ReviewRequestedOn.Year >= 1753) {
            this.lblReviewrequestedonselected.Text =
              oReviewHistoryDetails.ReviewRequestedOn.ToString(
                CConstants.LongDateWithoutSecs
              );
          } else {
            this.lblReviewrequestedonselected.Text = String.Empty;
          }
          this.lblReviewperiodselected.Text =
            oReviewHistoryDetails.ReviewPeriod +
            ' ' +
            oReviewHistoryDetails.ReviewPeriodUOM;
          if (oReviewHistoryDetails.ReviewDue.Year >= 1753) {
            this.lblReviewrequestdueselected.Text =
              oReviewHistoryDetails.ReviewDue.ToString(
                CConstants.LongDateWithoutSecs
              );
          } else {
            this.lblReviewrequestdueselected.Text = String.Empty;
          }
          this.lblReviewrequestcommentsselected.Text =
            oReviewHistoryDetails.ReviewRequestComments;
          this.lblReviewtypeselected.Text = oReviewHistoryDetails.ReviewType;
          this.lblReviewedbyselected.Text = oReviewHistoryDetails.ReviewedBy;
          if (oReviewHistoryDetails.ReviewedOn.Year >= 1753) {
            this.lblReviewedonselected.Text =
              oReviewHistoryDetails.ReviewedOn.ToString(
                CConstants.LongDateWithoutSecs
              );
          } else {
            this.lblReviewedonselected.Text = String.Empty;
          }
          this.lblReviewoutcomeselected.Text =
            oReviewHistoryDetails.ReviewOutcome;
          this.lblReviewoutcomecommentsselected.Text =
            oReviewHistoryDetails.ReviewOutcomecomments;
        }
      }
    } else {
      this.ClearData();
    }
  }
  private ClearData(): void {
    this.lblReviewrequestedbyselected.Text = String.Empty;
    this.lblReviewrequestedonselected.Text = String.Empty;
    this.lblReviewperiodselected.Text = String.Empty;
    this.lblReviewrequestdueselected.Text = String.Empty;
    this.lblReviewrequestcommentsselected.Text = String.Empty;
    this.lblReviewtypeselected.Text = String.Empty;
    this.lblReviewedbyselected.Text = String.Empty;
    this.lblReviewedonselected.Text = String.Empty;
    this.lblReviewoutcomeselected.Text = String.Empty;
    this.lblReviewoutcomecommentsselected.Text = String.Empty;
  }
}
