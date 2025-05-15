import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import * as RacerActions from './racer.actions';
import {RacerService} from "./racer.service";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {selectAllRacers} from "./racer.selectors";
import {AuthService} from "../../view/login/auth/auth.service";

@Injectable()
export class RacerEffects {
    private actions$ = inject(Actions);
    private racerService = inject(RacerService);
    private authService = inject(AuthService);
    private store = inject(Store);

    loadRacers$ = createEffect((): Observable<any> =>
        this.actions$.pipe(
            ofType(RacerActions.loadRacers),
            withLatestFrom(this.store.select(selectAllRacers)),
            filter(() => this.authService.isLoggedIn()),
            switchMap((tuple) => {
                    const [actions, racers] = tuple
                    const lastIndex = racers.length - 1 > 0 ? racers.length - 1 : 0
                    return this.racerService.getAll(lastIndex).pipe(
                        map(racers => RacerActions.loadRacersSuccess({racers})),
                    )
                }
            )
        )
    );
}
