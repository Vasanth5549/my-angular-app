import { Component, Input } from "@angular/core";
import { Control } from "../Control";
import { Align } from "@progress/kendo-angular-popup";
//import { Visibility } from "../../controls-model/Visibility";

@Component({
    selector: 'iToggleDropDown',
    templateUrl: './epma-itoggledropdown.component.html',
    styleUrls: ['./epma-itoggledropdown.component.css']
})
export class iToggleDropDown extends Control {
    iconclass: string = "k-i-arrow-60-down";
    OpenPopUp: boolean = false;
    toggleText: string = "Show";
    @Input() Caption: any;
    public popupAlign: Align = { horizontal: "right", vertical: "top" };

    ngOnInit() {
    
    }
    public onToggle(): void {
        this.OpenPopUp = !this.OpenPopUp;
        this.iconclass = this.OpenPopUp ? "k-i-arrow-60-up" : "k-i-arrow-60-down";
        this.toggleText = this.OpenPopUp ? "Hide" : "Show";
    }

}
