import { Component, OnChanges, Inject, Input, ViewChild, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  Select } from '@ngxs/store';
import * as fromStore from '../../../shared/store';
// models
import { NFMItem } from '../../../shared/models/item.model';
import { FileManagerConfig, NFMConfig, TemplateMode } from '../../../shared/models/config.model';
// services
import { MiddlewareService } from '../../../shared/services/middleware.service';
import { NavigatorService } from '../../../shared/services/navigator.service';
import { NFMUtil } from '../../../shared/util/util';
// modals
import { EditModalComponent } from '../../modals/edit/edit.component';
import { PreviewModalComponent } from '../../modals/preview/preview.component';
import { RemoveModalComponent } from '../../modals/remove/remove.component';
import { FileContextMenuComponent } from '../context-menu/context-menu.component';
import { NavigatorContext } from '../../models/navigator.context';
import { Observable } from 'rxjs';

@Component({
	selector: 'vb-file-navigator',
	templateUrl: 'navigator.component.html',
	styleUrls: ['navigator.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileNavigatorComponent implements OnChanges
{
	@Input() currentPath: string[];
	@Input() fileList: NFMItem[];
	@Input() refreshing: boolean;
	@Select(fromStore.NavigatorState.templateMode) mode$: Observable<TemplateMode>;
	@ViewChild(FileContextMenuComponent) menu: FileContextMenuComponent;

	selectedFiles: NFMItem[];
	context: NavigatorContext<NFMItem[]>;

	get showExtensions() {
		return this.config.showExtensionIcons;
	}

	get transparent() {
		return !this.config.background;
	}

	constructor(
		@Inject(NFMConfig) private config: FileManagerConfig,
		private modal: NgbModal,
		private api: MiddlewareService,
		private navigator: NavigatorService
	) {}

	ngOnChanges() {
		this.clearSelection();
		this.menu.close();
	}

	isSelected(item: NFMItem) {
		return this.selectedFiles.includes(item);
	}

	onFileClick(item: NFMItem | null, event: MouseEvent) {
		const leftClick = 'click' === event.type;
		const dblClick = 'dblclick' === event.type;
		const rightClick = 'contextmenu' === event.type;

		if (!item && (dblClick || (leftClick && this.config.deselectOnClick))) {
			this.clearSelection();
			return;
		}

		if (leftClick) {
			this.selectOrUnselect(item, event);
		} else if (dblClick) {
			this.smartClick(item);
		} else if (rightClick) {
			this.selectOrUnselect(item, event);
			this.showMenu(event);
		}
	}

	smartClick(item: NFMItem) {
		if (NFMUtil.isFolder(item)) {
			this.navigator.folderClick(item);
		}

		const pick = this.navigator.hasAnyRole(this.config.allowedActions.pickFiles);
		if (typeof this.config.pickCallback === 'function' && pick) {
			if (this.config.pickCallback(item)) {
				return;
			}
		}

		/*if (this.config.previewImagesInModal && this.navigator.isImage(item)) {
			this.preview(item);
		} else */
		if (this.navigator.hasAnyRole(this.config.allowedActions.edit) && this.navigator.isEditable(item)) {
			this.navigator.openModal(this.context, item, EditModalComponent);
		} else if (!NFMUtil.isFolder(item)) {
			this.api.download(item, true).subscribe();
		}
	}

	clearSelection() {
		this.selectedFiles = [];
	}

	pick(item: NFMItem) {
		this.config.pickCallback(item);
	}

	preview(item: NFMItem) {
		this.navigator.openModal(this.context, item, PreviewModalComponent);
	}

	download(item: NFMItem | NFMItem[], zip: boolean) {
		if (zip) {
			// this.api.downloadMultiple(item as NFMItem[], true).subscribe();
		} else {
			this.api.download(item as NFMItem, true).subscribe();
		}
	}

	@HostListener('document:keydown', ['$event'])
	onDelete(event: KeyboardEvent) {
		switch (event.key.toLowerCase()) {
			case 'delete': {
				if (!this.selectedFiles.length) {
					return;
				}

				this.navigator.openModal(this.context, this.selectedFiles, RemoveModalComponent);
				break;
			}
			case 'backspace': {
				if (this.modal.hasOpenModals() || !this.currentPath.length) {
					return;
				}

				this.navigator.upDir();
				event.preventDefault();
				break;
			}
		}
	}

	private selectOrUnselect(item: NFMItem, event: MouseEvent) {
		if (!item) {
			return;
		}

		// Button 0 = leftclick; Button 2 = rightclick
		if (2 === event.button && this.isSelected(item)) {
			return;
		}

		let selectedFiles = [ ...this.selectedFiles ];
		const length = this.selectedFiles.length;
		if (event.shiftKey && length) {
			// select files between range
			const indexInList = this.fileList.indexOf(item);
			const indexLastSelected = this.fileList.indexOf(this.selectedFiles[length - 1]);

			const start = Math.min(indexInList, indexLastSelected);
			const end = Math.max(indexInList, indexLastSelected);

			for (let i = start; i <= end; i++) {
				if (!this.isSelected(this.fileList[i])) {
					selectedFiles.push(this.fileList[i]);
				}
			}
		} else if (event.ctrlKey || event.metaKey) {
			if (this.isSelected(item)) {
				selectedFiles = selectedFiles.filter(f => f !== item);
			} else {
				selectedFiles.push(item);
			}
		} else {
			selectedFiles = this.isSelected(item) ? [] : [ item ];
		}

		this.selectedFiles = selectedFiles;
	}

	private showMenu(event: MouseEvent) {
		if (this.refreshing) {
			return;
		}

		this.context = {
			selection: this.selectedFiles,
			currentPath: this.currentPath,
			fileList: this.fileList,
			event: event
		} as NavigatorContext<NFMItem[]>;

		event.preventDefault();
		event.stopPropagation();
	}
}
