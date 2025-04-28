import { Component, Input, ViewEncapsulation } from "@angular/core";
import { Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'MedsAdminObservationTooltip',
    templateUrl: './MedsAdminObservationTooltip.html',
    encapsulation: ViewEncapsulation.None
})
export class MedsAdminObservationTooltip {

    @Input() public dataItem: any;
    @Input() public showActionLinks: boolean = false;
    @Output() public lnkModify_Click_ee = new EventEmitter<any>();
    @Output() public lnkCancel_Click_ee = new EventEmitter<any>();

    public lnkModify_Click(dataItem){
        this.lnkModify_Click_ee.emit(dataItem);
    }
    public lnkCancel_Click(dataItem){
        this.lnkCancel_Click_ee.emit(dataItem);
    }


    


}