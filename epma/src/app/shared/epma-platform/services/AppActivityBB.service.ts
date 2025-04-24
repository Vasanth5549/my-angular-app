import { Component } from "@angular/core";
import { UserControl } from "../controls/UserControl";

@Component({
    template: '<p>{{DataContext.text}}</p>'
})

export class AppActivityBB  extends UserControl{
    constructor() {
        super();
        this.InitializeComponent();
    }

    InitializeComponent(){
        this.DataContext = {text:"Test"};
    }
}