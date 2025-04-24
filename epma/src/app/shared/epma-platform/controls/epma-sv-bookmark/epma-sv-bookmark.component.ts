import { Component } from "@angular/core";
import { Control } from "../Control";

@Component({
    selector: 'iBookMark',
    templateUrl: './epma-sv-bookmark.component.html',
    styleUrls: ['./epma-sv-bookmark.component.css']
})
export class iBookMark extends Control {

    pid = "grid"+(new Date()).getTime().toString();
    get offset() {
        const bookmark = document.getElementById(this.pid);//43
        const bookmarkRect = bookmark.getBoundingClientRect();//45
        const offset = bookmarkRect.top//46.1
        return offset;
    }
}