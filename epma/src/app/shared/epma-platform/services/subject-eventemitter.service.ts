import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SubjectEventEmitterService {
    SearchCompleted = false;
    public buttonIsEnabledSubject: Subject<any> = new Subject();
    public buttonstate = this.buttonIsEnabledSubject.asObservable();

    public responseEventEmitter: Subject<string> = new Subject<string>();


    passButtonIsEnabledValue(data) {
        if (typeof data.IsEnabled == 'string') {
            data.IsEnabled = data.IsEnabled == 'true' ? true : false;
        }
        this.buttonIsEnabledSubject.next(data);
    }


}