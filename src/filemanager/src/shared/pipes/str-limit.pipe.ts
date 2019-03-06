import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'strLimit' })
export class StrLimitPipe implements PipeTransform
{
	transform(value: string, limit: number, more: string = '...') {
		if (value.length <= limit) {
			return value;
		}
		return value.substr(0, limit) + more;
	}
}
