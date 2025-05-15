import {Routes} from '@angular/router';
import {LeaderboardComponent} from './view/leaderboard/leaderboard.component';
import {LoginComponent} from "./view/login/login.component";
import {AuthGuard} from "./view/login/auth/auth.guard";

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard]}
];
