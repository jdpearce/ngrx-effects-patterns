import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ThingEntity } from './+state/things.models';

/**
 * This is just a dummy class.
 * Imagine these methods actually did useful things instead.
 */
@Injectable()
export class ThingsService {
  performAction(): Observable<string> {
    return of('Thing Action Performed');
  }

  getThings(): Observable<ThingEntity[]> {
    return of([
      {
        id: '1',
        name: 'Thing 1'
      },
      {
        id: '2',
        name: 'Thing 2'
      }
    ]);
  }
}
