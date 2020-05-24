import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from 'src/app/recipe/models/recipe.model';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    private apiUrl: string = environment.firebase.databaseURL;
    constructor(
        private httpClient: HttpClient,
    ) { }

    getRecipes(): Observable<Recipe[]> {
        return this.httpClient.get<Recipe[]>(`${this.apiUrl}/recipes.json`)
            .pipe(catchError(this.handleError));
    }

    getRecipe(index: number): Observable<Recipe> {
        return this.httpClient.get<Recipe>(`${this.apiUrl}/recipes/${index}.json`)
            .pipe(catchError(this.handleError));
    }

    addRecipe(recipe: Recipe[]): Observable<Recipe[]> {
        return this.httpClient.put<Recipe[]>(`${this.apiUrl}/recipes.json`, recipe)
            .pipe(catchError(this.handleError))
    }

    updateRecipe(index: number, recipe: Recipe): Observable<Recipe>{
        return this.httpClient.put<Recipe>(`${this.apiUrl}/recipes/${index}.json`, recipe)
            .pipe(catchError(this.handleError));
    }

    deleteRecipe(index: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.apiUrl}/recipes/${index}.json`)
        .pipe(catchError(this.handleError));
    }

    searchRecipes(recipeName: string) {
        return this.httpClient.get<any>(`${this.apiUrl}/recipes.json?orderBy="name"&equalTo="${recipeName}"&`)
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

    // for search
    // https://firebase.google.com/docs/database/security/indexing-data
    // https://firebase.google.com/docs/database/rest/retrieve-data#section-rest-filtering
    // https://firebase.google.com/docs/reference/rest/database#section-query-parameters