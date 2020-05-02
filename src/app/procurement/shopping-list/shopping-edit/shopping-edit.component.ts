import { Component, OnInit, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameElement: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput') amountElement: ElementRef<HTMLInputElement>;

  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient(): void {
    const name = this.nameElement.nativeElement.value;
    const amount = +this.amountElement.nativeElement.value;

    const newIngredient =  new Ingredient(name, amount);

    this.ingredientAdded.emit(newIngredient);
  }
}
