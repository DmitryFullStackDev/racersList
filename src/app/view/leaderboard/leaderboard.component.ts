import {Component, computed, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from '@ngrx/store';
import {toSignal} from '@angular/core/rxjs-interop';

import {SearchComponent} from './components/search/search.component';
import {AddRacerComponent} from './components/add-racer.ts/add-racer.component';
import {Racer} from '../../models/racer.model';
import {RacerState} from '../../state/race/racer.state';
import * as RacerActions from '../../state/race/racer.actions';
import * as RacerSelectors from '../../state/race/racer.selectors';
import {debounceTime, Subject} from "rxjs";

@Component({
    selector: 'app-leaderboard',
    standalone: true,
    imports: [CommonModule, SearchComponent, AddRacerComponent],
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
    private store = inject<Store<RacerState>>(Store);
    showAddModal = false;
    colorOptions = ["red", 'green', 'blue']
    selectedRacerId = signal<number | null>(null);
    racersSignal = toSignal(this.store.select(RacerSelectors.selectAllRacers));
    loadingRacersSignal = toSignal(this.store.select(RacerSelectors.selectRacersLoading));
    private searchSubject = new Subject<string>();
    private debouncedSearchQuery = signal('');

    filteredRacers = computed(() => {
        const query = this.debouncedSearchQuery().toLowerCase();
        const racers = this.racersSignal() ?? [];

        return query
            ? racers.filter(racer => racer.name.toLowerCase().includes(query))
            : racers;
    });

    constructor() {
        this.store.dispatch(RacerActions.loadRacers() as any)
        this.searchSubject.pipe(debounceTime(200)).subscribe(query => {
            this.debouncedSearchQuery.set(query);
        });
    }

    get noResults() {
        return this.filteredRacers().length === 0 && this.debouncedSearchQuery() !== '';
    }

    onSearch(query: string) {
        this.searchSubject.next(query);
    }

    handleAddRacer(racer: Racer) {
        this.store.dispatch(RacerActions.addRacer({racer}) as any);
        this.showAddModal = false;
    }

    closeModal() {
        this.showAddModal = false;
    }

    stopPropagation(event: MouseEvent) {
        event.stopPropagation();
    }

    selectRacer(racerId: number) {
        if (racerId === this.selectedRacerId()) {
            this.selectedRacerId.set(null);
            return
        }

        this.selectedRacerId.set(racerId);
    }

    formatTime(ms: number): string {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = ms % 1000;

        const pad = (n: number, z = 2) => n.toString().padStart(z, '0');
        const padMs = (n: number) => n.toString().padStart(3, '0');

        return `${pad(minutes)}:${pad(seconds)}.${padMs(milliseconds)}`;
    }

    onScroll(event: Event) {
        const target = event.target as HTMLElement;
        const atBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 50;
        const loading = this.loadingRacersSignal()
        if (atBottom && !loading) {
            this.loadMoreRacers();
        }
    }

    loadMoreRacers() {
        this.store.dispatch(RacerActions.loadRacers() as any);
    }
}
