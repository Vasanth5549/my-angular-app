import { AfterViewInit, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { iAppDialogWindow } from "epma-platform/models";
import { ObservationResultText } from "../viewmodel/ObservationChartDataVM";
import { GridExtension, RowLoadedEventArgs, iGridViewDataColumn } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';

@Component({
    selector: 'ObservationResultTextChild',
    templateUrl: './observationresulttextchild.html',
    encapsulation: ViewEncapsulation.None
})

export class ObservationResultTextChild extends iAppDialogWindow implements  OnInit, AfterViewInit  {
    ngAfterViewInit(): void {
        //throw new Error("Method not implemented.");
    }
    ngOnInit(): void {
        //throw new Error("Method not implemented.");
    }
    public objObserRsttext: ObservationResultText;
    
}