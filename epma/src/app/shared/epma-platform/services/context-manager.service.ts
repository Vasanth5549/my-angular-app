import { Injectable } from '@angular/core';
import { ContextType, EventContextModel } from 'epma-platform/models';
import { MediatorDataService } from 'epma-platform/services';

@Injectable({
  providedIn: 'root'
})
export class ContextManagerService {

  constructor(private _mediatorDataService:MediatorDataService) {  }

  public getContextData(contextType : ContextType){
    var ctx = this._mediatorDataService.contextStore.find((data:any) => {
      if(data.contextCode == contextType)
      return data.context;
    });
    return JSON.stringify(ctx?.context);
  }
}
