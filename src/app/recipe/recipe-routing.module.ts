import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { AuthGuard } from '../auth/services/auth-guard.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from '../procurement/shopping-list/shopping-list.component';
import { AuthComponent } from '../auth/auth.component';

const routes: Routes = [
    {
        path: 'recipes',
        component: RecipeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', pathMatch: 'full', component: RecipeStartComponent },
            { path: 'new' , component: RecipeEditComponent },
            { path: ':recipeId', component: RecipeDetailComponent },
            { path: ':recipeId/edit', component: RecipeEditComponent }
        ]
    },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'auth', component: AuthComponent },
    { path: '', pathMatch: 'full', redirectTo: '/recipes'}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule {}