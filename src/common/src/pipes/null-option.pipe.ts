import { Pipe, PipeTransform } from '@angular/core';
import { Option } from '../models/option.interface';
import { NullOption } from '../models/null-option.interface';

@Pipe({
	name: 'nullOption'
})
export class NullOptionPipe implements PipeTransform
{
	transform(value: Option[], append: boolean = true): Option[]
	{
		return append ? [ NullOption, ...value ] : value;
	}

}
