import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class ThingsService {
  performAction(): Observable<string> {
    return of('Thing Action Performed');
  }
}
