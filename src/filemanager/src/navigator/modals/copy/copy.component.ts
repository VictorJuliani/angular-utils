import { Component, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
// models
import { ModalComponent } from '../modal/modal.component';
import { NFMItem } from '../../../shared/models/item.model';
// services
import { MiddlewareService } from '../../../shared/services/middleware.service';
import { itemExists } from '../../util/util';
import { NavigatorContext } from '../../models/navigator.context';

@Component({
	templateUrl: 'copy.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyModalComponent
{
	@Input() context: NavigatorContext<NFMItem[]>;
	@ViewChild(ModalComponent, { static: true }) modal: ModalComponent;

	newPath: string[];
	newName: string;

	get items() {
		return this.context.selection;
	}

	constructor(private api: MiddlewareService) {}

	onModelChange() {
		if (itemExists(this.newName, this.context.fileList)) {
			this.modal.error('File already exists');
		} else {
			this.modal.error(undefined);
		}
	}

	onPathSelected(path: string[]) {
		this.newPath = path;
	}

	copy() {
		if (!this.newPath) {
			this.newPath = this.context.currentPath;
		}

		const success = {
			message: 'Files successfully copied to {{path}}',
			params: { path: this.newPath.join('/') }
		};

		const task = this.api.copy(this.context.selection, this.newPath, this.newName)
			.subscribe(
				() => this.modal.close(success),
				e => this.modal.error('Could not copy files to the selected directory', true));

		this.modal.saveTask(task);
	}
}
