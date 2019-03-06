import { Component, ChangeDetectionStrategy, Input, Inject } from '@angular/core';
import { NavigatorService } from '../../../shared/services/navigator.service';
import { NFMConfig, FileManagerConfig } from '../../../shared/models/config.model';

@Component({
	selector: 'vb-breadcrumb',
	templateUrl: 'breadcrumb.component.html',
	styleUrls: ['breadcrumb.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent
{
	@Input() currentPath: string[];
	@Input() navigable = true;

	get transparent() {
		return !this.config.background;
	}

	get useSeparators() {
		return !this.config.breadcrumb || this.config.breadcrumb.separator;
	}

	get rootLabel() {
		const label = this.config.breadcrumb ? this.config.breadcrumb.rootLabel : '/';
		return label.endsWith('/') ? label : label + '/';
	}

	constructor(
		@Inject(NFMConfig) private config: FileManagerConfig,
		private navigator: NavigatorService
	) {}

	goTo(key: number) {
		if (!this.navigable) {
			return;
		}

		this.navigator.goTo(key);
	}

	goBack() {
		if (this.navigable && this.currentPath.length) {
			this.navigator.upDir();
		}
	}
}
