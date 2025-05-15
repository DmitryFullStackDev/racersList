import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RacerState} from './racer.state';

export const selectRacerState = createFeatureSelector<RacerState>('racer');

export const selectAllRacers = createSelector(
    selectRacerState,
    (state) => state.racers
);

export const selectRacersLoading = createSelector(
    selectRacerState,
    (state) => state.loading
);
