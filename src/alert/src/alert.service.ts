import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import swal, { SweetAlertOptions } from 'sweetalert2';
import * as toastr from 'toastr';

export type AlertType = 'error' | 'success' | 'info' | 'question' | 'warning';
export type Translation = string | { message: string, params?: Object };

@Injectable({ providedIn: 'root' })
export class AlertService
{
	readonly swal = swal;
	readonly toastr = toastr;

	constructor(private translate: TranslateService) {}

	/**********************************************************/
	/******************** Alert functions *********************/
	/**********************************************************/

	public alertInfo(title: Translation, message?: Translation): Promise<any>
	{
		return this.alert('info', title, message);
	}

	public alertSuccess(title: Translation, message?: Translation): Promise<any>
	{
		return this.alert('success', title, message);
	}

	public alertWarning(title: Translation, message?: Translation): Promise<any>
	{
		return this.alert('warning', title, message);
	}

	public alertError(title: Translation, message?: Translation): Promise<any>
	{
		return this.alert('error', title, message);
	}

	public alertQuestion(title: Translation, message?: Translation): Promise<any>
	{
		return this.alert('question', title, message);
	}

	public alertInput(title: Translation, message?: Translation): Promise<any>
	{
		return this.alert(null as any, title, message, {
			input: 'text',
			showCancelButton: true,
			confirmButtonText: this.translate.instant('Confirm'),
			allowOutsideClick: false
		});
	}

	public alert(type: AlertType, title: Translation, message?: Translation, options?: SweetAlertOptions): Promise<any>
	{
		const baseOptions: SweetAlertOptions & { useRejections: false } = {
			type,
			title: this.translation(title),
			text: this.translation(message),
			useRejections: false
		};

		if (options) {
			Object.assign(baseOptions, options);
		}

		return this.swal(baseOptions);
	}

	/**********************************************************/
	/******************** Toastr functions ********************/
	/**********************************************************/

	public toastrInfo(message: Translation, title?: Translation, options?: ToastrOptions): JQuery
	{
		return this.toast('info', message, title, options);
	}

	public toastrSuccess(message: Translation, title?: Translation, options?: ToastrOptions): JQuery
	{
		return this.toast('success', message, title, options);
	}

	public toastrWarning(message: Translation, title?: Translation, options?: ToastrOptions): JQuery
	{
		return this.toast('warning', message, title, options);
	}

	public toastrError(message: Translation, title?: Translation, options?: ToastrOptions): JQuery
	{
		return this.toast('error', message, title, options);
	}

	public toast(type: ToastrType, message: Translation, title?: Translation, options?: ToastrOptions): JQuery
	{
		return this.toastr[type](this.translation(message) as string, this.translation(title), options || {});
	}

	/**********************************************************/
	/******************** Shared functions ********************/
	/**********************************************************/

	translation(text: Translation | undefined): string
	{
		switch (typeof text) {
			case 'string':
				return this.translate.instant(text as string);
			case 'object':
				const value = text as { message: string, params?: Object };
				return this.translate.instant(value.message, value.params);
		}

		return undefined as any; // just a trick to skip type-checking
	}
}
