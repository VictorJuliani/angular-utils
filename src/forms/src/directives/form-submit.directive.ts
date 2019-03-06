import { Directive, OnInit, Input, ElementRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Directive({
	selector: 'form'
})
export class FormSubmitDirective implements OnInit
{
	@Input() errorMessages: { [key: string]: (...p) => string };
	submit$: Observable<Event>;

	get element() {
		return this.host.nativeElement;
	}

	constructor(private host: ElementRef<HTMLFormElement>) {}

	ngOnInit() {
		if (!this.errorMessages) {
			this.errorMessages = {};
		}

		this.submit$ = fromEvent(this.element, 'submit')
			.pipe(shareReplay(1));
	}
}
