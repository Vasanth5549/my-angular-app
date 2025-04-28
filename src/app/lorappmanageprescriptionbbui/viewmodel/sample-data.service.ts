import { Observable } from 'rxjs';
import * as EncounterSampleData from '../../../assets/json/GetEncountersPaging.json';

export class SampleDataService {
  static GetDefault() {
    return EncounterSampleData['default'];
  }
  static GetEncounterSampleData(): Observable<any> {
    return new Observable((observer) => {
      observer.next(
        SampleDataService.GetDefault().Envelope.Body.GetEncountersPagingResponse.GetEncountersPagingResult
      );
      observer.complete();
    });
  }
}
