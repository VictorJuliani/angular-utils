import { Component, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
// models
import { ModalComponent } from '../modal/modal.component';
import { NFMItem } from '../../../shared/models/item.model';
import { NavigatorContext } from '../../models/navigator.context';
// services
import { MiddlewareService } from '../../../shared/services/middleware.service';
import { itemExists, validFilename } from '../../util/util';

@Component({
	templateUrl: 'rename.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenameModalComponent
{
	@Input() context: NavigatorContext<NFMItem>;
	@ViewChild(ModalComponent) modal: ModalComponent;

	newName: string;

	get item() {
		return this.context.selection;
	}

	get canRename() {
		return this.newName
			&& !itemExists(this.newName, this.context.fileList)
			&& validFilename(this.newName);
	}

	constructor(private api: MiddlewareService) {}

	onModelChange() {
		if (itemExists(this.newName, this.context.fileList)) {
			this.modal.error('File already exists');
		} else if (!validFilename(this.newName)) {
			this.modal.error('File name must contain only letters, numbers, spaces or the characters \'-\' and \'.\'');
		} else {
			this.modal.error(undefined);
		}
	}

	rename() {
		const success = {
			message: 'Files renamed to {{name}}',
			params: { path: this.newName }
		};

		const task = this.api.rename(this.context.selection, this.newName)
			.subscribe(
				() => this.modal.close(success),
				e => this.modal.error('Could not rename file', true));

		this.modal.saveTask(task);
	}
}
