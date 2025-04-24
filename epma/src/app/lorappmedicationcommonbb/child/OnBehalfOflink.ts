import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import { Grid } from 'epma-platform/controls';
import { iAppDialogWindow } from 'epma-platform/models';
import 'epma-platform/stringextension';
import { Resource } from 'src/app/lorappmanageprescriptionbbui/resource';
import { IPPMABaseVM } from 'src/app/lorappmanageprescriptionbbui/viewmodel/ippmabasevm';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { OnBehalfOfDetails } from '../viewmodel/prescriptionitemdetailsvm';

@Component({
    selector: 'OnBehalfOflink',
    templateUrl: './onbehalfoflink.html',
})
export class OnBehalfOflink extends iAppDialogWindow {
    public LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public grdOnBehalfList: GridExtension = new GridExtension();;
    @ViewChild("grdOnBehalfListTempRef", { read: GridComponent, static: false }) set _grdOnBehalfList(c: GridComponent) {
        if (c) { this.grdOnBehalfList.grid = c; }
    };

    public onbof = Resource.onbehalfof;
    // public DischargeLeaveDTTMConvertor: DTTMDisplay;
    oVM: IPPMABaseVM;
    prescriptionItemOid: number
    OnBehalfOflinkDetails: OnBehalfOfDetails;

    ngAfterViewInit(): void {
        this.OnBehalfOflinkDetails_Loaded({}, null);
    }

    constructor() {
        super();
    }

    constructorImpl(prescriptionItemOid: number) {
        this.Loaded = (s, e) => { this.OnBehalfOflinkDetails_Loaded(s, e); };
        this.OnBehalfOflinkDetails = new OnBehalfOfDetails();
        this.OnBehalfOflinkDetails.PrescriptionItemOid = prescriptionItemOid;
    }

    OnBehalfOflinkDetails_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.OnBehalfOflinkDetails.GetOnBehalfOfDetails();
        this.DataContext = this.OnBehalfOflinkDetails;
        this.grdOnBehalfList.ItemsSource = this.OnBehalfOflinkDetails.OnBehalfLink;
        this.grdOnBehalfList.SetBinding('data', this.OnBehalfOflinkDetails.OnBehalfLink);
    }
}

