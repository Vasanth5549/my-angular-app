import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  StringBuilder,
  ProfileFactoryType,
  ContextManager,
  Convert,
  AppActivity,
} from 'epma-platform/services';
import {
  Level,
  ProfileContext,
  OnProfileResult,
  IProfileProp,
  Byte,
  Decimal,
  decimal,
  Double,
  Float,
  Int64,
  long,
  Long,
  StringComparison,
  AppDialogEventargs,
  AppDialogResult,
  DelegateArgs,
  DialogComponentArgs,
  WindowButtonType,
  ObservableCollection,
  RadRoutedEventArgs,
  Visibility,
} from 'epma-platform/models';
import {
  AppDialog,
  Binding,
  BitmapImage,
  Border,
  Color,
  Colors,
  DataTemplate,
  FontWeights,
  FrameworkElement,
  Grid,
  HorizontalAlignment,
  ScrollViewer,
  SolidColorBrush,
  StackPanel,
  TextBlock,
  Thickness,
  ToolTipService,
  Uri,
  UriKind,
  UserControl,
  iCheckBox,
  iLabel,
} from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import {
  MessageEventArgs,
  MessageBoxResult,
  iMessageBox,
  MessageBoxButton,
  MessageBoxType,
  MessageBoxDelegate,
} from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { PrescriptionItemDetailsVM } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemdetailsvm';
import { RadExpander } from 'src/app/shared/epma-platform/controls/epma-radExpander/epma-radExpander.component';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import * as IPPManagePrescSer from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import * as ControlStyles from '../../shared/epma-platform/controls/ControlStyles';
import { GridComponent } from '@progress/kendo-angular-grid';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { TextWrapping } from 'src/app/shared/epma-platform/models/model';
import { Orientation } from 'src/app/shared/epma-platform/controls-model/Orientation';
import { IPPMABaseVM } from 'src/app/lorappmanageprescriptionbbui/viewmodel/ippmabasevm';
import { GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import {  VerticalAlignment } from "epma-platform/controls";
import { MedImage, MedImages } from 'src/app/product/shared/models/constant';
import { Image } from 'src/app/shared/epma-platform/controls/epma-image/epma-image.component';

@Component({
  selector: 'meddrc',
  templateUrl: './meddrc.html',
  styleUrls: ['./meddrc.css'],
})
export class meddrc extends UserControl implements OnInit, AfterViewInit {
  public Styles = ControlStyles;
  public bIsLoaded: boolean = false;
  public DRCtooltip={
    Tooltip: "click to view more information"
  }
  public objPrescriptionItemDetailsVM: PrescriptionItemDetailsVM = null;
  override _DataContext: PrescriptionItemDetailsVM;
  TextTooltip: any;
  override get DataContext() {
    return this._DataContext;
  }
  @Input() override set DataContext(value: PrescriptionItemDetailsVM) {
    this._DataContext = value;
  }
  public ConflictDetails: any;
  DRCConflictDetail: any = [];
  public LayoutRoot: Grid;
  @ViewChild('LayoutRootTempRef', { read: Grid, static: false })
  set _LayoutRoot(c: Grid) {
    if (c) {
      this.LayoutRoot = c;
    }
  }
  public svwDRCConflict: ScrollViewer;
  @ViewChild('svwDRCConflictTempRef', { read: ScrollViewer, static: false })
  set _svwDRCConflict(c: ScrollViewer) {
    if (c) {
      this.svwDRCConflict = c;
    }
  }
  public DRCConflictItems: StackPanel;
  @ViewChild('DRCConflictItemsTempRef', { read: StackPanel, static: false })
  set _DRCConflictItems(c: StackPanel) {
    if (c) {
      this.DRCConflictItems = c;
    }
  }
  public AcknowldgeRSN: Grid;
  @ViewChild('AcknowldgeRSNTempRef', { read: Grid, static: false })
  set _AcknowldgeRSN(c: Grid) {
    if (c) {
      this.AcknowldgeRSN = c;
    }
  }
  public ilblAcknowldgeRSN: iLabel;
  @ViewChild('ilblAcknowldgeRSNTempRef', { read: iLabel, static: false })
  set _ilblAcknowldgeRSN(c: iLabel) {
    if (c) {
      this.ilblAcknowldgeRSN = c;
    }
  }
  public lblAcknowledgementRsn: iLabel;
  @ViewChild('lblAcknowledgementRsnTempRef', { read: iLabel, static: false })
  set _lblAcknowledgementRsn(c: iLabel) {
    if (c) {
      this.lblAcknowledgementRsn = c;
    }
  }
  public Acknowldge: Grid;
  @ViewChild('AcknowldgeTempRef', { read: Grid, static: false })
  set _Acknowldge(c: Grid) {
    if (c) {
      this.Acknowldge = c;
    }
  }
  public ilblDRCkAcknowldgeMsg: iLabel;
  @ViewChild('ilblDRCkAcknowldgeMsgTempRef', { read: iLabel, static: false })
  set _ilblDRCkAcknowldgeMsg(c: iLabel) {
    if (c) {
      this.ilblDRCkAcknowldgeMsg = c;
    }
  }
  public chcDRCkAcknowldge: iCheckBox;
  @ViewChild('chcDRCkAcknowldgeTempRef', { read: iCheckBox, static: false })
  set _chcDRCkAcknowldge(c: iCheckBox) {
    if (c) {
      this.chcDRCkAcknowldge = c;
    }
  }
  public lblComments: iLabel;
  @ViewChild('lblCommentsTempRef', { read: iLabel, static: false })
  set _lblComments(c: iLabel) {
    if (c) {
      this.lblComments = c;
    }
  }
  public CommentsText: StackPanel;
  @ViewChild('CommentsTextTempRef', { read: StackPanel, static: false })
  set _CommentsText(c: StackPanel) {
    if (c) {
      this.CommentsText = c;
    }
  }
  public txtComments: iLabel;
  @ViewChild('txtCommentsTempRef', { read: iLabel, static: false })
  set _txtComments(c: iLabel) {
    if (c) {
      this.txtComments = c;
    }
  }
  public _contentLoaded: Boolean;
  @ViewChild('_contentLoadedTempRef', { read: Boolean, static: false })
  set __contentLoaded(c: Boolean) {
    if (c) {
      this._contentLoaded = c;
    }
  }

  public grdConflictDtls: GridExtension = new GridExtension();

  @ViewChild('grdConflictDtlsTempRef', { read: GridComponent }) set _grdConflictDtls(
    comp: GridComponent
  ) {
    if (comp) {
      this.grdConflictDtls.grid = comp;
      this.grdConflictDtls.columns = comp.columns;
    }
  }
  public tempRef: TemplateRef<any>;
  @ViewChild('DRCConflictTemp', { read: TemplateRef }) set itemTemplate(value) {
    this.tempRef = value;
  }
  private borComment: Border;
  @ViewChild("BorComments",{read: Border, static: false}) set _borComment(c: Border){
    if(c){this.borComment = c;
    }
  }
  public maxGridHeight = 300;
  constructor() {
    super();
  }
  ngOnInit(): void {
    this.grdConflictDtls.RowIndicatorVisibility = Visibility.Collapsed;
  }

  ngAfterViewInit(): void {
    this.LayoutRoot_Loaded(null, null);
    let elem = (document.querySelectorAll('medddetails')[0])?.querySelectorAll('#medddetailsRx')[0];
        let itemsHeight = 0;
        for (let i = 0; i < elem.children.length -1; i++) {
            itemsHeight += elem.children[i].scrollHeight;
        }
        let _grdHeight = (300 + 52) - itemsHeight;
        if( _grdHeight < 300){
          this.maxGridHeight = _grdHeight;
        }
        if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
          this.maxGridHeight = window.innerHeight - (_grdHeight + 40);
        }
  }

  public LayoutRoot_Loaded(sender: Object, e: RoutedEventArgs): void {
    if (this.DataContext != null) {
      this.bIsLoaded = true;
      this.objPrescriptionItemDetailsVM = ObjectHelper.CreateType<PrescriptionItemDetailsVM>(this.DataContext, PrescriptionItemDetailsVM);
      this.objPrescriptionItemDetailsVM.GetDRCConflictDetails(this.objPrescriptionItemDetailsVM.PrescriptionItemOID, PatientContext.PatientOID);
      this.objPrescriptionItemDetailsVM.DRCConflictsEvent = (s, e) => {
        this.objPrescriptionItemDetailsVM_DRCConflictsEvent(s);
      };
    }
  }
  objPrescriptionItemDetailsVM_DRCConflictsEvent(
    PresItemDetails: PrescriptionItemDetailsVM
  ): void {
    // this.DRCConflictDetail=[]
    this.DRCConflictItems.Children.Clear();
    let _counter: number = 1;
    this.txtComments.Text = String.Empty;
    this.txtComments.Visibility = Visibility.Collapsed;
    this.lblComments.Visibility = Visibility.Collapsed;
    this.CommentsText.Visibility = Visibility.Collapsed;
    this.borComment.Visibility=Visibility.Collapsed;
    if (
      PresItemDetails != null &&
      PresItemDetails.DRCConflicts != null &&
      PresItemDetails.DRCConflicts.Count > 0
    ) {
      PresItemDetails.DRCConflicts.forEach((oDRCConflic) => {
        if (
          oDRCConflic.ConflictDetails != null &&
          oDRCConflic.ConflictDetails.Count > 0
        ) {
          if (
            String.Equals(
              oDRCConflic.IsDRCPassed,
              '1',
              StringComparison.OrdinalIgnoreCase
            )
          ) {
            let dosetype = this.CreateAConflictItem(
              oDRCConflic,
              null,
              _counter
            );
            let frmElementItm = this.tempRef;
            if (
              frmElementItm != null &&
              !String.IsNullOrEmpty(frmElementItm['Name'])
            ) {
              frmElementItm['Name'] += _counter;
            }
            if (
              String.Equals(
                oDRCConflic.IsDRCPassed,
                '1',
                StringComparison.OrdinalIgnoreCase
              )
            ) {
              frmElementItm['DataContext'] = oDRCConflic;
            } else {
              let objDRCConflict: IPPManagePrescSer.DRCConflict =
                new IPPManagePrescSer.DRCConflict();
              objDRCConflict.ConflictDetails =
                new ObservableCollection<IPPManagePrescSer.DRCConflictDetails>();
              let objDRCConflictDetails: IPPManagePrescSer.DRCConflictDetails =
                new IPPManagePrescSer.DRCConflictDetails();
              objDRCConflictDetails.ErrorCode =
                oDRCConflic.DRCDefDoseTypeLorenzoID;
              objDRCConflictDetails.ErrorMessage = oDRCConflic.DRCMessage;
              this.DRCConflictDetail=[]; 
              this.DRCConflictDetail.push(objDRCConflictDetails);
              objDRCConflict.ConflictDetails.Add(objDRCConflictDetails);
              frmElementItm['DataContext'] = objDRCConflict;
            }
            dosetype.Content = frmElementItm;
            this.lblAcknowledgementRsn.Text =
              oDRCConflic.ConflictDetails[0].AcknowledgeReason;
            if (
              !String.IsNullOrEmpty(oDRCConflic.ConflictDetails[0].Comments)
            ) {
              this.txtComments.Text = oDRCConflic.ConflictDetails[0].Comments;
              ToolTipService.SetToolTip(
                this.txtComments,
                this.txtComments.Text
              );
            }
            if (
              !String.IsNullOrEmpty(
                oDRCConflic.ConflictDetails[0].AcknowledgeReasonCode
              ) &&
              String.Equals(
                oDRCConflic.ConflictDetails[0].AcknowledgeReasonCode,
                'CC_DRCINAPPWAR',
                StringComparison.InvariantCultureIgnoreCase
              )
            ) {
              this.txtComments.Visibility = Visibility.Visible;
            }
            this.CommentsText.Visibility = this.lblComments.Visibility =
              this.txtComments.Visibility;
              this.borComment.Visibility=this.txtComments.Visibility;
            this.chcDRCkAcknowldge.IsChecked = String.Equals(
              oDRCConflic.ConflictDetails[0].IsChecked,
              '1',
              StringComparison.OrdinalIgnoreCase
            )
              ? true
              : false;
            // this.dosetype.Expanded += this.dosetype_Expanded;
            // this.dosetype.Collapsed += this.dosetype_Collapsed;
            let _expander: RadRoutedEventArgs =
              ObjectHelper.CreateType<RadRoutedEventArgs>((s, R) => {
                this.dosetype_Expanded(null, R);
              }, RadExpander);
            dosetype.Expanded.emit(_expander);

            let _collapsed: RadRoutedEventArgs =
              ObjectHelper.CreateType<RadRoutedEventArgs>((s, R) => {
                this.dosetype_Collapsed(null, R);
              }, RadExpander);
            dosetype.Collapsed.emit(_collapsed);
            dosetype.Tag = !String.IsNullOrEmpty(oDRCConflic.IsDRCPassed)
              ? oDRCConflic.IsDRCPassed
              : String.Empty;
            _counter++;
            this.DRCConflictItems.Children.Add(dosetype);
          } else if (
            String.Equals(
              oDRCConflic.IsDRCPassed,
              '0',
              StringComparison.OrdinalIgnoreCase
            )
          ) {
            oDRCConflic.ConflictDetails.forEach((medDRCConflict: any) => {
              let dosetype: RadExpander = this.CreateAConflictItem(
                oDRCConflic,
                medDRCConflict,
                _counter
              );
              if (
                oDRCConflic.ConflictDetails != null &&
                oDRCConflic.ConflictDetails.Count > 0
              ) {
                let frmElementItm = this.tempRef;
                if (
                  frmElementItm != null &&
                  !String.IsNullOrEmpty(frmElementItm['Name'])
                ) {
                  frmElementItm['Name'] += _counter;
                }
                if (
                  String.Equals(
                    oDRCConflic.IsDRCPassed,
                    '1',
                    StringComparison.OrdinalIgnoreCase
                  )
                ) {
                  frmElementItm['DataContext'] = oDRCConflic;
                } else {
                  let objDRCConflict: IPPManagePrescSer.DRCConflict =
                    new IPPManagePrescSer.DRCConflict();
                  objDRCConflict.ConflictDetails =
                    new ObservableCollection<IPPManagePrescSer.DRCConflictDetails>();
                  let objDRCConflictDetails: IPPManagePrescSer.DRCConflictDetails =
                    new IPPManagePrescSer.DRCConflictDetails();
                  objDRCConflictDetails.ErrorCode =
                    oDRCConflic.DRCDefDoseTypeLorenzoID;
                  objDRCConflictDetails.ErrorMessage = oDRCConflic.DRCMessage;
                  this.DRCConflictDetail=[]; 
                  this.DRCConflictDetail.push(objDRCConflictDetails);
                  objDRCConflict.ConflictDetails.Add(objDRCConflictDetails);
                  frmElementItm['DataContext'] = objDRCConflict;
                }
                dosetype.Content = frmElementItm;
                this.lblAcknowledgementRsn.Text =
                  medDRCConflict.AcknowledgeReason;
                if (!String.IsNullOrEmpty(medDRCConflict.Comments)) {
                  this.txtComments.Text = medDRCConflict.Comments;
                  ToolTipService.SetToolTip(
                    this.txtComments,
                    this.txtComments.Text
                  );
                }
                if (
                  !String.IsNullOrEmpty(medDRCConflict.AcknowledgeReasonCode) &&
                  String.Equals(
                    medDRCConflict.AcknowledgeReasonCode,
                    'CC_DRCINAPPWAR',
                    StringComparison.InvariantCultureIgnoreCase
                  )
                ) {
                  this.txtComments.Visibility = Visibility.Visible;
                }
                this.CommentsText.Visibility = this.lblComments.Visibility =
                  this.txtComments.Visibility;
                  this.borComment.Visibility=this.txtComments.Visibility;
                this.chcDRCkAcknowldge.IsChecked = String.Equals(
                  oDRCConflic.ConflictDetails[0].IsChecked,
                  '1',
                  StringComparison.OrdinalIgnoreCase
                )
                  ? true
                  : false;
                let _expander: RadRoutedEventArgs =
                  ObjectHelper.CreateType<RadRoutedEventArgs>((s, R) => {
                    this.dosetype_Expanded(null, R);
                  }, RadExpander);
                dosetype.Expanded.emit(_expander);

                let _collapsed: RadRoutedEventArgs =
                  ObjectHelper.CreateType<RadRoutedEventArgs>((s, R) => {
                    this.dosetype_Collapsed(null, R);
                  }, RadExpander);
                dosetype.Collapsed.emit(_collapsed);
                dosetype.Tag = !String.IsNullOrEmpty(
                  oDRCConflic.IsDRCPassed
                )
                  ? oDRCConflic.IsDRCPassed
                  : String.Empty;
                _counter++;
                dosetype.Tag = !String.IsNullOrEmpty(
                  oDRCConflic.IsDRCPassed
                )
                  ? oDRCConflic.IsDRCPassed
                  : String.Empty;
                _counter++;
                this.DRCConflictItems.Children.Add(dosetype);
              }
            });
          }
        }
      });
    }
  }
  public dosetype_Collapsed(sender: Object, e: RadRoutedEventArgs): void {
    let _expander: RadExpander = ObjectHelper.CreateType<RadExpander>(
      e.Source,
      RadExpander
    );
    if (_expander != null) {
      ToolTipService.SetToolTip(_expander, 'Click to view more information');
    }
  }
  dosetype_Expanded(sender: Object, e: RadRoutedEventArgs): void {
    let _expander: RadExpander = ObjectHelper.CreateType<RadExpander>(
      e.Source,
      RadExpander
    );
    if (_expander != null) {
      if (
        _expander.Tag != null &&
        String.Equals(
          _expander.Tag.ToString(),
          '1',
          StringComparison.CurrentCultureIgnoreCase
        )
      ) {
        _expander.IsExpanded = false;
      } else {
        ToolTipService.SetToolTip(_expander, 'Click to view less information');
      }
    }
  }
  public GetTemplate(TemplateKey: string): TemplateRef<any> {
    try {
      let oFrameworkElement: TemplateRef<any>;
      let dtDrugDetails: DataTemplate = <DataTemplate>(
        this.LayoutRoot[TemplateKey]
      );
      if (dtDrugDetails == null) return null;
      oFrameworkElement = ObjectHelper.CreateType<TemplateRef<any>>(dtDrugDetails.Content, TemplateRef);
      return oFrameworkElement;
    } catch (ex: any) {
      let _ErrorID: number = 80000023;
      AMSHelper.PublicExceptionDetails(
        _ErrorID,
        'LorAppMedicationCommonBB.dll, Class:meddrc, Method:GetTemplate()',
        ex
      );
      return null;
    }
  }
  public CreateAConflictItem(
    oDRCConflict: IPPManagePrescSer.DRCConflict,
    medDRCConflict: IPPManagePrescSer.DRCConflictDetails,
    counter: number
  ): RadExpander {
    let item: RadExpander = new RadExpander();
      item.stopPrevent = false
    if (oDRCConflict != null) {
      let stPanel: StackPanel = new StackPanel();
      stPanel.heightchanged=(el) => {
        let tbs = el.nativeElement.getElementsByTagName("textblock");
        let height=0
        for(let i=0; i < tbs.length; i++){
          height=height+tbs[i].getElementsByTagName("div")[0].clientHeight;
        }
        el.nativeElement.style.height = (height == 0) ? "auto" : height + 'px';
      }
      stPanel.VerticalAlignment = VerticalAlignment.Top;
      stPanel.Orientation = Orientation.Horizontal;
      let sTitle: string = String.Empty;
      let lbl1: iLabel;
      if (
        String.Equals(
          oDRCConflict.IsDRCPassed,
          '1',
          StringComparison.OrdinalIgnoreCase
        )
      ) {
        sTitle = oDRCConflict.DRCDefDoseTypeLorenzoID;
        let txtlength: number = sTitle.length;
        let addlen: number = 0;
        if (txtlength < 11) {
          addlen = 11;
        }
        for (let i: number = 0; i < addlen; i++) {
          sTitle += ' ';
        }
        lbl1 = ObjectHelper.CreateObject(new iLabel(), {
          Text: sTitle,
          FontWeight: FontWeights.ExtraBold,
        });
        lbl1.Text += ' - ';
      } else {
        ToolTipService.SetToolTip(item, 'Click to view more information');
        if (
          medDRCConflict != null &&
          !String.IsNullOrEmpty(medDRCConflict.ErrorCode)
        ) {
          sTitle = medDRCConflict.ErrorCode;
        }
        lbl1 = ObjectHelper.CreateObject(new iLabel(), {
          Text: sTitle,
          FontWeight: FontWeights.ExtraBold,
        });
        lbl1.Text += '   ';
        let lblTooltip = new Binding(this.DRCtooltip, "Tooltip");
        lbl1.SetBinding(iLabel.ToolTipProperty, lblTooltip);        
      }
      stPanel.Children.Add(lbl1);
      if(String.Equals(oDRCConflict.IsDRCPassed,'0',StringComparison.OrdinalIgnoreCase))
   {
    if (medDRCConflict != null && !String.IsNullOrEmpty(medDRCConflict.ErrorMessage)) {

      var MTop=(medDRCConflict.ErrorMessage.length<135)?"3px":"0px"
      //stPanel.Children.Add(this.GetImage("Amend", MedImage.GetPath(MedImages.Removefieldhot)))
      let AmendImage = this.GetImage("Amend", MedImage.GetPath(MedImages.Removefieldhot));
      let AmendImageTooltip = new Binding(this.DRCtooltip, "Tooltip");
      AmendImage.SetBinding(Image.ToolTipProperty, AmendImageTooltip);
      stPanel.Children.Add(AmendImage);
      stPanel.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: " ", Width: 10, TextWrapping: TextWrapping.Wrap,style:{'display':'inline-block' } }));
      // stPanel.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: medDRCConflict.ErrorMessage, Width: 760, TextWrapping: TextWrapping.Wrap,style:{'display':'inline-block','margin-top':MTop }  }));
      let AmendText = (ObjectHelper.CreateObject(new TextBlock(), { Text: medDRCConflict.ErrorMessage, Width: 760, TextWrapping: TextWrapping.Wrap,style:{'display':'inline-block','margin-top':MTop }  }));
      let AmendTextTooltip = new Binding(this.DRCtooltip, "Tooltip");
      AmendText.SetBinding(TextBlock.ToolTipProperty, AmendTextTooltip);
      stPanel.Children.Add(AmendText);
  }
    }
    else {

      stPanel.Children.Add(this.GetImage("Amend", MedImage.GetPath(MedImages.AcknowledgedIcon)))
      stPanel.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: " ", Width: 10, TextWrapping: TextWrapping.Wrap ,style:{'display':'inline-block' }}));
      stPanel.Children.Add(ObjectHelper.CreateObject(new TextBlock(), {
           Text: oDRCConflict.DRCMessage, Width: 760, TextWrapping: TextWrapping.Wrap,style:{'display':'inline-block' } 
          }));
       
    }






      /*if (
        String.Equals(
          oDRCConflict.IsDRCPassed,
          '0',
          StringComparison.OrdinalIgnoreCase
        )
      ) {
        if (
          medDRCConflict != null &&
          !String.IsNullOrEmpty(medDRCConflict.ErrorMessage)
        ) {
          stPanel.Children.Add(
            ObjectHelper.CreateObject(new Image(), {
              Source: new BitmapImage(
                new Uri(
                  '../Images/iremovefieldhot16 .png',
                  UriKind.RelativeOrAbsolute
                )
              ),
            })
          );
          stPanel.Children.Add(
            ObjectHelper.CreateObject(new TextBlock(), {
              Text: ' ',
              Width: 10,
              TextWrapping: TextWrapping.Wrap,
            })
          );
          stPanel.Children.Add(
            ObjectHelper.CreateObject(new TextBlock(), {
              Text: medDRCConflict.ErrorMessage,
              Width: 600,
              TextWrapping: TextWrapping.Wrap,
            })
          );
        }
      } else {
        stPanel.Children.Add(
          ObjectHelper.CreateObject(new Image(), {
            Source: new BitmapImage(
              new Uri(
                '../Images/iacknowledgednor16.png',
                UriKind.RelativeOrAbsolute
              )
            ),
          })
        );
        stPanel.Children.Add(
          ObjectHelper.CreateObject(new TextBlock(), {
            Text: ' ',
            Width: 10,
            TextWrapping: TextWrapping.Wrap,
          })
        );
        stPanel.Children.Add(
          ObjectHelper.CreateObject(new TextBlock(), {
            Text: oDRCConflict.DRCMessage,
            Width: 600,
            TextWrapping: TextWrapping.Wrap,
          })
        );
      }*/
      item.Header = stPanel;
      item.Background = new SolidColorBrush(Color.FromArgb(255, 121, 192, 193));
      item.BorderThickness = new Thickness(1);
      item.BorderBrush = new SolidColorBrush(Colors.Black);
      if (
        String.Equals(
          oDRCConflict.IsDRCPassed,
          '1',
          StringComparison.OrdinalIgnoreCase
        )
      ) {
        item.Name = 'rder_' + oDRCConflict.DRCDefDoseTypeLorenzoID;
        item.IsExpanded = false;
        item.CanExpand = true;
      } else {
        if (
          medDRCConflict != null &&
          !String.IsNullOrEmpty(medDRCConflict.ErrorCode)
        ) {
          item.Name =
            'rder_' +
            String.Concat(
              oDRCConflict.DRCDefDoseTypeLorenzoID,
              '_',
              medDRCConflict.ErrorCode,
              '_',
              counter
                );
              item.IsExpanded = false;
        }
      }
    }

    let c_func = (s,e) =>
    {
    	this.DRCtooltip.Tooltip="click to view more information";
    }
    item.Collapsed_Func= c_func;

    let e_func= (s,e) =>
    {
    	this.DRCtooltip.Tooltip="click to view less information";
    }
    item.Expanded_Func= e_func;

    return item;
  }

  public DisposeFormEvents(): void {
    this.objPrescriptionItemDetailsVM.DRCConflictsEvent = undefined;
  }
  public UserControl_Unloaded(sender: Object, e: RoutedEventArgs): void {
    this.DisposeFormEvents();
  }
  ngOnDestroy(): void {
    this.UserControl_Unloaded(null, null);
    this.DRCConflictDetail=[]; 
  }
  private GetImage(sName: string, sPath: string): Image {
    let infoIcon: Image = new Image();
    infoIcon.HorizontalAlignment = HorizontalAlignment.Center;
    infoIcon.VerticalAlignment = VerticalAlignment.Center;
    infoIcon.Name = sName;
    infoIcon.Margin = new Thickness(2);
    infoIcon.Source = new BitmapImage(new Uri(sPath, UriKind.Relative));
//     if (!String.IsNullOrEmpty(sToolTip))
//         ToolTipService.SetToolTip(infoIcon, sToolTip);
   return infoIcon;
 }
}
