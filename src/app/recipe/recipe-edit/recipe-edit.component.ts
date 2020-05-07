import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  private recipeId: number;
  private isEditMode: boolean = false;
  recipeForm: FormGroup;

  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((params: Params) => {
        this.recipeId = +params.get('recipeId');
        this.isEditMode = !!params.get('recipeId');
        this.recipeForm = this.initForm(this.isEditMode, this.recipeId);
      });
  }

  onSubmit(): void {
    const recipe = this.recipeForm.value;
    this.isEditMode
      ? this.recipeService.updateRecipe(this.recipeId, recipe)
      : this.recipeService.addRecipe(recipe);

      this.navigateBack();
  }

  onCancel(): void {
    this.navigateBack();
  }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(this.createNameAmountFormGroup());
  }

  onDeleteIngredient(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  private initForm(isEditMode: boolean, recipeId: number): FormGroup {
    let recipe = new Recipe();
    let ingredientsFormArray = new FormArray([]);

    if (isEditMode) {
      recipe = this.recipeService.getRecipe(recipeId);
      ingredientsFormArray = this.initIngredientForm(recipe);
    }

    return new FormGroup({
      name: new FormControl(recipe.name, Validators.required),
      imagePath: new FormControl(recipe.imagePath, Validators.required),
      description: new FormControl(recipe.description, Validators.required),
      ingredients: ingredientsFormArray
    });
  }

  private initIngredientForm(recipe: Recipe,): FormArray {
    const ingredientFromGroups = recipe.ingredients
      .map(ingredient => this.createNameAmountFormGroup(ingredient.name, ingredient.amount));

    return new FormArray([...ingredientFromGroups]);
  }

  private navigateBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private createNameAmountFormGroup(name?: string, amount?: number): FormGroup {
    return new FormGroup({
      name: new FormControl(name, Validators.required),
      amount: new FormControl(amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    })
  }

  // private createFormGroup(formControlValues: KeyValue<string,any>[]): FormGroup {
  //   const obj = formControlValues
  //     .reduce((act, current) => ({ ...act, [current.key]: new FormControl(current.value) }), {});

  //   const form = new FormGroup(obj);

  //   return form;
  // }

  // private createKeyValueArray(...arg: [string, any][]): KeyValue<string,any>[] {
  //   const arr: KeyValue<string,any>[] = [];

  //   for(let a of arg) {
  //     arr.push(new KeyValue<string, any>(a[0], a[1]))
  //   }
  //   return arr;
  // }
}
