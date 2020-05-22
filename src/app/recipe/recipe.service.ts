import { Injectable } from '@angular/core';

import { Recipe } from './models/recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../procurement/shopping-list/shopping-list.service';
import { Subject, Observable } from 'rxjs';
import { DataStorageService } from '../shared/services/data-storage.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private recipes: Recipe[] = [];

    private recipesChanged: Subject<void> = new Subject<void>();
    recipesChanged$: Observable<void> = this.recipesChanged.asObservable();

    constructor(
        private shoppingListService: ShoppingListService,
        private dataStorageService: DataStorageService
    ) { }

    getRecipes(): Observable<Recipe[]> {
        return this.dataStorageService.getRecipes()
            .pipe(
                map(recipes =>
                    this.recipes = recipes.map(recipe => this.mapRecipeIngredients(recipe))
            ));
    }

    getRecipe(id: number ): Observable<Recipe> {
        return this.dataStorageService.getRecipe(id)
            .pipe(
                map(recipe => this.mapRecipeIngredients(recipe)
            ));
    }

    addRecipe(recipe: Recipe): Observable<Recipe[]> {
        this.recipes = [...this.recipes, recipe]

        return this.dataStorageService.addRecipe(this.recipes)
            .pipe(tap(() => this.emitChanges()));
    }

    updateRecipe(index: number, recipe: Recipe): Observable<Recipe> {
        return this.dataStorageService.updateRecipe(index, recipe);
    }

    deleteRecipe(index: number): Observable<any> {
        return this.dataStorageService.deleteRecipe(index)
            .pipe(tap(() => this.emitChanges()));
    }

    searchRecipes(recipeName: string): Observable<any> {
        return this.dataStorageService.searchRecipes(recipeName)
            .pipe(
                map(recipes =>
                    this.recipes = Object.values(recipes)
                                         .map((recipe: Recipe) => this.mapRecipeIngredients(recipe))
                    )
            );
    }

    addIngredientsToShoppingList(...ingredients: Ingredient[]): void {
        this.shoppingListService.addIngredients(...ingredients);
    }

    private emitChanges(): void {
        this.recipesChanged.next()
    }

    private mapRecipeIngredients(recipe: Recipe): Recipe {
        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
    }
}