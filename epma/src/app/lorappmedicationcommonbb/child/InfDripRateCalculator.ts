import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
    iAppDialogWindow,
} from 'epma-platform/models';
import {
    AppDialog,
    Border,
    Control,
    Grid,
    iButton,
    iComboBox,
    iLabel,
    iTextBox,
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
import { DripRateCalcVM } from 'src/app/lorappmedicationcommonbb/viewmodel/dripratecalcvm';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { Type } from 'src/app/product/shared/models/Common';
import { Resource } from '../resource';
import * as ControlStyles from '../../shared/epma-platform/controls/ControlStyles';

@Component({
    selector: 'app-InfDripRateCalculator',
    templateUrl: './InfDripRateCalculator.html',
    styleUrls: ['./InfDripRateCalculator.css']
})
export class InfDripRateCalculator extends iAppDialogWindow implements OnInit {
    public DripCalcVMErrorEvent: Function;

    //The below line is typed by me and is temporary
    // objDriRateCalVM: DripRateCalcVM = new DripRateCalcVM();
    //The above line is typed by me and is temporary
    objDriRateCalVM: DripRateCalcVM;


    // override _DataContext: DripRateCalcVM = new DripRateCalcVM();
    // override _DataContext: DripRateCalcVM;
    // override get DataContext() {
    //   console.log(this._DataContext);
    //   return this._DataContext;
    // }
    // @Input() override set DataContext(value: DripRateCalcVM) {
    //   this._DataContext = value;
    // }

    // override _DataContext: DripRateCalcVM;
    // override get  DataContext() {
    //   return this._DataContext;
    // }
    // @Input() override set DataContext(value: any) {
    //   this._DataContext = value;
    // }

    public objRecordAdmin = Resource.MedicationAdministrator;
    public ResrcKey = Resource.InfusionChart;

    public Styles = ControlStyles;
    // constructor() {
    //     InitializeComponent();
    //     this.DataContext = this.objDriRateCalVM;
    // }
    // constructor(ovm: DripRateCalcVM) {
    //     InitializeComponent();

    // }

    public LayoutRoot: Grid;
    @ViewChild('LayoutRootTempRef', { read: Grid, static: false })
    set _LayoutRoot(c: Grid) {
        if (c) {
            this.LayoutRoot = c;
        }
    }
    public lblInfusionRateDose: iLabel;
    @ViewChild('lblInfusionRateDoseTempRef', { read: iLabel, static: false })
    set _lblInfusionRateDose(c: iLabel) {
        if (c) {
            this.lblInfusionRateDose = c;
        }
    }
    public InfusionrateLayoutRoot: Grid;
    @ViewChild('InfusionrateLayoutRootTempRef', { read: Grid, static: false })
    set _InfusionrateLayoutRoot(c: Grid) {
        if (c) {
            this.InfusionrateLayoutRoot = c;
        }
    }
    public txtInfusionRate: iTextBox;
    @ViewChild('txtInfusionRateTempRef', { read: iTextBox, static: false })
    set _txtInfusionRate(c: iTextBox) {
        if (c) {
            this.txtInfusionRate = c;
        }
    }
    public lblInfRateInDoseUOM: iLabel;
    @ViewChild('lblInfRateInDoseUOMTempRef', { read: iLabel, static: false })
    set _lblInfRateInDoseUOM(c: iLabel) {
        if (c) {
            this.lblInfRateInDoseUOM = c;
        }
    }
    public lblInfusionRateHifen: iLabel;
    @ViewChild('lblInfusionRateHifenTempRef', { read: iLabel, static: false })
    set _lblInfusionRateHifen(c: iLabel) {
        if (c) {
            this.lblInfusionRateHifen = c;
        }
    }
    public lblInfRateInDosePerUOM: iLabel;
    @ViewChild('lblInfRateInDosePerUOMTempRef', { read: iLabel, static: false })
    set _lblInfRateInDosePerUOM(c: iLabel) {
        if (c) {
            this.lblInfRateInDosePerUOM = c;
        }
    }
    public lblInfConcentration: iLabel;
    @ViewChild('lblInfConcentrationTempRef', { read: iLabel, static: false })
    set _lblInfConcentration(c: iLabel) {
        if (c) {
            this.lblInfConcentration = c;
        }
    }
    public InfConcentrationLayoutRoot: Grid;
    @ViewChild('InfConcentrationLayoutRootTempRef', { read: Grid, static: false })
    set _InfConcentrationLayoutRoot(c: Grid) {
        if (c) {
            this.InfConcentrationLayoutRoot = c;
        }
    }
    public txtConcentrationStrength: iTextBox;
    @ViewChild('txtConcentrationStrengthTempRef', {
        read: iTextBox,
        static: false,
    })
    set _txtConcentrationStrength(c: iTextBox) {
        if (c) {
            this.txtConcentrationStrength = c;
        }
    }
    public cboConcentrationUOM: iComboBox;
    @ViewChild('cboConcentrationUOMTempRef', { read: iComboBox, static: false })
    set _cboConcentrationUOM(c: iComboBox) {
        if (c) {
            this.cboConcentrationUOM = c;
        }
    }
    public lblInfConHifen: iLabel;
    @ViewChild('lblInfConHifenTempRef', { read: iLabel, static: false })
    set _lblInfConHifen(c: iLabel) {
        if (c) {
            this.lblInfConHifen = c;
        }
    }
    public txtConcentrationVolume: iTextBox;
    @ViewChild('txtConcentrationVolumeTempRef', { read: iTextBox, static: false })
    set _txtConcentrationVolume(c: iTextBox) {
        if (c) {
            this.txtConcentrationVolume = c;
        }
    }
    public cboConcentrationVolumUOM: iComboBox;
    @ViewChild('cboConcentrationVolumUOMTempRef', {
        read: iComboBox,
        static: false,
    })
    set _cboConcentrationVolumUOM(c: iComboBox) {
        if (c) {
            this.cboConcentrationVolumUOM = c;
        }
    }
    public cmddosecalc: iButton;
    @ViewChild('cmddosecalcTempRef', { read: iButton, static: false })
    set _cmddosecalc(c: iButton) {
        if (c) {
            this.cmddosecalc = c;
        }
    }
    public lblinfusrate: iLabel;
    @ViewChild('lblinfusrateTempRef', { read: iLabel, static: false })
    set _lblinfusrate(c: iLabel) {
        if (c) {
            this.lblinfusrate = c;
        }
    }
    public lblinfusratequal: iLabel;
    @ViewChild('lblinfusratequalTempRef', { read: iLabel, static: false })
    set _lblinfusratequal(c: iLabel) {
        if (c) {
            this.lblinfusratequal = c;
        }
    }
    public lblinfurate: iLabel;
    @ViewChild('lblinfurateTempRef', { read: iLabel, static: false })
    set _lblinfurate(c: iLabel) {
        if (c) {
            this.lblinfurate = c;
        }
    }
    public lblinfusratequa2: iLabel;
    @ViewChild('lblinfusratequa2TempRef', { read: iLabel, static: false })
    set _lblinfusratequa2(c: iLabel) {
        if (c) {
            this.lblinfusratequa2 = c;
        }
    }
    public lblinfucon: iLabel;
    @ViewChild('lblinfuconTempRef', { read: iLabel, static: false })
    set _lblinfucon(c: iLabel) {
        if (c) {
            this.lblinfucon = c;
        }
    }
    public cmdDoseCal: iButton;
    @ViewChild('cmdDoseCalTempRef', { read: iButton, static: false })
    set _cmdDoseCal(c: iButton) {
        if (c) {
            this.cmdDoseCal = c;
        }
    }
    public cmdcalc: iButton;
    @ViewChild('cmdcalcTempRef', { read: iButton, static: false }) set _cmdcalc(
        c: iButton
    ) {
        if (c) {
            this.cmdcalc = c;
        }
    }
    public lblinfusratevol: iLabel;
    @ViewChild('lblinfusratevolTempRef', { read: iLabel, static: false })
    set _lblinfusratevol(c: iLabel) {
        if (c) {
            this.lblinfusratevol = c;
        }
    }
    public InfusionratevolumeLayoutRoot: Grid;
    @ViewChild('InfusionratevolumeLayoutRootTempRef', {
        read: Grid,
        static: false,
    })
    set _InfusionratevolumeLayoutRoot(c: Grid) {
        if (c) {
            this.InfusionratevolumeLayoutRoot = c;
        }
    }
    public txtInfusionRatevol: iTextBox;
    @ViewChild('txtInfusionRatevolTempRef', { read: iTextBox, static: false })
    set _txtInfusionRatevol(c: iTextBox) {
        if (c) {
            this.txtInfusionRatevol = c;
        }
    }
    public lblInfusionvolUOM: iLabel;
    @ViewChild('lblInfusionvolUOMTempRef', { read: iLabel, static: false })
    set _lblInfusionvolUOM(c: iLabel) {
        if (c) {
            this.lblInfusionvolUOM = c;
        }
    }
    public cboInfustionRatevolUOM: iComboBox;
    @ViewChild('cboInfustionRatevolUOMTempRef', {
        read: iComboBox,
        static: false,
    })
    set _cboInfustionRatevolUOM(c: iComboBox) {
        if (c) {
            this.cboInfustionRatevolUOM = c;
        }
    }
    public lblInfusionRatevolHifen: iLabel;
    @ViewChild('lblInfusionRatevolHifenTempRef', { read: iLabel, static: false })
    set _lblInfusionRatevolHifen(c: iLabel) {
        if (c) {
            this.lblInfusionRatevolHifen = c;
        }
    }
    public cboInfusionRatevolUOM: iComboBox;
    @ViewChild('cboInfusionRatevolUOMTempRef', { read: iComboBox, static: false })
    set _cboInfusionRatevolUOM(c: iComboBox) {
        if (c) {
            this.cboInfusionRatevolUOM = c;
        }
    }
    public brdDripratecalc: Border;
    @ViewChild('brdDripratecalcTempRef', { read: Border, static: false })
    set _brdDripratecalc(c: Border) {
        if (c) {
            this.brdDripratecalc = c;
        }
    }
    public lblDripratecalc: iLabel;
    @ViewChild('lblDripratecalcTempRef', { read: iLabel, static: false })
    set _lblDripratecalc(c: iLabel) {
        if (c) {
            this.lblDripratecalc = c;
        }
    }
    public lbldropfactor: iLabel;
    @ViewChild('lbldropfactorTempRef', { read: iLabel, static: false })
    set _lbldropfactor(c: iLabel) {
        if (c) {
            this.lbldropfactor = c;
        }
    }
    public txtdropfac: iTextBox;
    @ViewChild('txtdropfacTempRef', { read: iTextBox, static: false })
    set _txtdropfac(c: iTextBox) {
        if (c) {
            this.txtdropfac = c;
        }
    }
    public lbldropfacvalue: iLabel;
    @ViewChild('lbldropfacvalueTempRef', { read: iLabel, static: false })
    set _lbldropfacvalue(c: iLabel) {
        if (c) {
            this.lbldropfacvalue = c;
        }
    }
    public lblcalcdriprate: iLabel;
    @ViewChild('lblcalcdriprateTempRef', { read: iLabel, static: false })
    set _lblcalcdriprate(c: iLabel) {
        if (c) {
            this.lblcalcdriprate = c;
        }
    }
    public lblcalcdripratevalue: iLabel;
    @ViewChild('lblcalcdripratevalueTempRef', { read: iLabel, static: false })
    set _lblcalcdripratevalue(c: iLabel) {
        if (c) {
            this.lblcalcdripratevalue = c;
        }
    }
    public lblcalcdriprateuom: iLabel;
    @ViewChild('lblcalcdriprateuomTempRef', { read: iLabel, static: false })
    set _lblcalcdriprateuom(c: iLabel) {
        if (c) {
            this.lblcalcdriprateuom = c;
        }
    }
    public _contentLoaded: Boolean;
    @ViewChild('_contentLoadedTempRef', { read: Boolean, static: false })
    set __contentLoaded(c: Boolean) {
        if (c) {
            this._contentLoaded = c;
        }
    }
/*
    constructor() {
        super();
        if (arguments.length > 0) {
            //The below ovm lines is typed by me and is temporary
            let ovm: any;
            ovm = new DripRateCalcVM();
            //The above ovm line is typed by me and is temporary
            this.objDriRateCalVM = ovm;
            this.DataContext = this.objDriRateCalVM;
            this.DripCalcVMErrorEvent = (s, e) => {
                this.DripCalc_OnErrorEvent(s);
            };
            // this.objDriRateCalVM.OnErrorEvent += this.DripCalcVMErrorEvent;
            // this.objDriRateCalVM.OnErrorEvent = (s, e) => {
            //   this.DripCalcVMErrorEvent;
            // };
        } else {
            this.DataContext = this.objDriRateCalVM;
        }
    }

    */


      constructor(ovm?: DripRateCalcVM) {
        super();
        if (arguments.length > 0) {
          this.objDriRateCalVM = ovm;
          this.DataContext = this.objDriRateCalVM;
          this.DripCalcVMErrorEvent = (s, e) => {
            this.DripCalc_OnErrorEvent(s);
          }
          // this.objDriRateCalVM.OnErrorEvent += this.DripCalcVMErrorEvent;
          // this.objDriRateCalVM.OnErrorEvent = (s, e) => {
          //   this.DripCalcVMErrorEvent;
          // };
        } else {
          this.DataContext = this.objDriRateCalVM;
        }
      }

  ngOnInit(): void {
    this.DataContext = this.objDriRateCalVM;
    this.DataContext.IsEnabledInfusionrate=true;
    console.log("Data for Drip Rate",this.DataContext)
  }


    public ChildWindow_UnLoaded(sender: Object, e: RoutedEventArgs): void {
        if (this.objDriRateCalVM != null) this.objDriRateCalVM.DoCleanUP();
    }
    DripCalc_OnErrorEvent(ContronID: string): void {
        let ctrlToSetFocus: Object = this.FindName(ContronID);
        if (ctrlToSetFocus != null) {
            // let ctrlType: Type = ctrlToSetFocus.GetType();
            let ctrlType: Type = ObjectHelper.GetType(ctrlToSetFocus);
            if (ctrlType.Equals(/*typeof*/ iComboBox)) {
                ObjectHelper.CreateType<iComboBox>(ctrlToSetFocus, iComboBox).Focus();
            } else if (ctrlType.Equals(/*typeof*/ iTextBox)) {
                ObjectHelper.CreateType<iTextBox>(ctrlToSetFocus, iTextBox).Focus();
            } else {
                ObjectHelper.CreateType<Control>(ctrlToSetFocus, Control).Focus();
            }
        }
    }
}
