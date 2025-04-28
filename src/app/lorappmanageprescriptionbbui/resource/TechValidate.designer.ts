const resourceCulture = "";
const Data = [{"key":"Multicomponent_Header","value":"Component name"},{"key":"Supplyinscomments_Header","value":"Supply instructions/comments"},{"key":"Producttbsupp_Header","value":"Product to be supplied"},{"key":"Quantity_Header","value":"Quantity per dose"},{"key":"TotalQuantity_Header","value":"Total quantity"},{"key":"SupplyStatus","value":"Supply status"},{"key":"cmdLinks_Text","value":"Links"},{"key":"cmdOtherLinks_Text","value":"Other links"},{"key":"Otherinformation_Header","value":"Other information"},{"key":"PrescriptionItem_Header","value":"Prescription item"},{"key":"StartDTTM_Header","value":"Start date"},{"key":"cmdLinks_Tooltip","value":"Click to view drug monograph of the drug"},{"key":"cmdOtherLinks_Tooltip","value":"Click here to view other links of the drug"},{"key":"SupplyDisp_Header","value":"Supply instructions"},{"key":"DeactCompItem","value":"The component(s) of"},{"key":"DeactCompItem_Last_Msg","value":"have been deactivated since they were prescribed. A replacement must be prescribed/selected."},{"key":"DeactPresItem","value":"The medication item(s)"},{"key":"DeactPresItem_Lastdiff_Msg","value":"have been deactivated. A replacement must be prescribed/selected."},{"key":"DeactPresItem_Last_Msg","value":"have been deactivated since they were prescribed. A replacement must be prescribed/selected"},{"key":"DeactPresItem_Mid_Msg","value":"have been deactivated. The component(s) of"},{"key":"cmdMedAdmin_Text","value":"Medication administration"},{"key":"cmdMedAdmin_Tooltip","value":"Click to view medication administration chart"},{"key":"SuppCom_Header","value":"Supply comments"},{"key":"Supply_Default_Txt","value":"Select supply instructions to enter value(s)"},{"key":"Supply_Title","value":"Supply instructions - LORENZO"},{"key":"Duplicate_check","value":"This item is already added"},{"key":"RemoveBeginTxt","value":"The prescription item"},{"key":"RemoveEndTxt","value":"will now be considered as not technically validated"},{"key":"ProdOptMSG","value":"Please select the product option"},{"key":"Addsupinst","value":"Select to add supply instructions"},{"key":"CCCancelSup","value":"CC_CanMedreq"},{"key":"CCDontSup","value":"CC_MedDontSupply"},{"key":"CCSup","value":"cc_supply"},{"key":"CC_CHLD","value":"CC_OCCRALLCHILD"},{"key":"Clerking","value":"Clerked medication items"},{"key":"Comnts","value":"Comments"},{"key":"Discharge","value":"Discharge medication items"},{"key":"Dispinst","value":"Dispensing instructions"},{"key":"DispTitle","value":"\"Dispensing instructions - LORENZO\""},{"key":"CancelSup","value":"Cancel request"},{"key":"DontSup","value":"Do not supply"},{"key":"Empty","value":"CC_Empty"},{"key":"ErrLor","value":"Error - Lorenzo"},{"key":"ForAdmin","value":"For administration medication items"},{"key":"IsSupDis","value":"IsSupDis"},{"key":"Leave","value":"Leave  medication items"},{"key":"NavIndBKG","value":"NavigatorIndicatorBackground"},{"key":"Outpatient","value":"Outpatient medication items"},{"key":"ProdOpt","value":"Product Option"},{"key":"ProductOpt","value":"Product Option - LORENZO"},{"key":"ProOpt","value":"ProductOption"},{"key":"ReqCACode","value":"MN_MED_VALIDATE_S_P2"},{"key":"ReqHis","value":"RequisitionHistory"},{"key":"Sup","value":"Supply"},{"key":"SupDet","value":"SupplyDetails"},{"key":"Supplyinst","value":"Supply instructions -"},{"key":"TecVal","value":"TechnicallyValidate"},{"key":"Title","value":"Lorenzo - Technically validate"},{"key":"Titles","value":"LORENZO"},{"key":"ViewDet","value":"ViewDetails"},{"key":"Title_Prod","value":"LORENZO-Webpage Dialog"},{"key":"ProdOpt_Add_Text","value":"Add product options"},{"key":"ProdOpt_Text","value":"Product options"},{"key":"SupplyDisp_Add_Text","value":"Add supply instructions"},{"key":"SupplyDisp_Update_Text","value":"Supply instructions"},{"key":"HiddenColumn_Header","value":"Hidden"},{"key":"ResolveGridNoRecordsText","value":"There are no records to show"},{"key":"cmdAddInfo_Caption","value":"Add additional information"},{"key":"cmdAddInfo_Tooltip","value":"Show/hide to add supply instructions or quantity per dose"},{"key":"SupplyIns_ToolTip","value":"Select to view supply instructions"},{"key":"FluidText","value":"(Fluid for infusions)"},{"key":"Select","value":"<Select>"},{"key":"AddsupinstChild","value":"Select to add supply instructions/ Product options"},{"key":"SupplyDispChild_Add_Text","value":"Add supply instructions/ Product options"},{"key":"SupplyDispChild_Header","value":"Supply instructions/ Product options"},{"key":"SupplyInsChild_ToolTip","value":"Select to view supply instructions/ Product options"},{"key":"SupplyBy","value":"Latest supply"},{"key":"NextSupp_Header","value":"Next supply"},{"key":"ResentRequestMessage","value":"Requests are already in progress for the items below\n\nDo you wish to continue?\n\nSelect No to supply only those items without a request already in progress\n\nYes to continue supply request for all selected items\n\nor Cancel to close the window\n\nItems:  \n\n   {0}"},{"key":"TVCurrentDateMSG","value":"Next supply date cannot be earlier than current date"},{"key":"NextSupply_ToolTip","value":"Enter next supply"},{"key":"Heightweightupdate_text","value":"Weight/Height has not been updated since"},{"key":"HtWtpleasereview","value":". Please review."},{"key":"TVProdOptMsg","value":"This change may invalidate the previously entered Technical Validation details and will be cleared."}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }
	
	export class TechValidate {
        constructor() {

        }
        public static get Addsupinst(): string {
            return ResourceManager.GetString("Addsupinst", resourceCulture);
        }
        public static get TotalQuantity_Header(): string {
            return ResourceManager.GetString("TotalQuantity_Header",resourceCulture);
        }
        public static get Quantity_Header(): string {
            return ResourceManager.GetString("Quantity_Header",resourceCulture);
        }
        public static get Supplyinscomments_Header(): string {
            return ResourceManager.GetString("Supplyinscomments_Header", resourceCulture);
        }
        public static get Producttbsupp_Header(): string {
            return ResourceManager.GetString("Supplyinscomments_Header", resourceCulture);
        }
        public static get SupplyStatus(): string {
            return ResourceManager.GetString("SupplyStatus", resourceCulture);
        }
        public static get AddsupinstChild(): string {
            return ResourceManager.GetString("AddsupinstChild", resourceCulture);
        }
        public static get Multicomponent_Header(): string {
            return ResourceManager.GetString("Multicomponent_Header", resourceCulture);
        }
        public static get CancelSup(): string {
            return ResourceManager.GetString("CancelSup", resourceCulture);
        }
        public static get CC_CHLD(): string {
            return ResourceManager.GetString("CC_CHLD", resourceCulture);
        }
        public static get CCCancelSup(): string {
            return ResourceManager.GetString("CCCancelSup", resourceCulture);
        }
        public static get CCDontSup(): string {
            return ResourceManager.GetString("CCDontSup", resourceCulture);
        }
        public static get CCSup(): string {
            return ResourceManager.GetString("CCSup", resourceCulture);
        }
        public static get Clerking(): string {
            return ResourceManager.GetString("Clerking", resourceCulture);
        }
        public static get cmdAddInfo_Caption(): string {
            return ResourceManager.GetString("cmdAddInfo_Caption", resourceCulture);
        }
        public static get cmdAddInfo_Tooltip(): string {
            return ResourceManager.GetString("cmdAddInfo_Tooltip", resourceCulture);
        }
        public static get cmdLinks_Text(): string {
            return ResourceManager.GetString("cmdLinks_Text", resourceCulture);
        }
        public static get cmdLinks_Tooltip(): string {
            return ResourceManager.GetString("cmdLinks_Tooltip", resourceCulture);
        }
        public static get cmdMedAdmin_Text(): string {
            return ResourceManager.GetString("cmdMedAdmin_Text", resourceCulture);
        }
        public static get cmdMedAdmin_Tooltip(): string {
            return ResourceManager.GetString("cmdMedAdmin_Tooltip", resourceCulture);
        }
        public static get cmdOtherLinks_Text(): string {
            return ResourceManager.GetString("cmdOtherLinks_Text", resourceCulture);
        }
        public static get cmdOtherLinks_Tooltip(): string {
            return ResourceManager.GetString("cmdOtherLinks_Tooltip", resourceCulture);
        }
        public static get Comnts(): string {
            return ResourceManager.GetString("Comnts", resourceCulture);
        }
        public static get DeactCompItem(): string {
            return ResourceManager.GetString("DeactCompItem", resourceCulture);
        }
        public static get DeactCompItem_Last_Msg(): string {
            return ResourceManager.GetString("DeactCompItem_Last_Msg", resourceCulture);
        }
        public static get DeactPresItem(): string {
            return ResourceManager.GetString("DeactPresItem", resourceCulture);
        }
        public static get DeactPresItem_Last_Msg(): string {
            return ResourceManager.GetString("DeactPresItem_Last_Msg", resourceCulture);
        }
        public static get DeactPresItem_Lastdiff_Msg(): string {
            return ResourceManager.GetString("DeactPresItem_Lastdiff_Msg", resourceCulture);
        }
        public static get DeactPresItem_Mid_Msg(): string {
            return ResourceManager.GetString("DeactPresItem_Mid_Msg", resourceCulture);
        }
        public static get Discharge(): string {
            return ResourceManager.GetString("Discharge", resourceCulture);
        }
        public static get Dispinst(): string {
            return ResourceManager.GetString("Dispinst", resourceCulture);
        }
        public static get DispTitle(): string {
            return ResourceManager.GetString("DispTitle", resourceCulture);
        }
        public static get DontSup(): string {
            return ResourceManager.GetString("DontSup", resourceCulture);
        }
        public static get Duplicate_check(): string {
            return ResourceManager.GetString("Duplicate_check", resourceCulture);
        }
        public static get Empty(): string {
            return ResourceManager.GetString("Empty", resourceCulture);
        }
        public static get ErrLor(): string {
            return ResourceManager.GetString("ErrLor", resourceCulture);
        }
        public static get FluidText(): string {
            return ResourceManager.GetString("FluidText", resourceCulture);
        }
        public static get ForAdmin(): string {
            return ResourceManager.GetString("ForAdmin", resourceCulture);
        }
        public static get Heightweightupdate_text(): string {
            return ResourceManager.GetString("Heightweightupdate_text", resourceCulture);
        }
        public static get HiddenColumn_Header(): string {
            return ResourceManager.GetString("HiddenColumn_Header", resourceCulture);
        }
        public static get HtWtpleasereview(): string {
            return ResourceManager.GetString("HtWtpleasereview", resourceCulture);
        }
        public static get IsSupDis(): string {
            return ResourceManager.GetString("IsSupDis", resourceCulture);
        }
        public static get Leave(): string {
            return ResourceManager.GetString("Leave", resourceCulture);
        }
        public static get NavIndBKG(): string {
            return ResourceManager.GetString("NavIndBKG", resourceCulture);
        }
        public static get NextSupp_Header(): string {
            return ResourceManager.GetString("NextSupp_Header", resourceCulture);
        }
        public static get NextSupply_ToolTip(): string {
            return ResourceManager.GetString("NextSupply_ToolTip", resourceCulture);
        }
        public static get Otherinformation_Header(): string {
            return ResourceManager.GetString("Otherinformation_Header", resourceCulture);
        }
        public static get Outpatient(): string {
            return ResourceManager.GetString("Outpatient", resourceCulture);
        }
        public static get PrescriptionItem_Header(): string {
            return ResourceManager.GetString("PrescriptionItem_Header", resourceCulture);
        }
        public static get ProdOpt(): string {
            return ResourceManager.GetString("ProdOpt", resourceCulture);
        }
        public static get ProdOpt_Add_Text(): string {
            return ResourceManager.GetString("ProdOpt_Add_Text", resourceCulture);
        }
        public static get ProdOpt_Text(): string {
            return ResourceManager.GetString("ProdOpt_Text", resourceCulture);
        }
        public static get ProdOptMSG(): string {
            return ResourceManager.GetString("ProdOptMSG", resourceCulture);
        }
        public static get ProductOpt(): string {
            return ResourceManager.GetString("ProductOpt", resourceCulture);
        }
        public static get ProOpt(): string {
            return ResourceManager.GetString("ProOpt", resourceCulture);
        }
        public static get RemoveBeginTxt(): string {
            return ResourceManager.GetString("RemoveBeginTxt", resourceCulture);
        }
        public static get RemoveEndTxt(): string {
            return ResourceManager.GetString("RemoveEndTxt", resourceCulture);
        }
        public static get ReqCACode(): string {
            return ResourceManager.GetString("ReqCACode", resourceCulture);
        }
        public static get ReqHis(): string {
            return ResourceManager.GetString("ReqHis", resourceCulture);
        }
        public static get ResentRequestMessage(): string {
            return ResourceManager.GetString("ResentRequestMessage", resourceCulture);
        }
        public static get ResolveGridNoRecordsText(): string {
            return ResourceManager.GetString("ResolveGridNoRecordsText", resourceCulture);
        }
        public static get Select(): string {
            return ResourceManager.GetString("Select", resourceCulture);
        }
        public static get StartDTTM_Header(): string {
            return ResourceManager.GetString("StartDTTM_Header", resourceCulture);
        }
        public static get Sup(): string {
            return ResourceManager.GetString("Sup", resourceCulture);
        }
        public static get SupDet(): string {
            return ResourceManager.GetString("SupDet", resourceCulture);
        }
        public static get SuppCom_Header(): string {
            return ResourceManager.GetString("SuppCom_Header", resourceCulture);
        }
        public static get Supply_Default_Txt(): string {
            return ResourceManager.GetString("Supply_Default_Txt", resourceCulture);
        }
        public static get Supply_Title(): string {
            return ResourceManager.GetString("Supply_Title", resourceCulture);
        }
        public static get SupplyBy(): string {
            return ResourceManager.GetString("SupplyBy", resourceCulture);
        }
        public static get SupplyDisp_Add_Text(): string {
            return ResourceManager.GetString("SupplyDisp_Add_Text", resourceCulture);
        }
        public static get SupplyDisp_Header(): string {
            return ResourceManager.GetString("SupplyDisp_Header", resourceCulture);
        }
        public static get SupplyDisp_Update_Text(): string {
            return ResourceManager.GetString("SupplyDisp_Update_Text", resourceCulture);
        }
        public static get SupplyDispChild_Add_Text(): string {
            return ResourceManager.GetString("SupplyDispChild_Add_Text", resourceCulture);
        }
        public static get SupplyDispChild_Header(): string {
            return ResourceManager.GetString("SupplyDispChild_Header", resourceCulture);
        }
        public static get SupplyIns_ToolTip(): string {
            return ResourceManager.GetString("SupplyIns_ToolTip", resourceCulture);
        }
        public static get SupplyInsChild_ToolTip(): string {
            return ResourceManager.GetString("SupplyInsChild_ToolTip", resourceCulture);
        }
        public static get Supplyinst(): string {
            return ResourceManager.GetString("Supplyinst", resourceCulture);
        }
        public static get TecVal(): string {
            return ResourceManager.GetString("TecVal", resourceCulture);
        }
        public static get Title(): string {
            return ResourceManager.GetString("Title", resourceCulture);
        }
        public static get Title_Prod(): string {
            return ResourceManager.GetString("Title_Prod", resourceCulture);
        }
        public static get Titles(): string {
            return ResourceManager.GetString("Titles", resourceCulture);
        }
        public static get TVCurrentDateMSG(): string {
            return ResourceManager.GetString("TVCurrentDateMSG", resourceCulture);
        }
        public static get TVProdOptMsg(): string {
            return ResourceManager.GetString("TVProdOptMsg", resourceCulture);
        }
        public static get ViewDet(): string {
            return ResourceManager.GetString("ViewDet", resourceCulture);
        }
    }
