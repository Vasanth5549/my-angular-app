import { Injectable } from '@angular/core';
import { FontWeights } from 'epma-platform/controls';
import { DisplayItem, DrugItem } from './models/drugItem';
import { TextBlock } from 'epma-platform/controls';
@Injectable({
  providedIn: 'root'
})
export class CommonService 
{
  tbDoseWrapLbl: TextBlock;
  constructor() { }
  DoseConverter(value: any) {
    if (value !== null) {
     
      let objDrugItem: DrugItem = value as DrugItem;
      this.tbDoseWrapLbl.Margin = '0, 0, 5, 0';
      this.tbDoseWrapLbl.FontSize = 10;
      this.tbDoseWrapLbl.HorizontalAlignment = 'center';
      this.tbDoseWrapLbl.VerticalAlignment = 'center';
      this.tbDoseWrapLbl.TextWrapping = 'wrap';

      //Dose
      if (!String.IsNullOrEmpty(objDrugItem.DoseLabel)) {
        let rnDoseVal: DisplayItem = {
          ControlType: 'span',
          TextContent: objDrugItem.DoseLabel + ' ',
          Styles: {
            Color: objDrugItem.DRSForecolor ? objDrugItem.DRSForecolor : '',
            //FontWeight: FontWeights.Bold,
            FontSize: 10,
          }
        };
        this.tbDoseWrapLbl.Inlines.Add(rnDoseVal);
      }
      //Strength
      if (!String.IsNullOrEmpty(objDrugItem.StrengthLabel)) {
        let rnStrengthLbl: DisplayItem = {
          ControlType: 'span',
          TextContent: objDrugItem.StrengthLabel + ' ',
          Styles: {
            Color: objDrugItem.DRSForecolor ? objDrugItem.DRSForecolor : '',
            //FontWeight: FontWeights.Bold,
            FontSize: 10,
          }
        };
        this.tbDoseWrapLbl.Inlines.Add(rnStrengthLbl);
        let rnStrengthVal: DisplayItem = {
          ControlType: 'span',
          TextContent: objDrugItem.Strength ? objDrugItem.Strength + ' ' : '',
          Styles: {
            Color: '#FF0000',
            //FontWeight: FontWeights.Medium,
            FontSize: 11,
          }
        };
        this.tbDoseWrapLbl.Inlines.Add(rnStrengthVal);
      }
      //FrequencyText
      if (!String.IsNullOrEmpty(objDrugItem.FrequencyText)) {
        let rnFrequencyText1: DisplayItem = {
          ControlType: 'span',
          TextContent: objDrugItem.Dose ? ' - ' + objDrugItem.FrequencyText + ' ' : objDrugItem.FrequencyText + ' ',
          Styles: {
            Color: '#FF0000',
            //FontWeight: FontWeights.Medium,
            FontSize: 11,
          }
        };
        this.tbDoseWrapLbl.Inlines.Add(rnFrequencyText1);
      }
      //AsRequiredText 
      if (!String.IsNullOrEmpty(objDrugItem.FrequencyText)) {
        let rnAsRequiredText1: DisplayItem = {
          ControlType: 'span',
          TextContent: objDrugItem.Dose || objDrugItem.FrequencyText ? ' ' + objDrugItem.AsRequiredText + ' ' : objDrugItem.AsRequiredText + ' ',
          Styles: {
            ForeGround: '#FF0000',
            //FontWeight: FontWeights.Medium,
            FontSize: 11,
          }
        };
        this.tbDoseWrapLbl.Inlines.Add(rnAsRequiredText1);
      }
      // Weekly Frequency values 
      if (!String.IsNullOrEmpty(objDrugItem.FrequencyText)) {
        let rnFrequencyWeeklyLbl: DisplayItem = {
          ControlType: 'span',
          TextContent: objDrugItem.FrequencyWeeklyLabel + ' ',
          Styles: {
            ForeGround: objDrugItem.DRSForecolor ? objDrugItem.DRSForecolor : '',
            //FontWeight: FontWeights.Bold,
            FontSize: 10,
          }
        };
        this.tbDoseWrapLbl.Inlines.Add(rnFrequencyWeeklyLbl);

        let rnFrequencyWeeklyVal: DisplayItem = {
          ControlType: 'span',
          TextContent: objDrugItem.FrequencyWeeklyValue ? objDrugItem.FrequencyWeeklyValue + ' ' : '',
          Styles: {
            ForeGround: '#FF0000',
            //FontWeight: FontWeights.Medium,
            FontSize: 11,
          }
        };
        this.tbDoseWrapLbl.Inlines.Add(rnFrequencyWeeklyVal);
      }
    }
    return this.tbDoseWrapLbl;
  }
  RouteConverter(value: any) {
    if (value !== null) {
  
      let objDrugItem: DrugItem = value as DrugItem;
      if (!String.IsNullOrEmpty(objDrugItem.RouteLabel)) {
        this.tbDoseWrapLbl.Margin = '0, 0, 5, 0';
        this.tbDoseWrapLbl.FontWeight = FontWeights.Bold;
        this.tbDoseWrapLbl.FontSize = 10;
        this.tbDoseWrapLbl.HorizontalAlignment = 'center';
        this.tbDoseWrapLbl.VerticalAlignment = 'center';

        let bindDoseLbl: DisplayItem = {
          ControlType: 'span',
          TextContent: objDrugItem.RouteLabel,
          Styles: {
            Color: objDrugItem.DRSForecolor ? objDrugItem.DRSForecolor : '',
          }
        };
        this.tbDoseWrapLbl.Inlines.Add(bindDoseLbl);
      }
      if (!String.IsNullOrEmpty(objDrugItem.Route)) {
        let routeArray: string[];
        routeArray = objDrugItem.Route.split(' ');
        for (let indx = 0; indx < routeArray.length; indx++) {
        
            
        }
      }
      if (!String.IsNullOrEmpty(objDrugItem.SiteLabel)) {
      this.tbDoseWrapLbl.Margin = '0,0,5,0';
      this.tbDoseWrapLbl.FontWeight = FontWeights.Bold;
      this.tbDoseWrapLbl.FontSize = 10;
      this.tbDoseWrapLbl.HorizontalAlignment = 'center';
      this.tbDoseWrapLbl.VerticalAlignment = 'center';
      let bindDoseLbl: DisplayItem = {
        ControlType: 'span',
        TextContent: objDrugItem.SiteLabel,
        Styles: {
          Color: objDrugItem.DRSForecolor ? objDrugItem.DRSForecolor : '',
        }
      };
      this.tbDoseWrapLbl.Inlines.Add(bindDoseLbl);
      }
      if (!String.IsNullOrEmpty(objDrugItem.Site)) {
        let routeArray: string[];
        routeArray = objDrugItem.Route.split(' ');
        for (let indx = 0; indx < routeArray.length; indx++) {
          this.tbDoseWrapLbl.Margin = '0,0,5,0';
          this.tbDoseWrapLbl.TextWrapping = 'wrap';
          let bindDoseLbl: DisplayItem = {
            ControlType: 'span',
            TextContent: routeArray[indx],
          }
          this.tbDoseWrapLbl.Inlines.Add(bindDoseLbl);
      }
    }
    }
  }
  public static setDynamicScrollviewerHeight(){
    let maxScrollContentHeight;
    let elem = (document.querySelectorAll('medformviewer')[0])?.querySelectorAll('#Medform')[0];
    if(elem && elem.children.length > 1){
        // (overallHeight - (header + footer + padding)) 700 - (33 + 50 + 32) = 585  //elem.scrollHeight;
        // let medformviewerHeight = (700 - 115);//608; 
        if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
          let medformviewerHeight = ((window.innerHeight - (105 * window.devicePixelRatio)) / window.devicePixelRatio);
          let itemsHeight = 0;
          for (let i = 0; i < elem.children.length -1; i++) {
              itemsHeight += elem.children[i].scrollHeight;
          }      
          maxScrollContentHeight = (medformviewerHeight - itemsHeight);
        }
        else {
        let medformviewerHeight = ((700 - (105 * window.devicePixelRatio)) / window.devicePixelRatio);
        let itemsHeight = 0;
        for (let i = 0; i < elem.children.length -1; i++) {
            itemsHeight += elem.children[i].scrollHeight;
        }      
        maxScrollContentHeight = (medformviewerHeight - itemsHeight);
      }
    }
    return maxScrollContentHeight;
  }
  public static setDynamicScrollHeight_MedSupplyInstructions(TabName: string){
    let maxGridHeight;
    let elem;
    if(TabName)
      elem = (document.querySelectorAll('medsupplydispensinginstructionstab')[0])?.querySelectorAll(TabName)[0];
    if(elem && elem.children.length > 1){
        // (overallHeight - (header + footer + padding)) 750 - (33 + 50 + 32) = 65  //elem.scrollHeight;
        let medformviewerHeight = ((700 - (105 * window.devicePixelRatio)) / window.devicePixelRatio);
        let itemsHeight = 0;
        for (let i = 0; i < elem.children.length -1; i++) {
            itemsHeight += elem.children[i].scrollHeight;
        }      
        maxGridHeight = (medformviewerHeight - itemsHeight);
    }
    return maxGridHeight;
  }
}

