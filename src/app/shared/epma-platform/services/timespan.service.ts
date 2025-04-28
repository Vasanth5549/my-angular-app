import { formatDate } from "@angular/common";
import { CultureInfo } from "../models/eppma-common-types";

function isEmpty(n: number): boolean {
  return n === undefined || n === null || n === 0 || isNaN(n);
}

export const msMinutes = 60000;

export const msSeconds = 1000;

export const msHours = 3600000;

export const msDays = 24 * msHours;

/**
 * This is due to performance reason, copied from Source of TimeSpan from C# code.
 */
const daysPerMS = 1 / msDays;

const hoursPerMS = 1 / msHours;

const minutesPerMS = 1 / msMinutes;

const secondsPerMS = 1 / msSeconds;

function padLeft(n: number, c: number = 2, t: string = '0'): string {
  let s = n.toString();
  if (s.length < c) {
    s = t + s;
  }
  return s;
}

export default class TimeSpan {
  public static readonly MinValue:TimeSpan = new TimeSpan(Number.MIN_SAFE_INTEGER);
  public static readonly Zero:TimeSpan =new TimeSpan(0);
  public static readonly TicksPerMinute:number = 600000000;


  public static FromDays(n: number): TimeSpan {
    return new TimeSpan(n * msDays);
  }

  public static FromHours(n: number): TimeSpan {
    return new TimeSpan(n * msHours);
  }

  public static FromMinutes(n: number): TimeSpan {
    return new TimeSpan(n * msMinutes);
  }

  public static FromSeconds(n: number): TimeSpan {
    return new TimeSpan(n * msSeconds);
  }
  public static TryParse(arg:string, out: (o: TimeSpan) => void):boolean{
    let timespan = TimeSpan.TimeSpanParse(arg);
    if(timespan){
      out(timespan);
      return true; 
    }else{
      out(TimeSpan.Zero);
      return false;
    }
  }
  public static Parse(text: string): TimeSpan {
    if (!text) {
      throw new Error('Invalid time format');
    }
   return this.TimeSpanParse(text);
  }
  private static TimeSpanParse(text:string){
  let isPM: boolean = false;
  // tslint:disable-next-line: one-variable-per-declaration
  let d: number, h: number, m: number, s: number, ms: number;
  const tokens = text.split(/:/);
  // split last...
  const last = tokens[tokens.length - 1];
  const lastParts = last.split(' ');
  if (lastParts.length > 1) {
    if (/pm/i.test(lastParts[1])) {
      isPM = true;
    }
    tokens[tokens.length - 1] = lastParts[0];
  }
  const firstOfLast = lastParts[0];
  if (firstOfLast.indexOf('.') !== -1) {
    // it has ms...
    const secondParts = firstOfLast.split('.');
    if (secondParts.length > 1) {
      tokens[tokens.length - 1] = secondParts[0];
      ms = parseInt(secondParts[1], 10);
    }
  }

  if (tokens.length === 2) {
    // this is hour:min
    d = 0;
    h = parseInt(tokens[0], 10);
    m = parseInt(tokens[1], 10);
  } else if (tokens.length === 3) {
    d = 0;
    h = parseInt(tokens[0], 10);
    m = parseInt(tokens[1], 10);
    s = parseInt(tokens[2], 10);
  } else if (tokens.length === 4) {
    d = parseInt(tokens[0], 10);
    h = parseInt(tokens[1], 10);
    m = parseInt(tokens[2], 10);
    s = parseInt(tokens[3], 10);
  }

  return new TimeSpan(d!, isPM ? h! + 12 : h!, m!, s!, ms!);
}


  private msSinceEpoch: number;

  public get TotalSeconds(): number {
    return this.msSinceEpoch * secondsPerMS;
  }

  public get TotalMinutes(): number {
    return this.msSinceEpoch * minutesPerMS;
  }

  public get TotalHours(): number {
    return this.msSinceEpoch * hoursPerMS;
  }

  public get TotalDays(): number {
    return this.msSinceEpoch * daysPerMS;
  }

  public get TotalMilliseconds(): number {
    return this.msSinceEpoch;
  }

  public get Days(): number {
    return Math.floor(this.msSinceEpoch / msDays);
  }

