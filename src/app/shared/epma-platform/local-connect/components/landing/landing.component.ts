import { Component } from "@angular/core";
import * as Menu from 'src/assets/json/menuCode.json'; 


@Component({
    selector: 'menu-landing-page',
    templateUrl: './landing.component.html',
})

export class MenuLandingPage {

    menuArray:any[]=[];

    constructor() { }

    ngOnInit(): void {
        this.getMenuCode()
     }
     getMenuCode(){
        this.menuArray = Menu['default'];        
     }
    
}