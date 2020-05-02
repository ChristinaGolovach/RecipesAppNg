import { Component, OnInit, Input } from '@angular/core';
import { RecipeComponent } from '../recipe.component';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  
  constructor() { }

  ngOnInit(): void {
  }

}
