import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {racerReducer} from "./state/race/racer.reducer";
import {RacerEffects} from "./state/race/racer.effects";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideStore({racer: racerReducer}),
        provideEffects([RacerEffects]),
        provideStoreDevtools({
            maxAge: 25,
            logOnly: !isDevMode()
        })
    ]
};

