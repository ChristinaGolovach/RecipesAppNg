import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 7)
  ];
  private ingredientAdded: Subject<Ingredient[]> = new Subject<Ingredient[]>();

  ingredientAdded$: Observable<Ingredient[]> = this.ingredientAdded.asObservable();

  constructor() { }

  getIngredients(): Ingredient[] {
    return [... this.ingredients];
  }

  addIngredients(...ingredient: Ingredient[]): void {
    this.ingredients = [...this.ingredients, ...ingredient];
    this.ingredientAdded.next([... this.ingredients]);
  }
}
