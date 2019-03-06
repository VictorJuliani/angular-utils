import { Component, OnChanges, Input, Inject, ViewChild, EventEmitter, Output,
		ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu';
// font-awesome
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
	faFolderOpen, faHandPointUp, faCloudDownloadAlt, faArchive, faImage, faEdit, faArrowRight,
	faCopy, faFileSignature, faLock, faLayerGroup, faFileExport, faTrash, faPlus, faCloudUploadAlt
} from '@fortawesome/free-solid-svg-icons';
// modals
import { CreateFolderModalComponent } from '../../modals/create-folder/create-folder.component';
import { CompressModalComponent } from '../../modals/compress/compress.component';
import { CopyModalComponent } from '../../modals/copy/copy.component';
import { EditModalComponent } from '../../modals/edit/edit.component';
import { ExtractModalComponent } from '../../modals/extract/extract.component';
import { MoveModalComponent } from '../../modals/move/move.component';
import { PermissionsModalComponent } from '../../modals/permissions/permissions.component';
import { RemoveModalComponent } from '../../modals/remove/remove.component';
import { RenameModalComponent } from '../../modals/rename/rename.component';
import { UploadModalComponent } from '../../modals/upload/upload-folder.component';
// models
import { NFMItem } from '../../../shared/models/item.model';
import { NFMRole } from '../../../shared/models/role.model';
import { NFMConfig, FileManagerConfig } from '../../../shared/models/config.model';
import { NavigatorContext } from '../../models/navigator.context';
// services
import { NavigatorService } from '../../../shared/services/navigator.service';
import { itemsHave } from '../../util/util';
import { NFMUtil } from '../../../shared/util/util';

export interface MenuItem {
	title: string | 'divider';
	icon: IconDefinition;
	roles: NFMRole;
	visible: () => boolean;
	action: () => any;
}

const DIVIDER: MenuItem = { title: '', icon: faFolderOpen, divider: true } as any as MenuItem;

