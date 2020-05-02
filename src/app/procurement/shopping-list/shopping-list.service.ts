import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 7)
  ];

  ingredientAdded: EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>();

  constructor() { }

  getIngredients(): Ingredient[] {
    return [... this.ingredients];
  }

  addIngredients(...ingredient: Ingredient[]): void {
    this.ingredients = [...this.ingredients, ...ingredient];
    this.ingredientAdded.emit([... this.ingredients]);
  }
}
