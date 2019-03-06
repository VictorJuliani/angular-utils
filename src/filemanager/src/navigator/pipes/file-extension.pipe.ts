import { Pipe, PipeTransform } from '@angular/core';
import { StrLimitPipe } from '../../shared/pipes/str-limit.pipe';

@Pipe({ name: 'fileExtension' })
export class FileExtensionPipe implements PipeTransform
{
	transform(value: string): string {
		const limit = new StrLimitPipe();
		const strLimit = limit.transform(value.split('.').pop() as string, 3, '..');
		return /\./.test(value) && strLimit || '';
	}
}
