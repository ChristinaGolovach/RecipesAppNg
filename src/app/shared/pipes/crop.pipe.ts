import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'crop'
})
export class CropPipe implements PipeTransform {

    transform(value: any, maxLength: number): any {
        if (value.length > maxLength) {
            const croppedValue = value.substr(0, maxLength) + '...';
            // croppedValue = croppedValue.substr(0, Math.min(croppedValue.length, croppedValue.lastIndexOf(" ")));
            return croppedValue;
        }

        return value;
    }
}