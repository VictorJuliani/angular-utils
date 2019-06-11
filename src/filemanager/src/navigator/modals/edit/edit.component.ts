import { Component, Input, ChangeDetectionStrategy, ViewChild, OnInit } from '@angular/core';
// models
import { ModalComponent } from '../modal/modal.component';
import { NFMItem } from '../../../shared/models/item.model';
// services
import { MiddlewareService } from '../../../shared/services/middleware.service';
import { NavigatorContext } from '../../models/navigator.context';

@Component({
	templateUrl: 'edit.component.html',
	styleUrls: [ 'edit.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditModalComponent implements OnInit
{
	@Input() context: NavigatorContext<NFMItem>;
	@ViewChild(ModalComponent, { static: true }) modal: ModalComponent;

	newContent: string;

	get item() {
		return this.context.selection;
	}

	get canEdit() {
		return this.newContent;
	}

	constructor(private api: MiddlewareService) {}

	ngOnInit() {
		this.newContent = this.context.selection.content as string;
		if (!this.newContent) {
			this.api.getContent(this.context.selection)
				.subscribe();
		}
	}

	edit() {
		const task = this.api.edit(this.context.selection, this.newContent)
			.subscribe(
				() => this.modal.close('File edit successfully saved'),
				e => this.modal.error('Could not save file updates', true));

		this.modal.saveTask(task);
	}
}
