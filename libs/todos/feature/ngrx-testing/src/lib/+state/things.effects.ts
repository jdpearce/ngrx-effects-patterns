import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ThingsService } from '../things.service';
import * as ThingActions from './things.actions';

@Injectable()
export class ThingsEffects {
  // 1. Non-Dispatching Tap Effect
  performThingAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ThingActions.performThingAction),
        tap(() => this.thingService.performAction())
      ),
    { dispatch: false }
  );

  // 2. Dispatching SwitchMap Effect
  getThings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThingActions.getThings),
      switchMap(() =>
        this.thingService.getThings().pipe(
          map(things => ThingActions.getThingsSuccess({ things })),
          catchError(error => of(ThingActions.getThingsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly thingService: ThingsService
  ) {}
}
