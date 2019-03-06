import { Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Pipe({
	name: 'enumTitleCase'
})
export class EnumTitleCasePipe extends TitleCasePipe implements PipeTransform
{
	transform(value: string): string
	{
		// replace _ with an empty space and title case the result
		return super.transform(value.replace(/_/g, ' '));
	}
}
