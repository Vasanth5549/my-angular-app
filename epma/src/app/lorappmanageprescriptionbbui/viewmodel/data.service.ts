import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class SubService {
  public patientData = {};
  public getDate(): Date {
    return new Date();
  }
}
