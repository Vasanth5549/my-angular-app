import { Injectable } from '@angular/core';

import { RadioModel, iRadioButton } from "./epma-radiobutton/epma-radiobutton.component";

class RadioButtonModel {
    model: RadioModel;
    elements: iRadioButton[] = [];
    count: number = 0;
}

class RadioContentModel {
    key: string = '';
    buttons: RadioButtonModel;
}

@Injectable({
    providedIn: 'root'
})
export class iRadioButtonService {

    radioContentModels: RadioContentModel[] = [];
    constructor() { }
    arriRadioButton: iRadioButton[] = [];
    change(value, name) {
        let radios = this.arriRadioButton.filter(val => {
            return val.GroupName == name
        });

        radios.forEach(element => {
            if (element.Text === value) {
                element.IsChecked = { value: 'true' };
            } else if (element.IsChecked) {
                element.IsChecked = { value: 'false' };
            } else {
            }
        });
    }

    remove(e) {
        // const index = this.arriRadioButton.findIndex((obj) => {
        //     return obj.Value === e.Value && obj.Name == e.Name;
        // });
        // this.arriRadioButton.splice(index, 1);
        let index = this.radioContentModels.findIndex((element) => {
            return element.key == e.GroupName
        });
        this.radioContentModels.splice(index, 1);
    }

    register(radioButton: iRadioButton): RadioModel {
        let item: RadioContentModel = this.radioContentModels.find((element) => {
            return element.key == radioButton.GroupName
        });
        if (item) {
            radioButton.model = item.buttons.model;
            if (radioButton.IsChecked) {
                radioButton.model.IsChecked = radioButton.Text;
            }
            radioButton.model.radioButtons.push(radioButton);
            // radioButton.model.IsChecked = radioButton.IsChecked;
            item.buttons.count = item.buttons.count + 1;
            item.buttons.elements.push(radioButton);
            return radioButton.model;
        } else {
            let cm = new RadioContentModel();
            cm.key = radioButton.GroupName;
            cm.buttons = new RadioButtonModel();
            cm.buttons.model = new RadioModel(radioButton.Text);
            radioButton.model = cm.buttons.model;
            if (radioButton.IsChecked) {
                radioButton.model.IsChecked = radioButton.Text;
            }
            radioButton.model.radioButtons.push(radioButton);
            // radioButton.model.IsChecked = radioButton.IsChecked;
            cm.buttons.count = cm.buttons.count + 1;
            cm.buttons.elements.push(radioButton);
            this.radioContentModels.push(cm);
            return radioButton.model;
        }
    }
}
