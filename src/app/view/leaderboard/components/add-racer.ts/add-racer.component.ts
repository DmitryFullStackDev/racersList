import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Color, Racer} from '../../../../models/racer.model';
import {CommonModule, NgForOf} from "@angular/common";

@Component({
    selector: 'app-add-racer',
    standalone: true,
    imports: [CommonModule, FormsModule, NgForOf],
    templateUrl: './add-racer.component.html',
    styleUrls: ['./add-racer.component.css'],
})
export class AddRacerComponent {
    @Output() racerAdded = new EventEmitter<Racer>();

    name = '';
    time: number | null = null;
    speed: number | null = null;
    selectedColor: Color = Color.RED;
    Color = Color;

    colorOptions = [
        {value: Color.RED, label: 'Red', css: 'red'},
        {value: Color.GREEN, label: 'Green', css: 'green'},
        {value: Color.BLUE, label: 'Blue', css: 'blue'}
    ];

    nameValid = true;
    timeValid = true;
    colorValid = true;
    speedValid = true;

    onSubmit() {
        this.nameValid = this.name.trim() !== '';
        this.timeValid = this.time !== null;
        this.speedValid = this.speed !== null;

        if (this.name.trim() === '' || this.time === null || this.speed === null) {
            return;
        }

        const newRacer: Racer = {
            name: this.name,
            time: this.time,
            speed: this.speed,
            color: this.selectedColor
        };
        this.racerAdded.emit(newRacer);

        this.name = '';
        this.time = null;
        this.selectedColor = Color.RED;
    }

    selectColor(color: Color) {
        this.selectedColor = color;
    }
}
