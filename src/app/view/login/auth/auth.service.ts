import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {
    private loggedIn = false;

    constructor() {
        this.loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    }

    login() {
        this.loggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
    }

    isLoggedIn(): boolean {
        return this.loggedIn;
    }
}
