import { Action, createReducer, on } from '@ngrx/store';
import * as ThingActions from './things.actions';
import { LogEntry, ThingEntity } from './things.models';

export const THINGS_FEATURE_KEY = 'things';

export interface ThingsState {
  log: LogEntry[];
  things: ThingEntity[];
}

export interface ThingsPartialState {
  readonly [THINGS_FEATURE_KEY]: ThingsState;
}

export const initialState: ThingsState = {
  log: [],
  things: []
};

const thingsReducer = createReducer(
  initialState,
  on(ThingActions.addLogEntry, (state, action) => ({
    ...state,
    log: [...state.log, action.entry]
  }))
);

export function reducer(state: ThingsState | undefined, action: Action) {
  return thingsReducer(state, action);
}
