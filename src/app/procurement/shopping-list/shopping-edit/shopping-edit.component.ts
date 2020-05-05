import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscription: Subscription;
  private ingredientIndex: number;

  isEditMode: boolean = false;

  @ViewChild('tdForm') form: NgForm;

  constructor(
    private shoppingListService: ShoppingListService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.subscription = this.shoppingListService.ingredientPassedToEdit$
      .subscribe(([ingredient, index]) => {
        this.updateFormValue(ingredient)
        this.isEditMode = true;
        this.ingredientIndex = index;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit(form: NgForm): void {
    const name = form.value.name; // form.controls['name'].value;
    const amount = form.value.amount;
    const ingredient = new Ingredient(name, amount);

    this.isEditMode
      ? this.shoppingListService.editIngredient(this.ingredientIndex, ingredient)
      : this.shoppingListService.addIngredients(ingredient);
    
    this.onClear();
  }

  onDelete(): void {
    this.shoppingListService.deleteIngredient(this.ingredientIndex);
    this.onClear();
  }

  onClear(): void {
    this.isEditMode = false;
    this.form.reset();
  }

  private updateFormValue(ingredient: Ingredient): void {
    this.form.setValue({
      name: ingredient.name,
      amount: ingredient.amount
    });
  }
}
