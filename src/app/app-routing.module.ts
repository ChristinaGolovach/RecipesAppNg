import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'

import { ShoppingListComponent } from './procurement/shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
    { path: 'recipes', loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule) },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'auth', component: AuthComponent },
    { path: '', pathMatch: 'full', redirectTo: '/recipes'}
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

//https://vsavkin.com/angular-router-preloading-modules-ba3c75e424cb