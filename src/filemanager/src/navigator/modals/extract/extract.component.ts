import { Component, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
// models
import { ModalComponent } from '../modal/modal.component';
import { NavigatorContext } from '../../models/navigator.context';
import { NFMItem } from '../../../shared/models/item.model';
// services
import { MiddlewareService } from '../../../shared/services/middleware.service';
import { itemExists, validFilename } from '../../util/util';

@Component({
	templateUrl: 'extract.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtractModalComponent
{
	@Input() context: NavigatorContext<NFMItem>;
	@ViewChild(ModalComponent) modal: ModalComponent;

	newName: string;

	get item() {
		return this.context.selection;
	}

	get canExtract() {
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

	extract() {
		this.newName = this.newName.trim();
		const task = this.api.extract(this.context.selection, this.newName, this.context.currentPath)
			.subscribe(
				() => this.modal.close('Files successfully extracted'),
				e => this.modal.error('Could not extract requested files', true));

		this.modal.saveTask(task);
	}
}
