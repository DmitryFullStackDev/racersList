export enum Color {
    RED,
    GREEN,
    BLUE
}

export interface Racer {
    speed: number;
    name: string;
    time: number;
    color: Color;
}
