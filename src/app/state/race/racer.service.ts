import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {Racer} from '../../models/racer.model';

@Injectable({providedIn: 'root'})
export class RacerService {
    generateRacers(startIndex = 0) {
        return Array.from({length: 50}, (_, i) => ({
            name: `Racer ${startIndex + i + 1}`,
            time: Math.floor(Math.random() * 100000),
            color: Math.floor(Math.random() * 3),
            speed: Math.floor(Math.random() * 100),
        }));
    }

    getAll(startIndex: number) {
        const nextRacers: Racer[] = this.generateRacers(startIndex)
        return of(nextRacers).pipe(delay(500));
    }
}
