import { NgModule } from "@angular/core";


import { SharedModule } from '../shared/shared.module';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';

@NgModule({
    imports: [
        SharedModule,
        ShoppingRoutingModule,
    ],
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
})
export class ShoppingModule {}