import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Action } from '@ngrx/store/src/models';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  delay,
  filter,
  map,
  mapTo,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { ThingsService } from '../things.service';
import * as ThingActions from './things.actions';
import { ThingsPartialState } from './things.reducer';
import { selectThings } from './things.selectors';

@Injectable()
export class ThingsEffects {
  static timerDuration = 2000; // 2 seconds

  //#region
  // Tiny hack for adding log messages to state on every action
  addLogEntry$ = createEffect(() =>
    this.actions$.pipe(
      filter(action => action.type !== ThingActions.addLogEntry.type),
      map(action =>
        ThingActions.addLogEntry({
          entry: {
            time: Date.now(),
            message: action.type
          }
        })
      )
    )
  );
  //#endregion

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

  // 3. Multi-Action Dispatch
  initialiseThing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThingActions.initialisingAction),
      switchMap(_action => this.thingService.getThings()),
      switchMap(things => {
        const actions: Action[] = [];
        if (things && things.length) {
          actions.push(ThingActions.getThingsSuccess({ things }));
        }
        actions.push(ThingActions.initialiseComplete());
        return actions;
      })
    )
  );

  // 4. Effects Reading from the Store
  storeReadingEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ThingActions.thingsModified),
        withLatestFrom(this.store.pipe(select(selectThings))),
        concatMap(([_action, things]) =>
          this.thingService.persistThings(things)
        )
      ),
    { dispatch: false }
  );

  // 5. Timed Dispatch Effect
  timedDispatchEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThingActions.startThingTimer),
      delay(ThingsEffects.timerDuration),
      mapTo(ThingActions.thingTimerComplete())
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly thingService: ThingsService,
    private readonly store: Store<ThingsPartialState>
  ) {}
}
