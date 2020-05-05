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
  private ingredientsChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  private ingredientPassedToEdit: Subject<[Ingredient, number]> = new Subject<[Ingredient, number]>();

  ingredientsChanged$: Observable<Ingredient[]> = this.ingredientsChanged.asObservable();
  ingredientPassedToEdit$: Observable<[Ingredient, number]> = this.ingredientPassedToEdit.asObservable();

  constructor() { }

  getIngredients(): Ingredient[] {
    return [... this.ingredients];
  }

  addIngredients(...ingredient: Ingredient[]): void {
    this.ingredients = [...this.ingredients, ...ingredient];
    this.ingredientsChanged.next([... this.ingredients]);
  }

  editIngredient(index: number, ingredient: Ingredient): void {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next([... this.ingredients]);
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next([... this.ingredients]);
  }

  passIngredientToEdit(index: number): void {
    const ingredients = [... this.ingredients];
    this.ingredientPassedToEdit.next([ingredients[index], index]);
  }
}
