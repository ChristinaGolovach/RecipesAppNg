import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'

const routes: Routes = [
    { path: 'shopping-list', loadChildren: () => import('./procurement/shopping.module').then(m => m.ShoppingModule) },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: '', pathMatch: 'full', redirectTo: '/recipes'}
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

//https://vsavkin.com/angular-router-preloading-modules-ba3c75e424cb