import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, exhaustMap, concatMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.user$
            .pipe(
                take(1),
                exhaustMap(user => {
                    if (!user){
                        return next.handle(req);
                    }

                    const modifiedRequest = req.clone({ params: new HttpParams().set('auth', user.token) });

                    return next.handle(modifiedRequest);
                }));
    }
}

//https://medium.com/@shairez/a-super-ninja-trick-to-learn-rxjss-switchmap-mergemap-concatmap-and-exhaustmap-forever-88e178a75f1b
// “Concat” Strategy —Queuing up every new Observable, and subscribing to a new observable only when the last observable completed.
// “Exhaust” strategy — the “don’t interrupt me” strategy, ignores (and never subscribe to) any new mapped Observable while the current Observable is still emitting values.