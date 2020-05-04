import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './models/recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  currentRecipe: Recipe;

  constructor(
  ) { }

  ngOnInit() {
  }

}
