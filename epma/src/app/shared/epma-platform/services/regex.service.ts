
export class Regex {
    IsMatch: any;
    public static Split(param:string,pattern:string):string[]{
        return param.split(pattern);
    }
}
export class RegularExpression {
  static Regex: Regex;
}
