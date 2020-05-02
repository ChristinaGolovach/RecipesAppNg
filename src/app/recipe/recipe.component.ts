import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { RecipeService } from './recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit, OnDestroy {
  currentRecipe: Recipe;
  private subscription: Subscription;

  constructor(
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.subscription = this.recipeService
      .recipeSelected.subscribe((recipe: Recipe) => { this.currentRecipe = recipe; });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
