import {createAction, props} from '@ngrx/store';
import {Racer} from "../../models/racer.model";

export const loadRacers = createAction('[Racer] Load');
export const loadRacersSuccess = createAction('[Racer] Load Success', props<{ racers: Racer[] }>());
export const addRacer = createAction('[Racer] Add', props<{ racer: Racer }>());
