import { Pipe, PipeTransform } from '@angular/core';
import { NFMItem } from '../../shared/models/item.model';
import { MiddlewareService } from '../../shared/services/middleware.service';

@Pipe({ name: 'url' })
export class UrlPipe implements PipeTransform {

	constructor(private api: MiddlewareService) {}

	transform(item: NFMItem): string {
		if (!item.path) {
			return '';
		}

		return this.api.downloadUrl(item);
	}
}
