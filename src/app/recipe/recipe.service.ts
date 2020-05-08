import { Injectable } from '@angular/core';

import { Recipe } from './models/recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../procurement/shopping-list/shopping-list.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe({
            name: 'Test recipe1',
            description: 'Test description',
            imagePath: 'https://c.pxhere.com/photos/c7/2d/bowl_cuisine_delicious_dinner_dish_epicure_food_frying_pan-1523981.jpg!d',
            ingredients:[
                new Ingredient('potato', 5),
                new Ingredient('leek', 1)
            ]}),
        new Recipe({
            name: 'Test recipe2',
            description: 'Test description', 
            imagePath: 'https://c.pxhere.com/photos/70/46/cookies_baked_goods_frisch_chocolate_sweet_calories_milk_icing_sugar-1038105.jpg!d',
            ingredients: [
                new Ingredient('egg', 2),
                new Ingredient('flour', 1)
            ]})
    ];

    private recipeChanged: Subject<Recipe[]> = new Subject<Recipe[]>();
    recipeChanged$: Observable<Recipe[]> = this.recipeChanged.asObservable();

    constructor(
        private shoppingListService: ShoppingListService
    ) { }

    getRecipes(): Recipe[] {
        return [...this.recipes];
    }

    getRecipe(id: number ): Recipe {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(...ingredients: Ingredient[]): void {
        this.shoppingListService.addIngredients(...ingredients);
    }

    addRecipe(recipe: Recipe): void {
        this.recipes = [...this.recipes, recipe];
        this.emitChanges();
    }

    updateRecipe(index: number, recipe: Recipe): void {
        this.recipes[index] = recipe;
        this.emitChanges();
    }

    deleteRecipe(index: number): void {
        this.recipes.splice(index, 1);
        this.emitChanges();
    }

    setRecipes(recipes: Recipe[]): void {
        this.recipes = recipes;
        this.emitChanges();
    }

    private emitChanges(): void {
        this.recipeChanged.next([... this.recipes]);
    }
}