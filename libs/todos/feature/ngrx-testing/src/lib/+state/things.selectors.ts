import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ThingsPartialState,
  ThingsState,
  THINGS_FEATURE_KEY
} from './things.reducer';

// Lookup the 'Things' feature state managed by NgRx
export const getThingsState = createFeatureSelector<
  ThingsPartialState,
  ThingsState
>(THINGS_FEATURE_KEY);

export const getLog = createSelector(getThingsState, state => state.log);

export const selectThings = createSelector(
  getThingsState,
  state => state.things
);
