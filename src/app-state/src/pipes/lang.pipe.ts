import { Pipe, PipeTransform } from '@angular/core';
import { Flag } from '../models/flag.model';

@Pipe({
	name: 'lang'
})
export class LangPipe implements PipeTransform {
	transform(flags: Flag[], lang: string): Flag[] {
		return flags.filter(flag => flag.lang !== lang);
	}
}
