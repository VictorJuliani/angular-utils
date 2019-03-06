import { Component, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
// models
import { ModalComponent } from '../modal/modal.component';
import { NFMItem } from '../../../shared/models/item.model';
import { NavigatorContext } from '../../models/navigator.context';
// services
import { MiddlewareService } from '../../../shared/services/middleware.service';

@Component({
	templateUrl: 'remove.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoveModalComponent
{
	@Input() context: NavigatorContext<NFMItem[]>;
	@ViewChild(ModalComponent) modal: ModalComponent;

	get items() {
		return this.context.selection;
	}

	constructor(private api: MiddlewareService) {}

	remove() {
		const task = this.api.remove(this.context.selection)
			.subscribe(
				() => this.modal.close('Files successfully removed'),
				e => this.modal.error('Could not remove files', true));

		this.modal.saveTask(task);
	}
}
