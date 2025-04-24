import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';

    /*[ScriptableType]*/
    export class MedDrugDetailsParams {
        /*[ScriptableMember]*/
        public PrescriptionItemOID: number;
        /*[ScriptableMember]*/
        public MCVersion: string;
        /*[ScriptableMember]*/
        public WebServiceURL: string;
        /*[ScriptableMember]*/
        public ReleaseVersion: number;
        /*[ScriptableMember]*/
        public UserOID: number;
        /*[ScriptableMember]*/
        public SecurityToken: string;
        /*[ScriptableMember]*/
        public PatientID: string;
        /*[ScriptableMember]*/
        public OrganizationID: string;
        /*[ScriptableMember]*/
        public RoleProfileName: string;
        /*[ScriptableMember]*/
        public IconClick: string;
        /*[ScriptableMember]*/
        public DrugName: string;
        /*[ScriptableMember]*/
        public DoseType: string;
        /*[ScriptableMember]*/
        public InfusionType: string;
        /*[ScriptableMember]*/
        public PrescriptionTypeCode: string;
        /*[ScriptableMember]*/
        public LorenzoID: string;
        /*[ScriptableMember]*/
        public ClerkingFormviewDefaltCode: string;
        /*[ScriptableMember]*/
        public TechValDef: string;
        /*[ScriptableMember]*/
        public EncounterOID: string;
        /*[ScriptableMember]*/
        public ContextEncounterOID: string;
        /*[ScriptableMember]*/
        public ServiceOID: number;
        /*[ScriptableMember]*/
        public LocationOID: number;
        /*[ScriptableMember]*/
        public ContextEncounterTypeCode: string;
        /*[ScriptableMember]*/
        public IsDoseCalcExist: string;
        /*[ScriptableMember]*/
        public InfusionGroupSequenceNo: string;
        /*[ScriptableMember]*/
        public LatHWDTTM: string;
        /*[ScriptableMember]*/
        public IsPatientTranferAct: string;
    }