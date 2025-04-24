import { Injectable } from '@angular/core';
import { long } from 'epma-platform/models';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';

@Injectable({
    providedIn: 'root'
})

export class SLDateUtility {

    // static slDSTInfo:SLDSTInfo=new SLDSTInfo();



    static dtDSTDateTimeBeginUnspecified:DateTime = new DateTime();
    static dtAmbiguousDateTimeEndUnspecified:DateTime = new DateTime();
    static dtAmbiguousDateTimeStartUnspecified:DateTime = new DateTime();
    static dtDSTDateTimeEndUnspecified:DateTime = new DateTime();
    static dtStandardDateTimeEndUnspecified:DateTime = new DateTime();
    static ss:boolean;
    static serverDateTimeOffset:number;
    constructor() { }

    public static LoadApplicableDSTDates(dtInput: any, bUTC: boolean): void {

    }

    public static GetOffsetInternal(): TimeSpan {
        let _offset: TimeSpan = new TimeSpan(0)
        return _offset
    }

    public static  GetServerDateTime() : DateTime{                     
        // correct implementation needs to be added                 
        let _IsDST : boolean;
        let _IsAmbiguous : boolean;
        let _IsInvalid : boolean;
      //  let dt: DateTime = DateTime.UtcNow;
        let date = new Date();
       // let serverDateTime = new DateTime(date.getTime() + SLDateUtility.serverDateTimeOffset);

        return DateTime.Now;
        // TimeSpan diff = dtServerDateTime.Subtract(clientDateTime);
        // dt = dt + diff;
        // dt = dt.ConvertToUser(out _IsDST, out _IsAmbiguous, out _IsInvalid);
        // return dt;
         //return pGetServerDateTime();
    }
    public static  GetLocalServerDateTime():DateTime{
        // correct implementation needs to be added
        let _IsDST : boolean;
        let _IsAmbiguous : boolean;
        let _IsInvalid : boolean;
        let dt: DateTime = DateTime.UtcNow;
        return dt
        // TimeSpan diff = dtServerDateTime.Subtract(clientDateTime);
        // dt = dt + diff;
        // dt = dt.ConvertToUser(out _IsDST, out _IsAmbiguous, out _IsInvalid);
        // dt = dt.ConvertToLocal(_IsDST);
        // return dt;
    }
    public static GetDSTString(): String
    {
        return "DST";
    }
}

export enum DayOfWeek {

    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}

export class SLTransitionTime {
    public Day: number=0;
    public DayOfWeek: DayOfWeek=0;
    public IsFixedDateRule: boolean=false;
    public Month: number=0;
    public TimeOfDay:DateTime = new DateTime();
    public Week: number=0;
}

export class SLAdjustmentRule
{
   public DateEnd:DateTime= new DateTime()
   public DateStart:DateTime= new DateTime()
   public DaylightDeltaTicks:long=0
   public DaylightTransitionEnd:SLTransitionTime= new SLTransitionTime()
   public DaylightTransitionStart:SLTransitionTime= new SLTransitionTime()
}
export class SLCultureInfo
{
    public static LongDatePattern:string ='dd MMMM yyyy';
    public static ShortDatePattern:string ='dd/MM/yyyy';
    public static LongTimePattern:string ='HH:mm:ss';
    public static ShortTimePattern:string ='HH:mm';
    public static CurrentCultureName:string ='en-GB';
    public static DecimalSeperator:string ='.';
    public static AMDesignator:string ='AM';
    public static PMDesignator:string ='PM';
    public static YearMonthPattern:string ='MMM yyyy';
}

export class SLDSTInfo
{
    public LocalAdjustmentRule:SLAdjustmentRule[]=[];
   public UserUTCOffsetTicks:long=0
   public UserUTCDSTOffsetTicks:long=0
   public TimeZoneStandardName:string = ''
   public ServerDateTime:DateTime = new DateTime();
 
}

export enum DateFlag
{
    DST,
    NonDST,
    AmbiguousDST,
    AmbiguousNonDST,
    Invalid
}
