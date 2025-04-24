export class StringWrapper {
  public static isNullOrEmpty(value: string): boolean {
    return value === null || value === '' ? true : false;
  }

  public static isNullOrEmptyOrUndefined(value: string): boolean {
    return value === null || value === '' || value === undefined ? true : false;
  }

  public static isNullOrWhiteSpace(value: string): boolean {
    return value === null || value.replace(/\s/g, '') === '' ? true : false;
  }

  public static stringTrimEnd(stringValue: string, paramValue: string): string {
    for (let i = stringValue.length; i > 0; i--) {
      if (stringValue[i] === paramValue)
        stringValue = stringValue
          .substring(0, stringValue.length - 1)
          .trimEnd();
      else break;
    }
    return stringValue;
  }

  public static stringTrimEnds(stringValue: string, paramValue: string): string {
    stringValue = stringValue.trimEnd();
    let i= stringValue.length;
      if (stringValue[i-1] === paramValue)
        stringValue = stringValue
          .substring(0, stringValue.length - 2)
          .trimEnd();     
    return stringValue;
  }

  /**
   * Compares two case-sensitive strings. Can be used as an alternative for String.Equals().
   */
  public static compare(firstValue: string, secondValue: string): boolean {
    if (
      !this.isNullOrEmptyOrUndefined(firstValue) &&
      !this.isNullOrEmptyOrUndefined(secondValue)
    ) {
      return firstValue === secondValue ? true : false;
    } else return false;
  }

  /**
   * Compares two case-insensitive strings
   */
  public static compareCaseInsensitive(
    firstValue: string,
    secondValue: string
  ): boolean {
    if (
      !this.isNullOrEmptyOrUndefined(firstValue) &&
      !this.isNullOrEmptyOrUndefined(secondValue)
    ) {
      return firstValue.toUpperCase() === secondValue.toUpperCase()
        ? true
        : false;
    } else return false;
  }

  public static format(str: string, value: string|number|boolean): string{
    return str.replace('{0}', value as string);
  }
}
