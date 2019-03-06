import { Pipe, PipeTransform } from '@angular/core';
import { NFMItem } from '../../shared/models/item.model';
import { NFMUtil } from '../../shared/util/util';

@Pipe({ name: 'fullPath' })
export class FullPathPipe implements PipeTransform {
	transform(item: NFMItem): string {
		return NFMUtil.fullPath(item);
	}
}
