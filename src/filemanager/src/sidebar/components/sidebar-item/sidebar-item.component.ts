import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
// font awesome
import { faChevronDown, faChevronRight, faFolderOpen, faFolder } from '@fortawesome/free-solid-svg-icons';
// models
import { NFMItem } from '../../../shared/models/item.model';
import { NFMUtil } from '../../../shared/util/util';
import { NFMHistory } from '../../../shared/models/history.model';
import { NavigatorService } from '../../../shared/services/navigator.service';

@Component({
	selector: 'vb-sidebar-item',
	templateUrl: 'sidebar-item.component.html',
	styleUrls: [ './sidebar-item.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarItemComponent
{
	@Input() file: NFMHistory;
	@Input() basePath = '/';
	@Input() currentPath = '/';

	get chevron() {
		return this.isInThisPath ? faChevronDown : faChevronRight;
	}

	get folder() {
		return this.isInThisPath ? faFolderOpen : faFolder;
	}

	get isInThisPath() {
		return this.file.item && this.currentPath.indexOf(this.file.item.name + '/') !== -1;
	}

	get fileName() {
		return (this.file.name.split('/').pop() || this.basePath || '/');
	}

	constructor(private navigator: NavigatorService) {}

	isActive(file: NFMHistory) {
		return NFMUtil.isActive(this.currentPath, file);
	}

	itemClick() {
		this.navigator.folderClick(this.file.item as NFMItem);
	}
}
