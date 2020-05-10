import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthCredentials } from './auth-credentials.model';
import { Observable } from 'rxjs';
import { AuthResponseData } from './auth-response-data.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiKey= 'AIzaSyBbjco0sAg0z0fcadTxp1hvyVXaMKa5gxY';
    private authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;

    private authData: AuthCredentials = {
        email: '',
        password: '',
        returnSecureToken: true
    }

    constructor(
        private httpClient: HttpClient
    ) {}

    signup(email: string, password: string): Observable<AuthResponseData> {
        this.authData.email = email;
        this.authData.password = password;

        return this.httpClient.post<AuthResponseData>(this.authUrl, this.authData);
    }
}

// https://firebase.google.com/docs/reference/rest/auth