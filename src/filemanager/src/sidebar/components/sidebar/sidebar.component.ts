import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
// store
import { Select } from '@ngxs/store';
import * as fromStore from '../../../shared/store';
// models
import { NFMHistory } from '../../../shared/models/history.model';
import { NFMUtil } from '../../../shared/util/util';
import { NavigatorService } from '../../../shared/services/navigator.service';

@Component({
	selector: 'vb-sidebar',
	templateUrl: 'sidebar.component.html',
	styleUrls: [ 'sidebar.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent
{
	@Select(fromStore.NavigatorState.history) history$: Observable<NFMHistory[]>;
	@Select(fromStore.PathState.stringPath) currentPath$: Observable<string>;

	get basePath() {
		return this.navigator.getBasePath().join('/');
	}

	constructor(private navigator: NavigatorService) {}

	isActive(currentPath: string, file: NFMHistory) {
		return NFMUtil.isActive(currentPath, file);
	}
}
