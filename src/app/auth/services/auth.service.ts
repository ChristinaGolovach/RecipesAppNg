import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthCredentials } from '../models/auth-credentials.model';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthResponseData } from '../models/auth-response-data.model';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly apiKey = environment.firebase.apiKey;
    private readonly signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
    private readonly logInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
    private readonly userDataStorageKey = 'userData';
    private user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any = null;

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

    autoLogin(): void {
        const user = JSON.parse(localStorage.getItem(this.userDataStorageKey));

        if (!user) {
            return;
        }
        
        const tokenExpirationDate = new Date(user.tokenExpirationDate);
        const loadedUser = new User(user.email, user.id, user.tokenValue, tokenExpirationDate);

        if (loadedUser.token) {
            this.user.next(loadedUser);
            this.autoLogout(tokenExpirationDate.getTime() - new Date().getTime());
        }
    }

    logout(): void {
        this.user.next(null);
        localStorage.removeItem(this.userDataStorageKey);

        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;

        this.router.navigate(['/auth']);
    }

    private autoLogout(expirationDurationInMS: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDurationInMS);
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
        localStorage.setItem(this.userDataStorageKey, JSON.stringify(user));
        this.autoLogout(tokenExpirationInMsNumber);
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