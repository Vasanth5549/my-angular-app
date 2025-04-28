import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog, Grid, UserControl, iButton } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';

@Component({
    selector: 'PackOptionChildfooter',
    templateUrl: './PackOptionChildfooter.html'    
  }) 

export class PackOptionChildfooter extends UserControl implements AfterViewInit{
    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private cmdPrescribingOptions: iButton;
    @ViewChild("cmdPrescribingOptionsTempRef", { read: iButton, static: false }) set _cmdPrescribingOptions(c: iButton) {
        if (c) { this.cmdPrescribingOptions = c; }
    };

    ngAfterViewInit(): void 
    {    
        this.ChildWindow_Loaded(null,null);      
    }

    constructor() {
        super();
        // InitializeComponent();
    }

    public FooterLoaded = new EventEmitter();
    private ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {   
        this.FooterLoaded.emit();     
    }
}
