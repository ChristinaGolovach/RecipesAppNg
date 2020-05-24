import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormsModule } from '@angular/forms';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipe.service';
import { DestroyableComponent } from 'src/app/shared/classes/destroyable-component';
import { takeUntil, startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { FileUpload } from 'src/app/shared/models/file-upload.model';
import { UploadFileService } from 'src/app/shared/services/upload-file.service';
import { ImageSourceType } from 'src/app/shared/enums/image-source-type.enum';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent extends DestroyableComponent implements OnInit {
  private recipeId: number;
  private isEditMode: boolean = false;
  private editedRecipeInitialValue: Recipe;
  recipeForm: FormGroup;
  currentImageUpload: FileUpload = null;
  imageSourceTypes = ImageSourceType;

  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private uploadService: UploadFileService
  ) { 
    super();
  }

   //in ctor only
   // const navigation = this.router.getCurrentNavigation();
   // const recipe = navigation.extras.state as Recipe;

   ngOnInit() {

    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        this.recipeId = +params.get('recipeId');
        this.isEditMode = !!params.get('recipeId');
        this.initForm(this.isEditMode, this.recipeId);
      });
  }

  onSubmit(): void {
    const recipe = this.recipeForm.value;

    if (this.recipeForm.controls.imageSource.value === ImageSourceType.Url) {
      this.currentImageUpload = null;
    }

    this.processSubmitForm(recipe);
  }

  onCancel(): void {
    this.recipeService.emitEditingValue(this.recipeId, this.editedRecipeInitialValue);
    this.navigateBack();
  }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(this.createNameAmountFormGroup());
  }

  onDeleteIngredient(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files || [];
    if (files[0]) {
      const reader = new FileReader();
      const file = files[0];
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => { this.recipeForm.controls.imagePath.setValue(reader.result); };
      this.currentImageUpload = new FileUpload(file);
    }
  }

  private processSubmitForm(recipe: Recipe) {
    if (this.isEditMode) {
      this.recipeService.updateRecipe(this.recipeId, recipe, this.currentImageUpload)
        .subscribe(() => this.navigateBack());
    } else {
      this.recipeService.addRecipe(recipe, this.currentImageUpload)
        .subscribe(() => this.navigateBack());
    }
  }

  private watchFormChanges() {
    const descriptionChanges = this.recipeForm.controls.description.valueChanges;
    const nameChanges = this.recipeForm.controls.name.valueChanges;
  
    combineLatest(nameChanges.pipe(startWith(this.recipeForm.controls.name.value)),
                  descriptionChanges.pipe(startWith(this.recipeForm.controls.description.value)))
      .pipe(takeUntil(this.destroy$))
      .subscribe(([name, description]) => {
        const editedRecipe = new Recipe({name: name, description: description})
        this.recipeService.emitEditingValue(this.recipeId, editedRecipe);
      });
  }

  private navigateBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm(isEditMode: boolean, recipeId: number): void {
    let recipe = new Recipe();
    let ingredientsFormArray = new FormArray([]);

    if(isEditMode) {
      this.recipeService.getRecipe(recipeId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(currentRecipe => { 
          recipe = currentRecipe; 
          ingredientsFormArray = this.initIngredientForm(recipe);
          this.recipeForm = this.createRecipeForm(recipe, ingredientsFormArray);
          this.editedRecipeInitialValue = recipe;
          this.watchFormChanges();
        });
    } else {
      this.recipeForm = this.createRecipeForm(recipe, ingredientsFormArray)
    }
  }

  private initIngredientForm(recipe: Recipe,): FormArray {
    const ingredientFromGroups = recipe.ingredients
      .map(ingredient => this.createNameAmountFormGroup(ingredient.name, ingredient.amount));

    return new FormArray([...ingredientFromGroups]);
  }

  private createRecipeForm(recipe: Recipe, ingredients: FormArray): FormGroup {
    return new FormGroup({
      name: new FormControl(recipe.name, Validators.required),
      imageSource: new FormControl(ImageSourceType.Url, Validators.required),
      imagePath: new FormControl(recipe.imagePath, Validators.required),
      description: new FormControl(recipe.description, Validators.required),
      ingredients: ingredients
    });
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
