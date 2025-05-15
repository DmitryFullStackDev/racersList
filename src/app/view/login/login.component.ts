import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthService} from "./auth/auth.service";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [FormsModule],
})
export class LoginComponent {
    username = '';
    password = '';

    constructor(private authService: AuthService, private router: Router) {
    }

    onSubmit() {
        if (this.username === 'admin' && this.password === 'admin') {
            this.authService.login();
            this.router.navigate(['/leaderboard']);
        } else {
            alert('Invalid credentials');
        }
    }
}
