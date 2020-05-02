import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ThingsService } from '../things.service';
import * as ThingActions from './things.actions';

@Injectable()
export class ThingsEffects {
  performThingAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ThingActions.performThingAction),
        tap(() => this.thingService.performAction())
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly thingService: ThingsService
  ) {}
}
