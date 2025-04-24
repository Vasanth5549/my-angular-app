import { NgModule } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule, SVGIconModule } from "@progress/kendo-angular-icons";
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DialogsModule } from "@progress/kendo-angular-dialog";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { LabelModule } from "@progress/kendo-angular-label";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { TooltipModule } from '@progress/kendo-angular-tooltip';

@NgModule({
  imports: [
    GridModule,
    IconsModule,
    ButtonModule,
    LayoutModule,
    DialogsModule,
    LabelModule,
    SVGIconModule,
    DropDownsModule,
    TooltipModule,
    InputsModule
  ],
  exports:[
    GridModule,
    IconsModule,
    ButtonModule,
    LayoutModule,
    DialogsModule,
    LabelModule,
    SVGIconModule,
    DropDownsModule,
    TooltipModule,
    InputsModule
  ]
})
export class KendoModule{ }
