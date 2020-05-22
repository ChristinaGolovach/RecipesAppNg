import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipe.service';
import { DestroyableComponent } from 'src/app/shared/classes/destroyable-component';
import { takeUntil, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent extends DestroyableComponent implements OnInit {
  recipes: Recipe[] = []
  searchValue: string = '';

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
      super();
   }

  ngOnInit() {
    this.getRecipes();

    this.recipeService.recipesChanged$
      .pipe(switchMap(() => this.recipeService.getRecipes()),
            takeUntil(this.destroy$))
      .subscribe(recipes => 
        this.recipes = recipes);
  }

  onSelectRecipeItem(id: number): void {
    this.router.navigate([id], { relativeTo: this.route })
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onClearSearch(): void {
    this.searchValue = '';
    this.getRecipes();
  }

  onSearch(): void {
    this.recipeService.searchRecipes(this.searchValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe(recipes =>
        this.recipes = recipes
        );
  }

  private getRecipes(): void {
    this.recipeService.getRecipes()
    .pipe(takeUntil(this.destroy$))
    .subscribe(recipes => 
      this.recipes = recipes
    );
  }
}