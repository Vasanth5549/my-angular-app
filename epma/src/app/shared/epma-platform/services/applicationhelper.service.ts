export class ApplicationHelper {
  public static get ActualWidth():number {    
    return document.getElementById('ePMABody').clientWidth;
  }

  public static get ActualHeight():number{    
    return document.getElementById('ePMABody').clientHeight;
  }

  public static get AbsoluteUri():string{
    //return document.URL;
    return window.location.href;
  }
}