import { createAction, props } from '@ngrx/store';
import { ThingEntity } from './things.reducer';

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
