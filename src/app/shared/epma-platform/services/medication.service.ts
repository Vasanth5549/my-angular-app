import { Injectable } from '@angular/core';
import { AggregateService } from 'epma-platform/services';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  flowID ="GetMedicationList";

  constructor(private _aggregateService:AggregateService) { }

  GetMedicationList(){

    let reqBody = {
      "oMedicationListCriteria": {
        "oMedicationListCriteriaBC": {
          "LastModifiedAt": "0001-01-01T00:00:00",
          "PatientOID": 1000000077205,
          "EncounterOID": 1000000083682,
          "PrescriptionType": "CC_FOR_ADMIN",
          "ProfileCancelledDrugFlag": 0,
          "ProfileDiscontinuedDrugFlag": 8,
          "ProfileHoldDuration": 28,
          "McVersion": "27",
          "IsDoPanel": 0,
          "ConflictCheck": 0,
          "ServiceOID": 600000002247,
          "LocationOID": 600000081144,
          "sMenuCode": "MN_MEDINPATSL_P2",
          "CAPresType": "CC_FOR_ADMIN",
          "Identifyingoid": 0,
          "AlreadyPrescribedItem": 0,
          "currentEncounterOID": 1000000083682,
          "IsResolutionGird": 1
        },
        "oContextInformation": {
          "UserID": 1003001,
          "OrganizationID": "600000161691",
          "SecurityToken": "iv0spdek0ionp3ywyypjkrqz#638001598867676369",
          "MultiCampusPattern": "NONE",
          "ReleaseVersion": "2"
        }
      }
    }

    this._aggregateService.postAggregateData(this.flowID,reqBody).subscribe(data =>{ 

      let getdata = data;      
      },err => {
        console.log(err);
      })
  }

}
