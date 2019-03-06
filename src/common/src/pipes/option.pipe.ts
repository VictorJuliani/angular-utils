import { Pipe, PipeTransform } from '@angular/core';
import { Option } from '../models/option.interface';

@Pipe({
	name: 'options'
})
export class OptionPipe implements PipeTransform
{
	transform(value: any[], property = 'vbuid', sort = true): Option[]
	{
		const options = value.map(i => {
			return {
				value: i[property],
				label: i.name
			};
		});

		if (sort) {
			options.sort((v1, v2) => (v1.label).localeCompare((v2.label)));
		}

		return options;
	}

}
