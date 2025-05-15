import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-search',
    standalone: true,
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent {
    @Output() search = new EventEmitter<string>();

    onInput(event: Event) {
        const input = event.target as HTMLInputElement;
        this.search.emit(input.value);
    }
}