  public get Hours(): number {
    return new Date(this.msSinceEpoch).getUTCHours();
   // return Math.floor((this.msSinceEpoch / msHours) % 24);
  }

  public get Minutes(): number {
    return new Date(this.msSinceEpoch).getUTCMinutes();
  //  return Math.floor((this.msSinceEpoch / msMinutes) % 60);
  }

  public get Seconds(): number {
    return new Date(this.msSinceEpoch).getUTCSeconds();
  //  return Math.floor((this.msSinceEpoch / msSeconds) % 60);
  }

  public get Milliseconds(): number {
   // return Math.floor(this.msSinceEpoch % 1000);
   return new Date(this.msSinceEpoch).getUTCMilliseconds();
  }

  /**
   * Duration is always positive TimeSpan
   */
  public get Duration(): TimeSpan {
    const t = this.msSinceEpoch;
    return new TimeSpan(t > 0 ? t : -t);
  }

  /**
   * Removes days and only trims given TimeSpan to TimeOfDay
   */
  public get TrimmedTime(): TimeSpan {
    return new TimeSpan(Math.ceil(this.msSinceEpoch % msDays));
  }
  public get Ticks(): number {
    return this.msSinceEpoch * 1000;
  }

  constructor();
  constructor(ms?: number);
  // tslint:disable-next-line: unified-signatures
  constructor(
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number
  );
  constructor(
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number
  ) {
    if(!Number.isNaN(days)){
    if (arguments.length === 1) {
      this.msSinceEpoch = days;
    } else {
      this.msSinceEpoch =
        (days || 0) * msDays +
        (hours || 0) * msHours +
        (minutes || 0) * msMinutes +
        (seconds || 0) * msSeconds +
        (milliseconds || 0);
    }
    }
  }

  /**
   * Format the TimeSpan as time format
   * @param formatAs12 Display time as 12 hours with AM/PM (only if day is zero)
   */
 /* public ToString(formatAs12: string| boolean ): string {
    let ams = this.msSinceEpoch;

    const text: any[] = [];
    let postFix = '';

    function format(max: number, f12: boolean = false) {
      let txt: string;
      if (ams > max) {
        const n = Math.floor(ams / max);
        ams = ams % max;
        if (f12) {
          if (n > 12) {
            postFix = ' PM';
            txt = padLeft(n - 12);
          } else {
            postFix = ' AM';
          }
        }
        if (!txt!) {
          txt = padLeft(n);
        }
      }
      if (txt!) {
        text.push(txt!);
      }
      return txt!;
    }

    const d = format(msDays);
    format(msHours, !!formatAs12 && !d);
    format(msMinutes);
    let s = format(msSeconds);
    if (ams) {
      s += '.' + ams;
      text[text.length - 1] = s;
    }
    return `${text.join(':')}${postFix}`;
  }*/
  public ToString(format?:string):string{
    //ToString(format:string) implementation
    if(format == "HH:mm"){
      return this.Hours.ToString("00")+":"+this.Minutes.ToString("00");
    }
    else if(format == "hh:mm"){
      let hours;
      if(this.Hours == 0){
         hours = 12;
      }else if(this.Hours > 12 ){
        hours = this.Hours-12
      }else{
        hours = this.Hours;
      }
      return (hours).ToString("00")+":"+this.Minutes.ToString("00");
    }else if(format)
  return formatDate(new Date(this.msSinceEpoch),format,CultureInfo.culture);
  else
  return this.msSinceEpoch.toString();
  }

  public Add(ts: TimeSpan): TimeSpan {
    return new TimeSpan(this.msSinceEpoch + ts.msSinceEpoch);
  }

  public Equals(ts: TimeSpan): boolean {
    let parsedDate = JSON.stringify(new Date(ts.msSinceEpoch)).split(".")[0];
    let parsedParam = JSON.stringify(new Date(this.msSinceEpoch)).split(".")[0];
    return parsedDate === parsedParam;
  }
  public Subtract(ts: TimeSpan): TimeSpan {
    const result = this.msSinceEpoch - ts.msSinceEpoch;
    return new TimeSpan(result);
}

}



if (typeof window !== 'undefined') {
  (window as any).TimeSpan = TimeSpan;
}