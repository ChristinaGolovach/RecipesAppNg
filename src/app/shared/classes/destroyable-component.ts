import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class DestroyableComponent implements OnDestroy {
    protected destroy$ = new Subject<void>();
    
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

// https://ncjamieson.com/avoiding-takeuntil-leaks/
// https://tyapk.ru/blog/post/angular-when-unsubsribe-rxjs
// https://netbasal.com/when-to-unsubscribe-in-angular-d61c6b21bad3
