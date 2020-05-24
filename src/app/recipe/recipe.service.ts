import { Injectable } from '@angular/core';

import { Recipe } from './models/recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../procurement/shopping-list/shopping-list.service';
import { Subject, Observable } from 'rxjs';
import { DataStorageService } from '../shared/services/data-storage.service';
import { map, tap, concatMap } from 'rxjs/operators';
import { FileUpload } from '../shared/models/file-upload.model';
import { UploadFileService } from '../shared/services/upload-file.service';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private recipes: Recipe[] = [];

    private recipesChanged: Subject<void> = new Subject<void>();
    recipesChanged$: Observable<void> = this.recipesChanged.asObservable();

    private recipeChanged: Subject<{id: number, recipe: Recipe}> = new Subject<{id: number, recipe: Recipe}>();
    recipeChanged$: Observable<{id: number, recipe: Recipe}> = this.recipeChanged.asObservable();

    constructor(
        private shoppingListService: ShoppingListService,
        private dataStorageService: DataStorageService,
        private uploadService: UploadFileService
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

    addRecipe(recipe: Recipe, imageUpload: FileUpload): Observable<Recipe[]> {
        if (imageUpload) {
            return this.uploadService.pushFileToStorage(imageUpload)
                .pipe(
                    concatMap(imageDownloadUrl => {
                        recipe.imagePath = imageDownloadUrl;
                        this.recipes = [...this.recipes, recipe]
                        return this.dataStorageService.addRecipe(this.recipes)
                    }),
                    tap(() => this.emitChanges())
                );
        } else {
            this.recipes = [...this.recipes, recipe];

            return this.dataStorageService.addRecipe(this.recipes)
                .pipe(tap(() => this.emitChanges()));
        }
    }

    updateRecipe(index: number, recipe: Recipe, imageUpload: FileUpload): Observable<Recipe> {
        if (imageUpload) {
            return this.uploadService.pushFileToStorage(imageUpload)
                .pipe(
                    concatMap(imageDownloadUrl => {
                        recipe.imagePath = imageDownloadUrl;
                        return this.dataStorageService.updateRecipe(index, recipe)
                    }),
                    tap(() => this.emitChanges())
                );
        } else {
            return this.dataStorageService.updateRecipe(index, recipe)
                .pipe(tap(() => this.emitChanges()));
        }
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

    emitEditingValue(recipeId: number, recipe: Recipe): void {
        this.recipeChanged.next({id: recipeId, recipe: recipe});
    }

    private emitChanges(): void {
        this.recipesChanged.next()
    }

    private mapRecipeIngredients(recipe: Recipe): Recipe {
        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
    }
}