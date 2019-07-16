import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'property'
})
export class PropertyPipe implements PipeTransform {
	transform<T>(values: T[], property: keyof T): string[] {
		if (!values) {
			return [];
		}

		return values
			.filter(v => v[property])
			.map(v => String(v[property]));
	}
}
