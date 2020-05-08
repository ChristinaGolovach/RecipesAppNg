import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Recipe } from 'src/app/recipe/models/recipe.model';
import { environment } from 'src/environments/environment';
import { RecipeService } from 'src/app/recipe/recipe.service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    private apiUrl: string = environment.apiUrl;
    constructor(
        private httpClient: HttpClient,
        private recipeService: RecipeService
    ) { }

    getRecipes(): void {
        this.httpClient.get<Recipe[]>(`${this.apiUrl}recipes.json`)
            .pipe(map(recipes => 
                recipes.map(recipe => 
                    { return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}})))
            .subscribe(recipes => {
                this.recipeService.setRecipes(recipes);
            });
    }

    storeRecipes(): void {
        const recipes = this.recipeService.getRecipes();
        this.httpClient.put(`${this.apiUrl}recipes.json`, recipes).subscribe();
    }
}