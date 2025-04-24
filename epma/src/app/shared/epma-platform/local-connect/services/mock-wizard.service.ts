import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as wizardData from 'src/assets/json/mock-wizard-data.json' ;
import { environment } from 'src/environments/environment';
import { Dictionary } from '../../index.dictionary';

@Injectable({
    providedIn: 'root'
  })

export class MockWizardDataService{
    public menuQueryCollection: Dictionary<string, string> = new Dictionary<string, string>([]);
    constructor(private http:HttpClient){}

    getMockWizardData(){
        let _wizardData = wizardData['default']; //need to have a filter from array of contextdata from mock-wizard-data which is matching the menucode in environment.ts        
        let data = _wizardData.filter(x=>x.menuCode == environment.menuCode)
        return data[0].contextData;
    }
    getMockGetContextData(){
        let headers = this.getFormHeaders();
       return this.http.get('assets/json/mock-contextdata.xaml',{ headers, responseType: 'text'});
    }
    private getFormHeaders(){
        return new HttpHeaders().set("Content-Type" , "application/x-www-form-urlencoded")
      }
}