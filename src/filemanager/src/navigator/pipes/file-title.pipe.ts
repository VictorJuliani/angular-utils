import { Pipe, PipeTransform } from '@angular/core';
import { FileSizePipe } from './file-size.pipe';
import { NFMItem } from '../../shared/models/item.model';

@Pipe({ name: 'fileTitle' })
export class FileTitlePipe extends FileSizePipe implements PipeTransform {
	transform(value: any): string {
		const item = value as NFMItem;
		if ('dir' === item.type) {
			return item.name;
		}

		return `${item.name} (${super.transform(item.size)})`;
	}
}
