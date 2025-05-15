import {createReducer, on} from '@ngrx/store';
import * as RacerActions from './racer.actions';
import {initialRacerState} from './racer.state';

export const racerReducer = createReducer(
    initialRacerState,
    on(RacerActions.loadRacers, state => ({...state, loading: true})),
    on(RacerActions.loadRacersSuccess, (state, {racers}) => ({
        ...state,
        racers: [...state.racers, ...racers],
        loading: false
    })),
    on(RacerActions.addRacer, (state, {racer}) => ({
        ...state,
        racers: [...state.racers, racer],
    })),
);
