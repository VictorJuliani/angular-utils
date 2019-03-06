import { Pipe, PipeTransform } from '@angular/core';
import { LowerCasePipe } from '@angular/common';

@Pipe({
	name: 'enumLowerCase'
})
export class EnumLowerCasePipe extends LowerCasePipe implements PipeTransform
{
	transform(value: string, ...args: any[]): string
	{
		// replace _ with an empty string or space and lower case the result
		return super.transform(value.replace(/_/g, !args[0] ? ' ' : ''));
	}

}
