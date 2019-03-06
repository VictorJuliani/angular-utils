import { Component, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
// models
import { ModalComponent } from '../modal/modal.component';
import { NFMItem } from '../../../shared/models/item.model';
import { NavigatorContext } from '../../models/navigator.context';
// services
import { MiddlewareService } from '../../../shared/services/middleware.service';
import { itemExists, validFilename } from '../../util/util';

@Component({
	templateUrl: 'compress.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompressModalComponent
{
	@Input() context: NavigatorContext<NFMItem[]>;
	@ViewChild(ModalComponent) modal: ModalComponent;

	newName: string;

	get items() {
		return this.context.selection;
	}

	get canCompress() {
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

	compress() {
		this.newName = this.newName.trim();
		const task = this.api.compress(this.context.selection, this.newName, this.context.currentPath)
			.subscribe(
				() => this.modal.close('Files successfully compressed'),
				e => this.modal.error('Could not compress requested files', true));

		this.modal.saveTask(task);
	}
}
