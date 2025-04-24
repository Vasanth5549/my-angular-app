export class HttpUtility {
    //only stub added
    public static HtmlDecode(html: string): string{
        return '';
    }
    public static HtmlEncode(html: string): string{
        return '';
    }
    public static UrlDecode(url: string): string{
        return decodeURIComponent(url);
    }
    public static UrlEncode(url: string): string{
        return encodeURIComponent(url);
    }
}