@Component({
	selector: 'vb-context-menu',
	templateUrl: 'context-menu.component.html',
	styleUrls: [ 'context-menu.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileContextMenuComponent implements OnChanges
{
	@Input() context: NavigatorContext<NFMItem[]>;
	@Output() clear = new EventEmitter<void>();
	@Output() open = new EventEmitter<NFMItem>();
	@Output() select = new EventEmitter<NFMItem>();
	@Output() download = new EventEmitter<NFMItem>();
	@Output() downloadZip = new EventEmitter<NFMItem[]>();
	@Output() preview = new EventEmitter<NFMItem>();

	@ViewChild(ContextMenuComponent) contextMenu: ContextMenuComponent;

	readonly createMenu: MenuItem[] = [
		{
			title: 'Create Folder',
			icon: faPlus,
			roles: this.config.allowedActions.createFolder,
			visible: () => true,
			action: () => this.showModal(this.selection, CreateFolderModalComponent)
		},
		{
			title: 'Upload',
			icon: faCloudUploadAlt,
			roles: this.config.allowedActions.upload,
			visible: () => true,
			action: () => this.showModal(this.selection, UploadModalComponent, 'lg')
		}
	];

	readonly readMenu: MenuItem[] = [
		{
			title: 'Open',
			icon: faFolderOpen,
			roles: [],
			visible: () => this.isSingleItem && NFMUtil.isFolder(this.item),
			action: () => this.open.emit(this.item)
		},
		{
			title: 'Select',
			icon: faHandPointUp,
			roles: [],
			visible: () => !!this.config.pickCallback && this.isSingleItem && this.navigator.isSelectable(this.item),
			action: () => this.select.emit(this.item)
		},
		{
			title: 'Download',
			icon: faCloudDownloadAlt,
			roles: this.config.allowedActions.download,
			visible: () => this.isSingleItem && !this.hasAnyDir,
			action: () => this.download.emit(this.item)
		},
		{
			title: 'Download as Zip',
			icon: faArchive,
			roles: this.config.allowedActions.downloadMultiple,
			visible: () => !this.isSingleItem && !this.hasAnyDir,
			action: () =>  this.downloadZip.emit(this.selection)
		},
		{
			title: 'Preview',
			icon: faImage,
			roles: this.config.allowedActions.preview,
			visible: () => this.isSingleItem && this.navigator.isImage(this.item),
			action: () => this.preview.emit(this.item)
		}
	];

	readonly actionMenu: MenuItem[] = [
		{
			title: 'Rename',
			icon: faFileSignature,
			roles: this.config.allowedActions.rename,
			visible: () => this.isSingleItem,
			action: () => this.showModal(this.item, RenameModalComponent)
		},
		{
			title: 'Move',
			icon: faArrowRight,
			roles: this.config.allowedActions.move,
			visible: () => true,
			action: () => this.showModal(this.selection, MoveModalComponent)
		},
		{
			title: 'Copy',
			icon: faCopy,
			roles: this.config.allowedActions.copy,
			visible: () => !this.hasAnyDir,
			action: () => this.showModal(this.selection, CopyModalComponent)
		},
		{
			title: 'Edit',
			icon: faEdit,
			roles: this.config.allowedActions.edit,
			visible: () => this.isSingleItem && this.navigator.isEditable(this.item),
			action: () => this.showModal(this.item, EditModalComponent)
		},
		{
			title: 'Permissions',
			icon: faLock,
			roles: this.config.allowedActions.changePermissions,
			visible: () => true,
			action: () => this.showModal(this.selection, PermissionsModalComponent)
		},
		{
			title: 'Compress',
			icon: faLayerGroup,
			roles: this.config.allowedActions.compress,
			visible: () => !this.isSingleItem || this.hasAnyDir,
			action: () => this.showModal(this.selection, CompressModalComponent)
		},
		{
			title: 'Extract',
			icon: faFileExport,
			roles: this.config.allowedActions.extract,
			visible: () => this.isSingleItem && this.navigator.isExtractable(this.item),
			action: () => this.showModal(this.item, ExtractModalComponent)
		},
		{
			title: 'Remove',
			icon: faTrash,
			roles: this.config.allowedActions.remove,
			visible: () => true,
			action: () => this.showModal(this.selection, RemoveModalComponent, 'sm')
		}
	];

	menu: MenuItem[];

	get isSingleItem() {
		return this.selection && 1 === this.selection.length;
	}

	get selection() {
		return this.context.selection;
	}

	get item() {
		return this.selection[0];
	}

	get hasAnyDir() {
		return this.selection && itemsHave(this.selection, 'dir');
	}

	constructor(
		@Inject(NFMConfig) private config: FileManagerConfig,
		private navigator: NavigatorService,
		private contextMenuService: ContextMenuService,
		private cdr: ChangeDetectorRef
	) {}

	ngOnChanges() {
		if (!this.context) {
			return;
		}

		this.menu = this.build();
		this.cdr.detectChanges();

		if (this.menu.length) {
			this.contextMenuService.show.next({
				contextMenu: this.contextMenu,
				event: this.context['event'],
				item: null
			});
		}
	}

	close() {
		this.contextMenuService.closeAllContextMenus({ eventType: 'cancel' });
	}

	private build() {
		if (!this.selection || !this.selection.length) {
			return this.filterMenu(this.createMenu);
		}

		const read = this.filterMenu(this.readMenu);
		const action = this.filterMenu(this.actionMenu);

		if (read.length && action.length) {
			read.push(DIVIDER);
		}
		return [ ...read, ...action ];
	}

	private filterMenu(menu: MenuItem[]) {
		return menu.filter(m => this.navigator.hasAnyRole(m.roles) && m.visible());
	}

	private showModal<T extends (NFMItem | NFMItem[])>(selection: T, component: any, size: 'sm' | 'lg' | null = null) {
		const modal = this.navigator.openModal(this.context, selection, component, size);

		modal.result.then((clear: boolean) => {
			if (clear) {
				this.clear.emit();
			}
		});
	}
}
