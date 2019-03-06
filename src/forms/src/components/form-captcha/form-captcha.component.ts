import { Component, AfterViewInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
// models
import { Captcha } from '../../models/captcha.interface';
import { FormsService } from '../../services/forms.service';

@Component({
	selector: 'vb-form-captcha',
	templateUrl: 'form-captcha.component.html',
	styleUrls: [ 'form-captcha.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormCaptchaComponent implements AfterViewInit
{
	@Input() group: FormGroup;
	@Input() captchaUrl: string;
	@Input() name = 'captcha';
	@Input() label = 'Captcha';

	captcha$ = new BehaviorSubject<Captcha| undefined>(undefined);
	error: string;

	constructor(private service: FormsService) {}

	ngAfterViewInit()
	{
		this.reload();
	}

	public reload(): void
	{
		this.service.generateCaptcha(this.captchaUrl)
			.subscribe(
				(c: Captcha) => this.captcha$.next(c),
				(err) => {
					this.error = err.message || err;
					this.group.controls[this.name].markAsTouched();
				}
			);
	}

	public getCaptchaKey(): string
	{
		const captcha = this.captcha$.value;
		return captcha ? captcha.key : '';
	}

	public getUserInput(): string
	{
		return this.group.controls[this.name].value;
	}
}
