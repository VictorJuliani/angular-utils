import { Directive, Self, OnInit, OnDestroy, Optional, Host,
		ViewContainerRef, ComponentRef, ComponentFactoryResolver, Input
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription, Observable, EMPTY, merge } from 'rxjs';
import { DEFAULT_ERRORS } from '../models/default-errors.interface';
import { FormSubmitDirective } from './form-submit.directive';
import { FormErrorComponent } from '../components/form-error/form-error.component';
import { FormErrorContainerDirective } from './form-error-container.directive';

@Directive({
	selector: '[formControl], [formControlName]',
})
export class FormErrorDirective implements OnInit, OnDestroy {
	@Input() errorMessages: { [key: string]: (...p) => string };

	ref: ComponentRef<FormErrorComponent>;
	container: ViewContainerRef;
	valueChanges$$: Subscription;
	submit$: Observable<Event>;

	constructor(
		@Self() private controlDir: NgControl,
		@Optional() @Host() private form: FormSubmitDirective,
		@Optional() private formErrorContainer: FormErrorContainerDirective,
		private resolver: ComponentFactoryResolver,
		private vcr: ViewContainerRef
	) {}

	get control() {
		return this.controlDir.control;
	}

	ngOnInit() {
		if (!this.errorMessages) {
			this.errorMessages = {};
		}

		this.container = this.formErrorContainer ? this.formErrorContainer.vcr : this.vcr;
		this.submit$ = this.form ? this.form.submit$ : EMPTY;

		this.valueChanges$$ = merge(this.submit$, this.control.valueChanges)
			.subscribe(() => {
				const controlErrors = this.control.errors;

				if (controlErrors) {
					const firstKey = Object.keys(controlErrors)[0];
					const error = this.getError(firstKey);
					const text = error(controlErrors[firstKey]);

					this.setError(text);
				} else if (this.ref) {
					this.setError(null);
				}
			});
	}

	ngOnDestroy() {
		if (this.valueChanges$$) {
			this.valueChanges$$.unsubscribe();
		}
	}

	private setError(text: string) {
		if (!this.ref) {
			const factory = this.resolver.resolveComponentFactory(FormErrorComponent);
			this.ref = this.container.createComponent(factory);
		}

		this.ref.instance.error = text;
	}

	private getError(key: string) {
		const genericError = () => 'This field is required or incorrect';

		return this.errorMessages[key]
			|| (this.form ? this.form.errorMessages[key] : undefined)
			|| DEFAULT_ERRORS[key]
			|| genericError;
	}
}
