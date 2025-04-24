import { Injectable } from '@angular/core';
import { PrescribingMethodConfigData,CMedicationLineDisplayData, GPConnectConfiguration, PrescribingConfigData, CChartDisplayConfig, CSlotCharacteristicsConfig, AddPrescribingConfigData, InfusionPresConfigData, ClinicalVerificationConfiguration, MedicationViewConfigData } from '../models/profileType';

@Injectable({
  providedIn: 'root'
})
export class ProfileTypeConversion {

    constructor(){}

    public static Shallowcopy(ProfileData){
        let Result;
        let profileType = Object.keys(ProfileData)[0];
        switch (profileType) {
            case 'PrescribingMethodConfigData' :
                if(ProfileData && ProfileData.PrescribingMethodConfigData){
                    let PrescribingMethodConfig = new PrescribingMethodConfigData();
                    // Object.keys(ProfileData.PrescribingMethodConfigData).forEach(key => {
                    //     PrescribingMethodConfig[key] = ProfileData.PrescribingMethodConfigData[key]
                    // });
                    PrescribingMethodConfig.PowerSearchCategories = ProfileData.PrescribingMethodConfigData.PowerSearchCategories;
                    PrescribingMethodConfig.EncounPresConfig = ProfileData.PrescribingMethodConfigData.EncounPresConfig.EncounterPresConfigurations;
                    Result = PrescribingMethodConfig;
                }
                break;
            case 'CMedicationLineDisplayData' : 
                if(ProfileData && ProfileData.CMedicationLineDisplayData){
                    let CMedicationLineDisplayConfig = new CMedicationLineDisplayData();
                    CMedicationLineDisplayConfig.sColorCode = ProfileData.CMedicationLineDisplayData.sColorCode;
                    CMedicationLineDisplayConfig.MultipleComponent = ProfileData.CMedicationLineDisplayData.MultipleComponent;
                    CMedicationLineDisplayConfig.objLineDisConfig = ProfileData.CMedicationLineDisplayData.objLineDisConfig.LineDisplayConfigurations;
                    Result = CMedicationLineDisplayConfig;
                }

                break;
            case 'MedicationViewConfigData' : 
                    if(ProfileData && ProfileData.MedicationViewConfigData){
                        let MedicationViewDataConfig = new MedicationViewConfigData();
                        MedicationViewDataConfig.CancelledDrug = ProfileData.MedicationViewConfigData.CancelledDrug;
                        MedicationViewDataConfig.CurMedExpiryDuration = ProfileData.MedicationViewConfigData.CurMedExpiryDuration;
                        MedicationViewDataConfig.DefaultFilterBy = ProfileData.MedicationViewConfigData.DefaultFilterBy;
                        MedicationViewDataConfig.DefaultGroupBy = ProfileData.MedicationViewConfigData.DefaultGroupBy;
                        MedicationViewDataConfig.DiscontinuedDrug = ProfileData.MedicationViewConfigData.DiscontinuedDrug;
                        MedicationViewDataConfig.DrugCatalogue = ProfileData.MedicationViewConfigData.DrugCatalogue;
                        MedicationViewDataConfig.DrugsExpiryDuration = ProfileData.MedicationViewConfigData.DrugsExpiryDuration;
                        MedicationViewDataConfig.Favourites = ProfileData.MedicationViewConfigData.Favourites;
                        MedicationViewDataConfig.Formulary = ProfileData.MedicationViewConfigData.Formulary;
                        MedicationViewDataConfig.GroupByCols = ProfileData.MedicationViewConfigData.GroupByCols;
                        MedicationViewDataConfig.OtherLinks = ProfileData.MedicationViewConfigData.OtherLinks;
                        MedicationViewDataConfig.PatMedCols = ProfileData.MedicationViewConfigData.PatMedCols;
                        Result = MedicationViewDataConfig;
                    }
             break;

             case 'ClinicalVerificationConfiguration' : 
                    if(ProfileData && ProfileData.ClinicalVerificationConfiguration){
                        let ClinicalVerificationDataConfig = new ClinicalVerificationConfiguration();
                        ClinicalVerificationDataConfig.IsSupplyReqInTechVal = ProfileData.ClinicalVerificationConfiguration.IsSupplyReqInTechVal;
                        ClinicalVerificationDataConfig.StationaryName = ProfileData.ClinicalVerificationConfiguration.StationaryName;
                        ClinicalVerificationDataConfig.StationaryTypeCode = ProfileData.ClinicalVerificationConfiguration.StationaryTypeCode;
                        ClinicalVerificationDataConfig.StationaryTypes = ProfileData.ClinicalVerificationConfiguration.StationaryTypes;
                        Result = ClinicalVerificationDataConfig;
                    }
             break;

             case 'InfusionPresConfigData' : 
                    if(ProfileData && ProfileData.InfusionPresConfigData){
                        let InfusionPresDataConfig = new InfusionPresConfigData();
                        InfusionPresDataConfig.InfusPeriod = ProfileData.InfusionPresConfigData.InfusPeriod;
                        InfusionPresDataConfig.InfusVol = ProfileData.InfusionPresConfigData.InfusVol;
                        InfusionPresDataConfig.IsEnablePrescInfus = ProfileData.InfusionPresConfigData.IsEnablePrescInfus;
                        InfusionPresDataConfig.IsInfusionRatePCA = ProfileData.InfusionPresConfigData.IsInfusionRatePCA;
                        InfusionPresDataConfig.objInfusDeliveryDevice = ProfileData.InfusionPresConfigData.objInfusDeliveryDevice.InfusDeliveryDevice;
                        InfusionPresDataConfig.objOxygenMasks = ProfileData.InfusionPresConfigData.objOxygenMasks.OxygenMasks;
                        Result = InfusionPresDataConfig;
                    }
             break;

             case 'AddPrescribingConfigData' : 
                    if(ProfileData && ProfileData.AddPrescribingConfigData){
                        let AddPrescribingDataConfig = new AddPrescribingConfigData();
                        AddPrescribingDataConfig.AutoRefresh = ProfileData.AddPrescribingConfigData.AutoRefresh;
                        AddPrescribingDataConfig.EnableWardStockConfig = ProfileData.AddPrescribingConfigData.EnableWardStockConfig;
                        AddPrescribingDataConfig.FormularyMandatory = ProfileData.AddPrescribingConfigData.FormularyMandatory;
                        AddPrescribingDataConfig.PresIdentifierName = ProfileData.AddPrescribingConfigData.PresIdentifierName;
                        AddPrescribingDataConfig.PresIdentifierType = ProfileData.AddPrescribingConfigData.PresIdentifierType;
                        AddPrescribingDataConfig.PrescribeofMCI = ProfileData.AddPrescribingConfigData.PrescribeofMCI;
                        AddPrescribingDataConfig.RecManforIP = ProfileData.AddPrescribingConfigData.RecManforIP;
                        AddPrescribingDataConfig.ReconcileMandatory = ProfileData.AddPrescribingConfigData.ReconcileMandatory;
                        AddPrescribingDataConfig.ReviewAfterMandatory = ProfileData.AddPrescribingConfigData.ReviewAfterMandatory;
                        Result = AddPrescribingDataConfig;
                    }
             break;

             case 'CSlotCharacteristicsConfig' : 
                    if(ProfileData && ProfileData.CSlotCharacteristicsConfig){
                        let CSlotCharacteristicsDataConfig = new CSlotCharacteristicsConfig();
                        CSlotCharacteristicsDataConfig.AdvDurationForRecording = ProfileData.CSlotCharacteristicsConfig.AdvDurationForRecording;
                        CSlotCharacteristicsDataConfig.DuenessThreshold = ProfileData.CSlotCharacteristicsConfig.DuenessThreshold;
                        CSlotCharacteristicsDataConfig.SlotModificationTime = ProfileData.CSlotCharacteristicsConfig.SlotModificationTime;
                        Result = CSlotCharacteristicsDataConfig;
                    }
             break;

             case 'CChartDisplayConfig' : 
                    if(ProfileData && ProfileData.CChartDisplayConfig){
                        let CChartDisplayDataConfig = new CChartDisplayConfig();
                        CChartDisplayDataConfig.AsRequiredSlotsColor = ProfileData.CChartDisplayConfig.AsRequiredSlotsColor;
                        CChartDisplayDataConfig.DueSlotsColor = ProfileData.CChartDisplayConfig.DueSlotsColor;
                        CChartDisplayDataConfig.OmittedSlotsColor = ProfileData.CChartDisplayConfig.OmittedSlotsColor;
                        CChartDisplayDataConfig.OverDueSlotsColor = ProfileData.CChartDisplayConfig.OverDueSlotsColor;
                        CChartDisplayDataConfig.TodayOutlineColor = ProfileData.CChartDisplayConfig.TodayOutlineColor;
                        Result = CChartDisplayDataConfig;
                    }
             break;

             case 'PrescribingConfigData' : 
                    if(ProfileData && ProfileData.PrescribingConfigData){
                        let PrescribingDataConfig = new PrescribingConfigData();
                            PrescribingDataConfig.ReasonMandatory = ProfileData.PrescribingConfigData.ReasonMandatory;
                            PrescribingDataConfig.AdjfactorAdjBWcalc = ProfileData.PrescribingConfigData.AdjfactorAdjBWcalc;
                            PrescribingDataConfig.AlertPartentRow = ProfileData.PrescribingConfigData.AlertPartentRow;
                            PrescribingDataConfig.AllergyPrompt = ProfileData.PrescribingConfigData.AllergyPrompt.string;
                            PrescribingDataConfig.AllowUserFavorites = ProfileData.PrescribingConfigData.AllowUserFavorites;
                            PrescribingDataConfig.AutoLaunch = ProfileData.PrescribingConfigData.AutoLaunch;
                            PrescribingDataConfig.BNFURL =  ProfileData.PrescribingConfigData.BNFURL;
                            PrescribingDataConfig.ClerkFormViewDefautCode = ProfileData.PrescribingConfigData.ClerkFormViewDefautCode;
                            PrescribingDataConfig.CommonCDCFavFolder = ProfileData.PrescribingConfigData.CommonCDCFavFolder;
                            PrescribingDataConfig.CommonCDCFavLzoID = ProfileData.PrescribingConfigData.CommonCDCFavLzoID;
                            PrescribingDataConfig.CommonCDCFavOID = ProfileData.PrescribingConfigData.CommonCDCFavOID;
                            PrescribingDataConfig.CommonFavoFolder = ProfileData.PrescribingConfigData.CommonFavoFolder;
                            PrescribingDataConfig.CommonFavoLorenzoID = ProfileData.PrescribingConfigData.CommonFavoLorenzoID;
                            PrescribingDataConfig.CommonFavoOID = ProfileData.PrescribingConfigData.CommonFavoOID;
                            PrescribingDataConfig.ConfigDateDuration = ProfileData.PrescribingConfigData.ConfigDateDuration;
                            PrescribingDataConfig.ConfigDateDurationType = ProfileData.PrescribingConfigData.ConfigDateDurationType;
                            PrescribingDataConfig.CrossMatch = ProfileData.PrescribingConfigData.CrossMatch;
                            PrescribingDataConfig.EnableDoseCalc = ProfileData.PrescribingConfigData.EnableDoseCalc;
                            PrescribingDataConfig.FavouriteFolder = ProfileData.PrescribingConfigData.FavouriteFolder;
                            PrescribingDataConfig.FavouriteOID = ProfileData.PrescribingConfigData.FavouriteOID;
                            PrescribingDataConfig.HeightWeightCDCFormCode = ProfileData.PrescribingConfigData.HeightWeightCDCFormCode;
                            PrescribingDataConfig.HeightWeightCDCFormCode = ProfileData.PrescribingConfigData.HeightWeightCDCFormCode;
                            PrescribingDataConfig.HeightWeightChangeAlert = ProfileData.PrescribingConfigData.HeightWeightChangeAlert;
                            PrescribingDataConfig.HghtWghtPrompt = ProfileData.PrescribingConfigData.HghtWghtPrompt.string;
                            PrescribingDataConfig.HghtWghtPromptCriteria = ProfileData.PrescribingConfigData.HghtWghtPromptCriteria.HghtWghtPrompt;
                            PrescribingDataConfig.IdealBodyWeightPercentageExceeds = ProfileData.PrescribingConfigData.IdealBodyWeightPercentageExceeds;
                            PrescribingDataConfig.IncludeEventDates = ProfileData.PrescribingConfigData.IncludeEventDates;
                            PrescribingDataConfig.LaunchInpatientPres = ProfileData.PrescribingConfigData.LaunchInpatientPres;
                            PrescribingDataConfig.MultipleComponent = ProfileData.PrescribingConfigData.MultipleComponent;
                            PrescribingDataConfig.NoOfResultDisp = ProfileData.PrescribingConfigData.NoOfResultDisp;
                            PrescribingDataConfig.PaediatricsAgeRange = ProfileData.PrescribingConfigData.PaediatricsAgeRange;
                            PrescribingDataConfig.PaediatricsAgeRangeTop = ProfileData.PrescribingConfigData.PaediatricsAgeRangeTop;
                            PrescribingDataConfig.PromptAllergyReview = ProfileData.PrescribingConfigData.PromptAllergyReview;
                            PrescribingDataConfig.PromptFreqMoreOption = ProfileData.PrescribingConfigData.PromptFreqMoreOption;
                            PrescribingDataConfig.ReasonMandatory = ProfileData.PrescribingConfigData.ReasonMandatory;
                            PrescribingDataConfig.SlotTime = ProfileData.PrescribingConfigData.SlotTime.string;
                            Result = PrescribingDataConfig;
                    }
             break;

             case 'GPConnectConfiguration' : 
                    if(ProfileData && ProfileData.GPConnectConfiguration){
                        let GPConnectDataConfig = new GPConnectConfiguration();
                        GPConnectDataConfig.PrescriptionCodes = ProfileData.GPConnectConfiguration.PrescriptionCodes;
                        Result = GPConnectDataConfig;
                    }
             break;
        
        }
        return Result;

    }

}