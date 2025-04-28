import { Component, ViewChild } from '@angular/core';
import {iAppDialogWindow, ContentControl } from 'epma-platform/models';
import '../../shared/epma-platform/models/string.extensions';
import { MedTitratedDoseChild } from './medtitrateddosechild';
import { Grid } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { TitratedDoseCommonVM } from '../viewmodel/TitratedDoseDetailsCommonVM';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';

@Component({ 
    selector: 'MedTitratedDoseView', 
    templateUrl: './MedTitratedDoseView.html' 
})
export class MedTitratedDoseView extends iAppDialogWindow {    
    
    private grdMedTitratedDose: Grid;
    @ViewChild("grdMedTitratedDoseTempRef", { read: Grid, static: false }) set _grdMedTitratedDose(c: Grid) {
        if (c) { this.grdMedTitratedDose = c; }
    };
    // private ContentCtrlMedTitratedDoseView: ContentControl;
    // @ViewChild("ContentCtrlMedTitratedDoseViewTempRef", { read: ContentControl, static: false }) set _ContentCtrlMedTitratedDoseView(c: ContentControl) {
    //     if (c) { this.ContentCtrlMedTitratedDoseView = c; }
    // };
    oMedTitratedDoseChild: MedTitratedDoseChild = null;
    oPrescriptionItemOID: number = 0;
    public oTitratedDoseCommonVM: TitratedDoseCommonVM;
    ngOnInit(): void {
        Busyindicator.SetStatusBusy("Titrateddetails");
    }
    ngAfterViewInit(): void {        
        this.MedTitratedDoseView_Loaded(null,null); 
        //this.oMedTitratedDoseChild.constructorImpl(this.oTitratedDoseCommonVM);       
    }
    constructor(_oTitratedDoseCommonVM: TitratedDoseCommonVM) {
        super();
        this.oTitratedDoseCommonVM = _oTitratedDoseCommonVM;
        //InitializeComponent();
        //Busyindicator.SetStatusBusy("Titrateddetails");
        //this.oMedTitratedDoseChild = new MedTitratedDoseChild(_oTitratedDoseCommonVM);
        //this.oMedTitratedDoseChild.constructorImpl(oTitratedDoseCommonVM);
    }
    private MedTitratedDoseView_Loaded(sender: Object, e: RoutedEventArgs): void {
        //this.ContentCtrlMedTitratedDoseView.Content = this.oMedTitratedDoseChild;
    }
    private MedTitratedDoseView_Unloaded(sender: Object, e: RoutedEventArgs): void {
        //this.ContentCtrlMedTitratedDoseView.Content = null;
        this.oMedTitratedDoseChild = null;
    }
}