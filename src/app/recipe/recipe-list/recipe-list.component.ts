import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Test recipe', 'Test description', 'https://c.pxhere.com/photos/c7/2d/bowl_cuisine_delicious_dinner_dish_epicure_food_frying_pan-1523981.jpg!d')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
