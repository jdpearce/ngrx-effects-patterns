import { Action, createReducer, on } from '@ngrx/store';
import * as ThingActions from './things.actions';

export const THINGS_FEATURE_KEY = 'things';

export interface ThingsState {
  log: string[];
}

export interface ThingsPartialState {
  readonly [THINGS_FEATURE_KEY]: ThingsState;
}

export const initialState: ThingsState = {
  log: []
};

const thingsReducer = createReducer(
  initialState,
  on(ThingActions.performThingAction, (state, action) => ({
    ...state,
    log: [...state.log, `${new Date().toLocaleDateString()} : ${action.type}`]
  }))
);

export function reducer(state: ThingsState | undefined, action: Action) {
  return thingsReducer(state, action);
}
