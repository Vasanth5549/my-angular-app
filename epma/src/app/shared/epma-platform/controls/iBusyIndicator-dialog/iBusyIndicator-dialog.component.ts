import { Component } from '@angular/core';
import { DialogContentBase } from '@progress/kendo-angular-dialog';
@Component({
    selector: 'app-iBusyIndicator-dialog',
    templateUrl: './iBusyIndicator-dialog.component.html',
    styleUrls: ['./iBusyIndicator-dialog.component.css']
})
export class iBusyIndicatorDialog extends DialogContentBase {
    public loadingPanelVisible = false;
    public buttonText = "Show Loading Panel";

    ngOnInit(): void {

        this.startSpinner();      
    }

    startSpinner() {
        this.loadingPanelVisible = true;

    }
    stopSpinner() {
        this.loadingPanelVisible = false;
        this.dialog.close();
    }
}