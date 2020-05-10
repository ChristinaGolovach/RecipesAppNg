import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { ShoppingListComponent } from './procurement/shopping-list/shopping-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
    {
        path: 'recipes',
        component: RecipeComponent,
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
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}