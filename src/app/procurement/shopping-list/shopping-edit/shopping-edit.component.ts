import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameElement: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput') amountElement: ElementRef<HTMLInputElement>;

  constructor(
    private shoppingListService: ShoppingListService
  ) { }

  ngOnInit(): void {
  }

  onAddIngredient(): void {
    const name = this.nameElement.nativeElement.value;
    const amount = +this.amountElement.nativeElement.value;
    const newIngredient = new Ingredient(name, amount);

    this.shoppingListService.addIngredients(newIngredient);
  }
}
