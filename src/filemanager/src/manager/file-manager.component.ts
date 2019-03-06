import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
// store
import { Select } from '@ngxs/store';
import * as fromStore from '../shared/store';
// models
import { NFMConfig, FileManagerConfig } from '../shared/models/config.model';
import { NFMHistory } from '../shared/models/history.model';
import { NavigatorService } from '../shared/services/navigator.service';
import { NFMItem } from '../shared/models/item.model';

@Component({
	selector: 'vb-file-manager',
	styleUrls: [ 'file-manager.component.scss' ],
	templateUrl: 'file-manager.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileManagerComponent implements OnInit
{
	@Select(fromStore.NavigatorState.history) history$: Observable<NFMHistory[]>;
	@Select(fromStore.NavigatorState.refreshing) refreshing$: Observable<boolean>;
	@Select(fromStore.NavigatorState.fileList) fileList$: Observable<NFMItem[]>;
	@Select(fromStore.PathState.currentPath) currentPath$: Observable<string[]>;

	get hasSidebar() {
		return this.config.sidebar;
	}

	constructor(
		@Inject(NFMConfig) private config: FileManagerConfig,
		private navigator: NavigatorService) {}

	ngOnInit() {
		this.navigator.refresh();
	}
}
