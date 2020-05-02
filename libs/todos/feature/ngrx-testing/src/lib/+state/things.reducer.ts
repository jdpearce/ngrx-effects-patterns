import { Action, createReducer, on } from '@ngrx/store';
import * as ThingActions from './things.actions';

export const THINGS_FEATURE_KEY = 'things';

export interface ThingEntity {
  id: string;
  name: string;
}

export interface LogEntry {
  time: number;
  message: string;
}

export interface ThingsState {
  log: LogEntry[];
}

export interface ThingsPartialState {
  readonly [THINGS_FEATURE_KEY]: ThingsState;
}

export const initialState: ThingsState = {
  log: []
};

const thingsReducer = createReducer(
  initialState,
  on(
    ThingActions.performThingAction,
    ThingActions.getThings,
    ThingActions.getThingsSuccess,
    ThingActions.getThingsFailure,
    (state, action) => ({
      ...state,
      log: [
        ...state.log,
        {
          time: Date.now(),
          message: action.type
        }
      ]
    })
  )
);

export function reducer(state: ThingsState | undefined, action: Action) {
  return thingsReducer(state, action);
}
