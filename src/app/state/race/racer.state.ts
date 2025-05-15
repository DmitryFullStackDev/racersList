import {Racer} from "../../models/racer.model";

export interface RacerState {
    racers: Racer[];
    loading: boolean;
}

export const initialRacerState: RacerState = {
    racers: [],
    loading: false,
};
