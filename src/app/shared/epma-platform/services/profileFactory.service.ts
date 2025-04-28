import { Injectable } from '@angular/core';
import { AggregateService } from './aggregate.service';
import { ProfileContext, RTEEventargs,Level } from '../models/model';
import { InjectorInstance } from '../../../app.module';
import { UtilityService } from './utility.service';
import { ProfileTypeConversion } from './profileTypeConversion.service';
import { DelegateArgs, IProfileProp, List, ObservableCollection, GridConfig as GridConfigClass} from 'epma-platform/models';
import * as Class from 'src/app/lorappslprofiletypes/medication';
import { parseBooleans } from 'xml2js/lib/processors';

@Injectable({
    providedIn: 'root'
})
export class ProfileFactoryType {
    
    public static Level  = Level;

    constructor() { }

    OnProfileListLoaded: Function;
    OnProfileLoaded: Function;

    public GetProfilesData(oProfileContextList:List<ProfileContext>);
    public GetProfilesData(oProfileContextList:ProfileContext[]);
    public GetProfilesData(oProfileContextList:ProfileContext[] | List<ProfileContext>, isParseBoolean=false){
        let ProfileContextList = oProfileContextList instanceof List ? oProfileContextList.ToArray() : oProfileContextList
        let aggregateService: AggregateService = InjectorInstance.get<AggregateService>(AggregateService);
        let objSB = "";
        let bIsProExists = true;
        ProfileContextList.forEach(objReq =>
        {
            if (objReq.ContextCode && objReq.ProfileItemKey)
            {
                bIsProExists = false;
                objSB = objSB.concat(objReq.ContextCode + "^" + objReq.ProfileItemKey + "^" + (objReq.ProfileLevel?.toString() ? objReq.ProfileLevel.toString() + "^" : "Default") + objReq.ProfileType + 'PublicKeyToken=null' + "$");
            }
        })
        if (!bIsProExists)
        {
            let sender = {Request:objSB};
            const requestBody = "FunctionName=GetProfiles&ProfileKeys=" + objSB;
            const flowID = 'GetProfileData';
            let options = { explicitArray : false  };
            aggregateService.postAggregateData(flowID, requestBody).subscribe({
                next: (data) => {
                    UtilityService.xmlToJson(data,options).subscribe({
                        next: (objList: any) => {
                            ProfileContextList.forEach((objReq,index) =>{
                                if (objReq.ContextCode && objReq.ProfileItemKey){
                                    if(objList.Items.Item[index] == null)
                                    objReq.ProfileData = this.Shallowcopy(objList.Items.Item.Data);
                                    else
                                    objReq.ProfileData = this.Shallowcopy(objList.Items.Item[index].Data);

                                }
                            })
                            // this.OnProfileListLoaded(sender,ProfileContextList)
                            if (oProfileContextList instanceof List)
                              this.OnProfileListLoaded(
                                sender,
                                new List(ProfileContextList)
                              );
                            else
                              this.OnProfileListLoaded(
                                sender,
                                ProfileContextList
                              );
                        },
                        error: (err) => {
                            this.OnProfileListLoaded(sender,null)
                            console.log(err); 
                        }
                    }
                    )
                },
                error: (err) => {
                    console.log(err);
                }
            })
        }
    }
    public GetProfile<T>( ContextCode: string, ItemKey: string, level?: Level)
    { 
        this.GetProfileData<T>( ContextCode, ItemKey, level || null as any, this.OnProfileLoaded);
    }
    
    
    public GetProfileData<T>(ContextCode: string, ItemKey: string,level: Level, OnProfilePropLoaded:Function) {
        let aggregateService: AggregateService = InjectorInstance.get<AggregateService>(AggregateService);

        if (ContextCode === null || ContextCode === "" || ItemKey === null || ItemKey === "") {
            OnProfilePropLoaded({ Request: ContextCode, Result: null });
            return;
        }

        let Request:ProfileContext = {} as ProfileContext;
        Request.ContextCode = ContextCode;
        Request.ProfileItemKey = ItemKey;
        if (level != null) {
            Request.ProfileLevel = level;
        }

        
        let reqBody = "FunctionName=GetProfileObject&FormCode=" + ContextCode + "&ProfileKey=" + ItemKey + "&FQN=$" + 'LorArcSLProfileTypes, Version=6.0.0.1, Culture=neutral,';
        if (level != null) {
            reqBody += "&ProfileLevel=" + level.toString();
        }
        const flowID = 'GetProfileData';
        let options = { explicitArray : false  };
        aggregateService.postAggregateData(flowID, reqBody).subscribe({
            next: (data) => {
                UtilityService.xmlToJson(data, options).subscribe({
                    next: (objConfig: any) => {
                        Request.ProfileData = objConfig;
                        const sKeys: string[] = reqBody.split('&');
                        let objProfileData:IProfileProp = new IProfileProp();
                        objProfileData.FormCode = sKeys[1].split('=')[1];
                        objProfileData.ProfileKey =  sKeys[2].split('=')[1];
                        objProfileData.Profile = this.Shallowcopy(objConfig);
                        OnProfilePropLoaded(this, objProfileData);
            
                    },
                    error: (err) => {
                        OnProfilePropLoaded(this,null)
                        console.log(err);
                        console.log("error in GetProfileData");
                    }
                }
                )
            },
            error: (err) => {
                console.log(err);
            }
        })
    }
    
    public Shallowcopy<T>(ProfileData){
        let Result;
        let profileType = Object.keys(ProfileData)[0];
        let instance;
        if (profileType == 'GridConfig') instance = new GridConfigClass();
        else instance = new Class[profileType]();
     //   let instance = ProfileTypeConversion.getInstance(profileType);

        if(ProfileData && ProfileData[profileType]){
            this.setProfileData(ProfileData[profileType], instance, '');
            Result = instance;
        }
        return Result;
    }
    singleElementArrayProfileList = ["LineDisplayConfigurations",
    "EncounterPresConfigurations",
    "InfusDeliveryDevice",
    "OxygenMasks",
    "ActivityConfigurationData",
    "PowerSearchConfigurationData",
    "LinkInformation",
    "ConflictConfigurations",
    "MedicalOxyConfig"]
    public setProfileData(data, obj, hasProperty:string) {
        Object.keys(data).forEach((property) => {
            if ( hasProperty ||( typeof Object.getOwnPropertyDescriptor(obj['__proto__'], property)?.get === 'function' && obj['__proto__'].hasOwnProperty(property)) ) {
                let key = hasProperty || property;
                if(this.singleElementArrayProfileList.includes(property) && typeof data[property] == 'object' && !Array.isArray(data[property])  )
                {
                    data[property] = [data[property]];
                }

                if( typeof data[property] == 'object' && !Array.isArray(data[property])){
                    this.setProfileData(data[property],obj, hasProperty || property);
                }else{
                    if(Array.isArray(data[property])) {
                        obj[key] =  new ObservableCollection(data[property]);
                    }
                    else if(typeof obj[property] == 'boolean'){
                        obj[key] =  data[property] =='true' || data[property] == 'True'? true : false;
                    }
                    else {
                    obj[key] =  data[property] ;                    
                    }
                }
            }else{
                if( typeof data[property] == 'object' && !Array.isArray(data[property])){
                    this.setProfileData(data[property],obj,'');
                }
            }
        });
    }
}
