import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RequestError } from '../models/request-error.interface';

@Pipe({name: 'error'})
export class ErrorPipe implements PipeTransform {
	constructor(private translate: TranslateService) {}

	transform(value: RequestError | string): string {
		if ('string' === typeof value) {
			return this.translate.instant(value);
		} else if (!value) {
			return undefined;
		}

		if (!isNaN(value.code)) {
			const code = value.code.toString();
			const translation = this.translate.instant(code);
			return translation !== code ? translation : value.message;
		}

		return value.message || value as any;
	}
}
