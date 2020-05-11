export class AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string; //The number of seconds in which the ID token expires
    localId: string;
    registered?: boolean;
}