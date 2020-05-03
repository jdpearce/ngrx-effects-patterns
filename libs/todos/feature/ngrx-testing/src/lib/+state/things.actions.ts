import { createAction, props } from '@ngrx/store';
import { LogEntry, ThingEntity } from './things.models';

export const addLogEntry = createAction(
  '[Thing Actions] Add Log Entry',
  props<{ entry: LogEntry }>()
);

export const performThingAction = createAction(
  '[Thing Actions] Perform Thing Action'
);

export const getThings = createAction('[Thing Actions] Get Things');
export const getThingsSuccess = createAction(
  '[Thing Actions] Get Things Success',
  props<{ things: ThingEntity[] }>()
);
export const getThingsFailure = createAction(
  '[Thing Actions] Get Things Failure',
  props<{ error: any }>()
);

export const initialisingAction = createAction(
  '[Thing Actions] Initialising Action'
);
export const initialiseComplete = createAction(
  '[Thing Actions] Initialise Complete'
);

export const thingsModified = createAction('[Thing Actions] Things Modified');

export const startThingTimer = createAction(
  '[Thing Actions] Start Thing Timer'
);
export const thingTimerComplete = createAction(
  '[Thing Actions] Thing Timer Complete'
);
