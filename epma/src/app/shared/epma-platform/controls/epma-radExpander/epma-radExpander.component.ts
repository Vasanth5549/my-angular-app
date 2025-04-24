import { Component, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from "@angular/core";
import { Control } from "../Control";
import { SolidColorBrush, StackPanel, Thickness } from "epma-platform/controls";
import { ExpansionPanelActionEvent, ExpansionPanelComponent } from "@progress/kendo-angular-layout";
import { RadRoutedEventArgs } from "epma-platform/models";

@Component({
    selector: 'RadExpander',
    templateUrl: './epma-radExpander.component.html',
    styleUrls: ['./epma-radExpander.component.css'],
})

export class RadExpander extends Control implements OnInit {
    // public Background:SolidColorBrush;
    // public BorderThickness:Thickness;
    @Input() public Expanded_Func: Function | string;
    @Input() public Collapsed_Func: Function | string;
    @Output() public Expanded: EventEmitter<RadRoutedEventArgs> = new EventEmitter();
    @Output() public Collapsed: EventEmitter<RadRoutedEventArgs> = new EventEmitter();

    @Input() public Header;
    @Input() public BorderBrush: SolidColorBrush;
    @Input() public IsExpanded: boolean;
    @Input() public Content: TemplateRef<any>;
    @Input() public items: any[] = [];
    @Input() public stopPrevent:Boolean;
    @Input() public CanExpand: boolean = false;


    @ViewChildren(ExpansionPanelComponent) panels: QueryList<ExpansionPanelComponent>;

    ngOnInit(): void {
    }

    // public onAction(index: number): void {
    //     this.panels.forEach((panel, idx) => {
    //         if (idx !== index && panel.expanded) {
    //             panel.toggle();
    //         }
    //     });
    // }
    public track : boolean = true
    public onAction(e: ExpansionPanelActionEvent): void {
        let re: RadRoutedEventArgs = new RadRoutedEventArgs();
        
        if(e.action == "expand"){
            this.track = true
        }else if(e.action == "collapse"){
            this.track = false
        }

        re.Source = this;
        if(!this.CanExpand == true){
            this.IsExpanded = !this.IsExpanded
        }
        if (this.IsExpanded) {
            if (this.Expanded_Func instanceof Function) {
                this.Expanded_Func({}, re);
            }
            this.Expanded.emit(re);
        } else {
            e.preventDefault(); 
            // This condition is used to allow expansion on initial state in medication meddrc page
            /*if(this.stopPrevent != false){
              e.preventDefault();  
          }*/
            if (this.Collapsed_Func instanceof Function) {
                this.Collapsed_Func({}, re);
            }
            this.Collapsed.emit(re);
        }

    }
}