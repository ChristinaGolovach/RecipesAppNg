import { NgModule } from "@angular/core";
import { CropPipe } from './pipes/crop.pipe';
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
        CropPipe,
        DropdownDirective,
        LoadingSpinnerComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CropPipe,
        DropdownDirective,
        LoadingSpinnerComponent
    ]
})
export class SharedModule {

}