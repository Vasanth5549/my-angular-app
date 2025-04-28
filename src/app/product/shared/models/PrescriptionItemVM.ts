import { ObservableCollection } from "../../../shared/epma-platform/models/observable-collection";

export class ParentbaseVM {
    MedsResolve: ObservableCollection<any> = new ObservableCollection<any>();
}

export class PrescriptionItemVM {

    // added
  
    FormViewerDetails: any = {
      BasicDetails: {
        StartDTTM: "String data",
        InfusionDetails : {GroupSequenceNo : 1},
        SequenceInfo : { GroupSequenceNo : 1,ItemSequenceNo:1,IsLastItem : false}
      }
    };
  
    SubscribeFormViewerIconClickEvent : Function;
    GetConflictImageStatus : Function = () => {};
    PrescriptionItemStatusCode = "";
    IsAmendment = "1";
    IsPGD = "";
    TrafficSymbol = ""
    PrescriptionItemStatus = "PrescriptionItemStatus";
    SubscribeConflictIconEventForPrescNote(infoIcon){}
    SubscribeConflictIconClickEvent(infoIcon){}
    IsConflictsExists = "";
    IsGroupHeader  = false;
    OsInstance = {OsIsGroupHeader : false,OsSeqGroupNo:1,OsIsLastItem:"",OsGroupHeaderName:""};
    MedLineDisplayText = "";
    IsGPConnectItem : ""
    PrescriptionItem = "";
  
    ParentbaseVM: ParentbaseVM = new ParentbaseVM();
}