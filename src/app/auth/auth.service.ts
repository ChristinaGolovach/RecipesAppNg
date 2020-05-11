import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthCredentials } from './models/auth-credentials.model';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { AuthResponseData } from './models/auth-response-data.model';
import { catchError, tap } from 'rxjs/operators';
import { User } from './models/user.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiKey = 'AIzaSyBbjco0sAg0z0fcadTxp1hvyVXaMKa5gxY';
    private signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
    private logInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
    private user = new BehaviorSubject<User>(null);

    user$ = this.user.asObservable();

    private authData: AuthCredentials = {
        email: '',
        password: '',
        returnSecureToken: true
    }

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) {}

    signup(email: string, password: string): Observable<AuthResponseData> {
        this.setCredentialsData(email, password);

        return this.postData(this.signUpUrl);
    }

    login(email: string, password: string): Observable<AuthResponseData> {
        this.setCredentialsData(email, password);

        return this.postData(this.logInUrl);
    }

    logout(): void {
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    private postData(url: string): Observable<AuthResponseData> {
        return this.httpClient.post<AuthResponseData>(url, this.authData)
            .pipe(catchError(this.handleError),
                tap(response => this.createUser(response)));
    }

    private setCredentialsData(email: string, password: string) {
        this.authData.email = email;
        this.authData.password = password;
    }

    private createUser(response: AuthResponseData) {
        const tokenExpirationInMsNumber = +response.expiresIn * 1000;
        const tokenExpirationDate = new Date(new Date().getTime() + tokenExpirationInMsNumber);
        const user = new User(response.email, response.localId, response.idToken, tokenExpirationDate)

        this.user.next(user);
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = "An unknown error occurred.";
        if (!error.error || !error.error.error) {
            return throwError(errorMessage);
        }

        switch (error.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'The email address is already in use by another account.';
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'Password sign-in is disabled for this project';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password.';
                break;
            case 'USER_DISABLED':
                errorMessage = 'he user account has been disabled by an administrator.';
                break;
        }

        return throwError(errorMessage)
    }

    // private setErrorMessage(error: HttpErrorResponse) : string {
    //     let errorMessage = '';
    //     switch (error.error.error.message) {
    //         case 'EMAIL_EXISTS':
    //             errorMessage = 'The email address is already in use by another account.';
    //             break;
    //         case 'OPERATION_NOT_ALLOWED':
    //             errorMessage = 'Password sign-in is disabled for this project';
    //             break;
    //         case 'TOO_MANY_ATTEMPTS_TRY_LATER':
    //             errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
    //             break;
    //         case 'EMAIL_NOT_FOUND':
    //             errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
    //             break;
    //         case 'INVALID_PASSWORD':
    //             errorMessage = 'The password is invalid or the user does not have a password.';
    //             break;
    //         case 'USER_DISABLED':
    //             errorMessage = 'he user account has been disabled by an administrator.';
    //             break;
    //     }

    //     return errorMessage;
    // }
}

// https://firebase.google.com/docs/reference/rest/auth