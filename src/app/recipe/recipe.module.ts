import { NgModule } from "@angular/core";

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeComponent } from './recipe.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';

@NgModule({
    imports: [
        RecipeRoutingModule,
        SharedModule,
    ],
    declarations: [
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeEditComponent,
        RecipeStartComponent,
        RecipeComponent,
    ],
})
export class RecipeModule {}