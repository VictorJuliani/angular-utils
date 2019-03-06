import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { NFMItem } from '../../../shared/models/item.model';

@Component({
	selector: 'vb-selected-files',
	templateUrl: 'selected-files.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedFilesComponent {
	@Input() items: NFMItem[];
	showDetails: boolean;

	get isSingleItem() {
		return 1 === this.items.length;
	}

	get item() {
		return this.items[0];
	}
}
