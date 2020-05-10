import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DestroyableComponent } from 'src/app/shared/classes/destroyable-component';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent extends DestroyableComponent implements OnInit {
  private recipeId: number;
  recipe: Recipe = new Recipe();

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
      super();
   }

  ngOnInit() {
    this.route.paramMap //or params
      .pipe(switchMap((params: Params) => { 
                          this.recipeId = +params.get('recipeId'); // or params.recipeId;
                          return this.recipeService.getRecipe(this.recipeId); 
                      }),
            takeUntil(this.destroy$))
      .subscribe(recipe => this.recipe = recipe);
  }

  onToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(...this.recipe.ingredients);
  }

  onEditRecipe(): void {
    // this.router.navigate(['edit'], { relativeTo: this.route, state: this.recipe }); // state - pass data to component
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete(): void {
    this.recipeService.deleteRecipe(this.recipeId)
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => this.router.navigate(['../'], { relativeTo: this.route }));
  }
}
