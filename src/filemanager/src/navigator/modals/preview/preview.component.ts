import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NFMItem } from '../../../shared/models/item.model';
import { NavigatorContext } from '../../models/navigator.context';

@Component({
	templateUrl: 'preview.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewModalComponent
{
	// TODO add placeholder
	@Input() context: NavigatorContext<NFMItem>;

	get item() {
		return this.context.selection;
	}
}
