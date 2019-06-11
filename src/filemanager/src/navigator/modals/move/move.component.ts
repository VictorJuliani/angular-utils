import { Component, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
// models
import { ModalComponent } from '../modal/modal.component';
import { NFMItem } from '../../../shared/models/item.model';
import { NavigatorContext } from '../../models/navigator.context';
// services
import { MiddlewareService } from '../../../shared/services/middleware.service';
import { isSamePath } from '../../util/util';

@Component({
	templateUrl: 'move.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoveModalComponent
{
	@Input() context: NavigatorContext<NFMItem[]>;
	@ViewChild(ModalComponent, { static: true }) modal: ModalComponent;

	newPath: string[];

	constructor(private api: MiddlewareService) {}

	onPathSelected(path: string[]) {
		this.newPath = path;
	}

	move() {
		if (isSamePath(this.context.currentPath, this.newPath || this.context.currentPath)) {
			this.modal.close(false, true);
			return;
		}

		const success = {
			message: 'Files successfully moved to {{path}}',
			params: { path: this.newPath.join('/') }
		};

		const task = this.api.move(this.context.selection, this.newPath)
			.subscribe(
				() => this.modal.close(success, true),
				e => this.modal.error('Could not move files to the selected directory', true));

		this.modal.saveTask(task);
	}
}
