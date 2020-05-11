import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from 'src/app/recipe/models/recipe.model';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    private apiUrl: string = environment.apiUrl;
    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) { }

    getRecipes(): Observable<Recipe[]> {
        return this.authService.user$.pipe(
            take(1),
            exhaustMap(user => {
                return this.httpClient.get<Recipe[]>(`${this.apiUrl}recipes.json`, { params: new HttpParams().set('auth', user.token) });
            }),
            catchError(this.handleError));

        // return this.httpClient.get<Recipe[]>(`${this.apiUrl}recipes.json`)
        //     .pipe(catchError(this.handleError));
    }

    getRecipe(index: number): Observable<Recipe> {
        return this.httpClient.get<Recipe>(`${this.apiUrl}recipes/${index}.json`)
            .pipe(catchError(this.handleError));
    }

    //TODO delete
    storeRecipes(recipes: Recipe[]): void {
        this.httpClient.put(`${this.apiUrl}recipes.json`, recipes).subscribe();
    }

    addRecipe(recipe: Recipe[]): Observable<Recipe[]> {
        return this.httpClient.put<Recipe[]>(`${this.apiUrl}recipes.json`, recipe)
            .pipe(catchError(this.handleError))
    }

    updateRecipe(index: number, recipe: Recipe): Observable<Recipe>{
        return this.httpClient.put<Recipe>(`${this.apiUrl}recipes/${index}.json`, recipe)
            .pipe(catchError(this.handleError));
    }

    deleteRecipe(index: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.apiUrl}recipes/${index}.json`)
        .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        if (error.error instanceof ErrorEvent) {
            console.log(`An error occurred:`, error.error.message);
        } else {
            console.log(`Backend return code ${error.status}, body was ${error.error}`);
        }
        return throwError(error);
    }
}