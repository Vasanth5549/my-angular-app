import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog, UserControl, iButton } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { Grid } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { Resource } from '../resource';
import { IPPMABaseVM } from '../viewmodel/ippmabasevm';
import {EventEmitter} from '@angular/core';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { BehaviorSubject } from 'rxjs';

@Component({ selector: 'secondaryscreenlinkpanel', templateUrl: './secondaryscreenlinkpanel.html' ,styleUrls: ['./secondaryscreenlinkpanel.css']})

export class SecondaryScreenLinkPanel extends UserControl implements AfterViewInit{

  ngAfterViewInit(): void 
  {    
      this.ChildWindow_Loaded(null,null);      
  }
  
  oVM: IPPMABaseVM;

  constructor() {
    super();
  }    
  
  public grdLinks: Grid;
  @ViewChild("grdLinksTempRef", { read: Grid, static: false }) set _grdLinks(c: Grid) {
    if (c) { this.grdLinks = c; }
  };
  public cmdPrescribingOptions: iButton;
  @ViewChild("cmdPrescribingOptionsTempRef", { read: iButton, static: false }) set _cmdPrescribingOptions(c: iButton) {
    if (c) { this.cmdPrescribingOptions = c; }
  };
  public cmdPackOptions: iButton;
  @ViewChild("cmdPackOptionsTempRef", { read: iButton, static: false }) set _cmdPackOptions(c: iButton) {
    if (c) { this.cmdPackOptions = c; }
  };
  public cmdLinks: iButton;
  @ViewChild("cmdLinksTempRef", { read: iButton, static: false }) set _cmdLinks(c: iButton) {
    if (c) { this.cmdLinks = c; }
  };

  public objResMedSecondaryTab = Resource.ResMedSecondaryTab;
  public Styles = ControlStyles;
  //InitializeComponent();
  public SecondaryScreenLoaded = new EventEmitter();
  private ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {   
    this.SecondaryScreenLoaded.emit();     
  }
}    
