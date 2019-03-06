import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Observable } from 'rxjs';
// store
import { Store, Select } from '@ngxs/store';
import * as fromStore from '../../../shared/store';
// models
import { NFMConfig, FileManagerConfig, TemplateMode } from '../../../shared/models/config.model';
import { NavigatorService } from '../../../shared/services/navigator.service';

@Component({
	selector: 'vb-navbar',
	templateUrl: 'navbar.component.html',
	styleUrls: [ 'navbar.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent
{
	@Select(fromStore.PathState.currentPath) currentPath$: Observable<string[]>;
	@Select(fromStore.NavigatorState.templateMode) mode$: Observable<TemplateMode>;

	get showBreadcrumb() {
		return this.config.breadcrumb;
	}

	get showSearch() {
		return this.config.searchForm;
	}

	get transparent() {
		return !this.config.background;
	}

	constructor(
		@Inject(NFMConfig) private config: FileManagerConfig,
		private store: Store,
		private nagivator: NavigatorService
	) {}

	upDir() {
		this.nagivator.upDir();
	}

	setTemplateMode(mode: TemplateMode) {
		this.store.dispatch(new fromStore.SetTemplateMode(mode));
	}

	onSearch(query: string) {
		// TODO: implement me
		console.log(query);
	}
}
