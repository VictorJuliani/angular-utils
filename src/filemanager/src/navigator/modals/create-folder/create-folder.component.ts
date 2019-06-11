import { Component, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
// models
import { ModalComponent } from '../modal/modal.component';
import { NavigatorContext } from '../../models/navigator.context';
// services
import { MiddlewareService } from '../../../shared/services/middleware.service';
import { itemExists, validFilename } from '../../util/util';

@Component({
	templateUrl: 'create-folder.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateFolderModalComponent
{
	@Input() context: NavigatorContext<void>;
	@ViewChild(ModalComponent, { static: true }) modal: ModalComponent;

	newName: string;

	get canCreate() {
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

	create() {
		const success = {
			message: 'Folder {{name}} created',
			params: { name: this.newName }
		};

		const task = this.api.createFolder(this.newName, this.context.currentPath)
			.subscribe(
				() => this.modal.close(success),
				e => this.modal.error('Could not create the new folder', true));

		this.modal.saveTask(task);
	}
}
