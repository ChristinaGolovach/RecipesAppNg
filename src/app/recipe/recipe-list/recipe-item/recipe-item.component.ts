import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  readonly maxDescriptionLength = 20;

  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit() {
  }

}
