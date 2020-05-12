import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(values: any, filterValue: string, propName: string): any {
        if (values.length === 0 || filterValue === '') {
            return values;
        }

        return [...values].filter(value => value[propName].includes(filterValue));
    }
}