import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
	templateUrl: 'form-error.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormErrorComponent
{
	@Input() set error(value: string | null) {
		if (value !== this.message) {
			this.message = value;
			this.cdr.detectChanges();
		}
	}

	message: string;

	constructor(private cdr: ChangeDetectorRef) {}
}
