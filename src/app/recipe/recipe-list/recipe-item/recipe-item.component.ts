import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../recipe.service';
import { DestroyableComponent } from 'src/app/shared/classes/destroyable-component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent extends DestroyableComponent implements OnInit {
  readonly maxNameLength = 40;
  readonly maxDescriptionLength = 20;

  @Input() recipe: Recipe;
  @Input() index: number;

  constructor(
    private recipeService: RecipeService
    ) {
      super();
    }

  ngOnInit() {
    this.recipeService.recipeChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(recipe => {
        if(recipe.id === this.index) {
          this.recipe.name = recipe.recipe.name;
          this.recipe.description = recipe.recipe.description;
        }
      });
  }
}
