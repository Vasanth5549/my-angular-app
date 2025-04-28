export class iMath{
    public static Round(number:number, precision?:number):number{
        if(!precision && number){
                    return iMath.customRound(number);
                }
                if(precision < 0 || precision > 15){
                    throw new Error("ArgumentOutOfRangeException");
                }
                if(!number){
                    throw new Error('number is not defined');
                }
                if (precision < 0) {
                    let factor = Math.pow(10, precision);
                    return iMath.customRound(number * factor) / factor;
                }
                else{
                    return +(iMath.customRound(Number(number + "e+" + precision)) +
                    "e-" + precision);
        }
    }

    public static customRound(value: number): number {
        const integerPart = value | 0; // Bitwise OR with 0 to get the integer part
        const decimalPart = value - integerPart;
        if (decimalPart === 0.5) {
          return (integerPart % 2 === 0) ? integerPart : integerPart + 1;
        }
        return decimalPart > 0.5 ? integerPart + 1 : integerPart;
      }

    public static Abs = function(value:number):number{
        return Math.abs(value);
    }
    public static Ceil = function(value:number):number{
        return Math.ceil(value);
    }
    public static Pow = function(value:number,power:number):number{
        return Math.pow(value,power);
    }
    public static Floor = function(value:number):number{
        return Math.floor(value);
    }
    public static Sqrt = function(value:number):number{
        return Math.sqrt(value);
    }
    public static Log10 = function(value:number):number{
        return Math.log10(value);
    }
    public static Max = function(...value:number[]):number{
        return Math.max(...value);
    }
    public static Ceiling = function(value:number):number{
        return Math.ceil(value);
    }
}