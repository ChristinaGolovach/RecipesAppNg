import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipe.service';
import { KeyValue } from 'src/app/shared/models/key-value.model';

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
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((params: Params) => {
        this.recipeId = +params.get('recipeId');
        this.isEditMode = !!params.get('recipeId');
        this.recipeForm = this.initForm();

        if (this.isEditMode) {
          this.setValueForm(this.recipeForm, this.recipeId);
        }
      });
  }

  onSubmit(): void {
    
  }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  private initForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, Validators.required),
      imagePath: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      ingredients: new FormArray([])
    })
  }

  private setValueForm(form: FormGroup, recipeId: number): void {
    const recipe = this.recipeService.getRecipe(recipeId);

    const ingredientFromGroups = recipe.ingredients
      .map(ingredient => new FormGroup({
        name: new FormControl(ingredient.name, Validators.required),
        amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      }));

    form.controls['ingredients'] = new FormArray([...ingredientFromGroups]);

    form.patchValue({
      name: recipe.name,
      imagePath: recipe.imagePath,
      description: recipe.description
    });
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
