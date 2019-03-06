import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[formErrorContainer]'
})
export class FormErrorContainerDirective {
	constructor(public vcr: ViewContainerRef) {}
}
