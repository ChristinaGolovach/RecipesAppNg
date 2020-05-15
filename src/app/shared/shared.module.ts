import { NgModule } from "@angular/core";
import { SearchPipe } from './pipes/search.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './directives/dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        SearchPipe,
        DropdownDirective,
        LoadingSpinnerComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SearchPipe,
        DropdownDirective,
        LoadingSpinnerComponent
    ]
})
export class SharedModule {

}