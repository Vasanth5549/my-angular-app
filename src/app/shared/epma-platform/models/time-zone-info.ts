import DateTime from "epma-platform/DateTime";
import TimeSpan from "epma-platform/TimeSpan";

export class TimeZoneInfo 
{
    //this complete TimeZoneInfo is a stub
    public static Local: TimeZoneInfo = new TimeZoneInfo();
    public static Utc: TimeZoneInfo = new TimeZoneInfo();
   // public BaseUtcOffset: TimeSpan = new TimeSpan();
    public DaylightName: string;
    public DisplayName: string;
    public StandardName: string;
    public SupportsDaylightSavingTime: boolean;
    public timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // public ConvertTime(dateTimeOffset: DateTime, destinationTimeZone: TimeZoneInfo): DateTime;
    // public ConvertTime(dateTime: DateTime, destinationTimeZone: TimeZoneInfo): DateTime {
    //     return new DateTime();
    // }
    public Equals(other: TimeZoneInfo): boolean {
        return true;
    }
    // public GetAmbiguousTimeOffsets(dateTime: DateTime): TimeSpan[];
    // public GetAmbiguousTimeOffsets(dateTimeOffset: DateTime): TimeSpan[] {
    //     let timeSpan = new TimeSpan;
    //     return [timeSpan];
    // }
    // public GetHashCode(): number {
    //     return 0;
    // }
    public GetUtcOffset(dateTimeOffset: DateTime): TimeSpan;
    public GetUtcOffset(dateTime: DateTime): TimeSpan {
        if(dateTime && dateTime.constructor.name == "DateTime" || dateTime.constructor.name == "Date" ){
            let totalMinutes = (dateTime as any as Date).getTimezoneOffset();
            let timeSpan = new TimeSpan(totalMinutes * 60000);
            return timeSpan;
        }else{
            //method not implemented for dateTimeOffset
            console.log("ArgumentNullException:datetime is not valid datetime in GetUtcOffset method")
            let timeSpan = new TimeSpan;
            return timeSpan;
        }
    };
    
    public IsAmbiguousTime(dateTimeOffset: DateTime): boolean;
    public IsAmbiguousTime(dateTime: DateTime): boolean {
        let isAmbiguous = false;
        const timestamp = (dateTime as any as Date).getTime();
        // Create two new date objects, one with the current timestamp and one with the timestamp plus one hour
        const currentDate = new Date(timestamp);
        const nextHourDate = new Date(timestamp + 3600000); // 3600000 milliseconds = 1 hour
        const prevHourDate = new Date(timestamp - 3600000);
        // Check if the two dates have the same local time
        isAmbiguous = currentDate.getHours() === nextHourDate.getHours() || currentDate.getHours() === prevHourDate.getHours();;//true for 1am - 2 am but not 12am-1am and 2 am and later
    
        if (isAmbiguous) {
            return true;
        } else {
            return false;
        }
    }
    public get BaseUtcOffset():TimeSpan{
        const timeZoneOffset = new Date().getTimezoneOffset();
        if(timeZoneOffset == -330){
            return new TimeSpan(330);
        }else{
            return new TimeSpan(0);
        }
    };

    
    public IsDaylightSavingTime(dateTimeOffset: DateTime): boolean;
    public IsDaylightSavingTime(dateTime: DateTime): boolean {
        let date = dateTime as any as Date;
        if(this.isDST(date) && !this.IsAmbiguousTime(date as any as DateTime)){
          return true;
        }else{
          return false;
        }
    }
    public IsDSTWithInAmbiguousTime(dateTime: DateTime): boolean {
        let date = dateTime as any as Date;
        if(this.isDST(date)){
          return true;
        }else{
          return false;
        }
    }
    private isDST(date){
        let jan = new Date(date.getFullYear(), 0, 1);
        let jul = new Date(date.getFullYear(), 6, 1);
        let stdTimezoneOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
        let isDayLightSavingTime = date.getTimezoneOffset() < stdTimezoneOffset;
        return isDayLightSavingTime;
    }
    public IsInvalidTime(dateTime: DateTime): boolean {
        let date = dateTime as any as Date;
        let localOffset = date.getTimezoneOffset();
        let utcOffset = new Date(date.getTime() + localOffset * 60000).getTimezoneOffset();
        
       return localOffset !== utcOffset; 
    }
    public ToString(): string {
        return '';
    }
}
