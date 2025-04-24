import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jsonData from 'src/assets/json/mock-grid.json' ;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http : HttpClient) { }


  getDataFromServer(){
    return jsonData['default'];
    // return this._http.get('../assets/json/mock-grid.son');
  }
}
