import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { Grid, iButton, iLabel, UserControl } from "epma-platform/controls";
import {EventEmitter} from '@angular/core';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";


@Component({
    selector: 'ChangeDoseFooter',
    templateUrl: './ChangeDoseFooter.html',
    styleUrls: ['./ChangeDosefooter.css'],
  })


export class ChangeDoseFooter extends UserControl implements AfterViewInit {
    public LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
     if(c){ this.LayoutRoot = c; }
    };
    public cmdChangingdose: iButton;
    @ViewChild("cmdChangingdoseTempRef", {read:iButton, static: false }) set _cmdChangingdose(c: iButton){
     if(c){ this.cmdChangingdose = c; }
    };
    public cmdDaywise: iButton;
    @ViewChild("cmdDaywiseTempRef", {read:iButton, static: false }) set _cmdDaywise(c: iButton){
     if(c){ this.cmdDaywise = c; }
    };
    public cmdClear: iButton;
    @ViewChild("cmdClearTempRef", {read:iButton, static: false }) set _cmdClear(c: iButton){
     if(c){ this.cmdClear = c; }
    };

    public lblDrugName1: iLabel;
    @ViewChild("lblDrugNameTempRef1", {read:iLabel, static: false }) set _lblDrugName1(c: iLabel){
     if(c){ this.lblDrugName1 = c; }
    };
    public _contentLoaded: Boolean;
    @ViewChild("_contentLoadedTempRef", {read:Boolean, static: false }) set __contentLoaded(c: Boolean){
     if(c){ this._contentLoaded = c; }
    };
    public Styles = ControlStyles;
    public ChangeDoseFooterLoadedEvent = new EventEmitter();
        constructor() {
            super();
        }
 
        public ScrollN:string="";

        ngAfterViewInit(): void {
            this.ChangeDoseFooterLoadedEvent.emit();
	    this.getpadding();
                 
        }

        getpadding(){
           this.ScrollN= parseInt(this.lblDrugName1.Text)>2 ? 'Chndosefooterpadding':'';
        }

        removepadding(no:number)
        {
            this.ScrollN=no==1?"":"Chndosefooterpadding";
        }
    }
