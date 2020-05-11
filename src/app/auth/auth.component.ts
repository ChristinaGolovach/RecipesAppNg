import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthResponseData } from './models/auth-response-data.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    onSwitchMode(): void {
        this.isLoginMode = ! this.isLoginMode;
        this.error = null;
    }

    onSubmit(authForm: NgForm): void {
        const email = authForm.value.email;
        const password = authForm.value.password;
        let authResponse$: Observable<AuthResponseData>;

        this.isLoading = true;

        if (this.isLoginMode) {
            authResponse$ = this.authService.login(email, password);
        } else {
            authResponse$ = this.authService.signup(email, password);
        }

        authResponse$.subscribe(() => {
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, error => {
            this.error = error;
            this.isLoading = false;
        });

        authForm.reset();
    }
}