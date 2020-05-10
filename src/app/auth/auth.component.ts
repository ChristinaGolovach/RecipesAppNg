import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;

    constructor(
        private authService: AuthService,
    ) { }

    onSwitchMode(): void {
        this.isLoginMode = ! this.isLoginMode;
    }

    onSubmit(authForm: NgForm): void {
        
    }
}