import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
	selector: '[vbLoading]'
})
export class LoadingDirective implements OnChanges
{
	@Input('vbLoading') relativePosition: boolean;

	constructor(private location: ElementRef) {}

	ngOnChanges()
	{
		if (this.relativePosition) {
			this.location.nativeElement.classList.add('position-relative');
		} else {
			this.location.nativeElement.classList.remove('position-relative');
		}
	}
}
