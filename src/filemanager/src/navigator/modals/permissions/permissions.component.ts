import { Component, Input, ChangeDetectionStrategy, ViewChild, Inject, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
// store
import { Store } from '@ngxs/store';
import { appStore } from '@vonbraunlabs/app-state';
// models
import { ModalComponent } from '../modal/modal.component';
import { NFMConfig, FileManagerConfig } from '../../../shared/models/config.model';
import { NavigatorContext } from '../../models/navigator.context';
import { NFMItem } from '../../../shared/models/item.model';
// services
import { MiddlewareService } from '../../../shared/services/middleware.service';
import { itemsHave } from '../../util/util';

@Component({
	templateUrl: 'permissions.component.html',
	styleUrls: [ 'permissions.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionsModalComponent implements OnInit
{
	@Input() context: NavigatorContext<NFMItem[]>;
	@ViewChild(ModalComponent) modal: ModalComponent;

	roles: string[];
	newRoles: string[];
	unauthorizedRoles: string[];
	parentRoles: string[];
	recursive: boolean;

	get items() {
		return this.context.selection;
	}

	get allowRecursive() {
		return this.config.enablePermissionsRecursive && itemsHave(this.items, 'dir');
	}

	constructor(
		@Inject(NFMConfig) private config: FileManagerConfig,
		private store: Store,
		private api: MiddlewareService
	) {}

	ngOnInit() {
		this.unauthorizedRoles = [];

		if (1 === this.items.length) {
			this.newRoles = [ ...this.items[0].roles ];
			this.parentRoles = [ ...this.items[0].parentRoles ];
		} else {
			this.newRoles = this.flatSharedRoles('roles');
			this.parentRoles = this.flatSharedRoles('parentRoles');
		}

		this.roles = this.store.selectSnapshot(appStore.UserState.roles).map(r => r.name);
		this.unauthorizedRoles = this.roles.filter(r => !this.newRoles.includes(r) && !this.parentRoles.includes(r));
	}

	moveRole(event: CdkDragDrop<string[]>) {
		transferArrayItem(
			event.previousContainer.data, event.container.data,
			event.previousIndex, event.currentIndex
		);
	}

	permissions() {
		const task = this.api.changePermissions(this.items, this.newRoles, this.recursive)
			.subscribe(
				() => this.modal.close('Files permissions updated'),
				e => this.modal.error('Could not update files permissions', true));

		this.modal.saveTask(task);
	}

	private flatSharedRoles(type: 'roles' | 'parentRoles') {
		const flatRoles = this.items
			.map(i => i[type])
			.reduce((roles, next) => roles.concat(next.filter(r => !roles.includes(r))), []);

		// filter only roles present in all items
		return flatRoles
			.filter(k => this.items.every(i => i[type].includes(k)));
	}
}
