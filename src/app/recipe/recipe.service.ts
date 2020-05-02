import { Injectable, EventEmitter } from '@angular/core';

import { Recipe } from './models/recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../procurement/shopping-list/shopping-list.service';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe(
            'Test recipe1',
            'Test description',
            'https://c.pxhere.com/photos/c7/2d/bowl_cuisine_delicious_dinner_dish_epicure_food_frying_pan-1523981.jpg!d',
            [
                new Ingredient('potato', 5),
                new Ingredient('leek', 1)
            ]),
        new Recipe(
            'Test recipe2',
            'Test description', 
            'https://c.pxhere.com/photos/70/46/cookies_baked_goods_frisch_chocolate_sweet_calories_milk_icing_sugar-1038105.jpg!d',
            [
                new Ingredient('egg', 2),
                new Ingredient('flour', 1)
            ])
    ];

    recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

    constructor(
        private shoppingListService: ShoppingListService
    ) { }

    getRecipes(): Recipe[] {
        return [...this.recipes];
    }

    addIngredientsToShoppingList(...ingredients: Ingredient[]): void {
        this.shoppingListService.addIngredients(...ingredients);
    }
}