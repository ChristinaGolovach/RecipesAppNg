import { Directive, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';

@Directive({
    selector: '[appDirective]'
})
export class DropdownDirective {
    private readonly className: string = 'open';
    private isOpened: boolean = false;

    @HostListener('click') onClick(): void {
        const element = this.elementRef.nativeElement;
        this.isOpened 
            ? this.renderer.removeClass(element, this.className) 
            : this.renderer.addClass(element, this.className);
        
        this.isOpened = !this.isOpened;        
    }

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {}
}
