import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { ShoppingListComponent } from './procurement/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './procurement/shopping-list/shopping-edit/shopping-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth/services/auth-interceptor.service';
import { RecipeModule } from './recipe/recipe.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RecipeModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
