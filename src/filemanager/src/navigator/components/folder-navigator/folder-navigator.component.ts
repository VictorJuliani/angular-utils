import { Component, OnChanges, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { faLongArrowAltUp, faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons';
// models
import { NFMItem } from '../../../shared/models/item.model';
import { NavigatorContext } from '../../models/navigator.context';
// services
import { NFMUtil } from '../../../shared/util/util';

@Component({
	selector: 'vb-folder-navigator',
	templateUrl: 'folder-navigator.component.html',
	styleUrls: [ 'folder-navigator.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FolderNavigatorComponent implements OnChanges {
	@Input() context: NavigatorContext<NFMItem[]>;
	@Input() loading: boolean;
	@Output() pathChanged = new EventEmitter<string[]>();

	fileList$ = new BehaviorSubject<NFMItem[]>([]);
	currentPath: string[];
	reverse: boolean;

	get sortIcon() {
		return this.reverse
			? faLongArrowAltUp
			: faLongArrowAltDown;
	}

	ngOnChanges() {
		this.currentPath = this.context.currentPath;
		this.fileList$.next(this.filterAndSortFiles(this.context.fileList));
	}

	upDir() {
		this.currentPath = this.currentPath.slice(0, -1);
		this.pathChanged.emit(this.currentPath);
	}

	folderClick(item: NFMItem) {
		this.currentPath = NFMUtil.fullPath(item).split('/').splice(1);
		this.pathChanged.emit(this.currentPath);
	}

	sort() {
		this.reverse = !this.reverse;
		this.fileList$.next(this.filterAndSortFiles(this.fileList$.value));
	}

	private selectedFilesAreChildOfPath(item: NFMItem) {
		const path = NFMUtil.fullPath(item);
		return this.context.selection.find(i => path === NFMUtil.fullPath(i));
	}

	private filterAndSortFiles(files: NFMItem[]) {
		const filter = files
			.filter(NFMUtil.isFolder)
			.filter(i => !this.selectedFilesAreChildOfPath(i));

		return NFMUtil.sort(filter, 'name', this.reverse);
	}
}
