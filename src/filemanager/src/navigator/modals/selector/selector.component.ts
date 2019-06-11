import { Component, ViewChild, Input, OnInit, Inject } from '@angular/core';
import { MiddlewareService } from '../../../shared/services/middleware.service';
// models
import { ModalComponent } from '../modal/modal.component';
import { NFMItem } from '../../../shared/models/item.model';
import { NavigatorContext } from '../../models/navigator.context';
import { NFMConfig, FileManagerConfig } from '../../../shared/models/config.model';

@Component({
	templateUrl: 'selector.component.html'
})
export class SelectorModalComponent implements OnInit
{
	@Input() context: NavigatorContext<NFMItem[]>;
	@ViewChild(ModalComponent, { static: true }) modal: ModalComponent;

	currentPath: string[];
	loading: boolean;

	get transparent() {
		return !this.config.background;
	}

	constructor(
		@Inject(NFMConfig) private config: FileManagerConfig,
		private api: MiddlewareService
	) {}

	ngOnInit() {
		this.currentPath = this.context.currentPath;
	}

	onPathChanged(path: string[]) {
		this.currentPath = path;
		this.loading = true;

		this.api.list(this.currentPath, true)
			.subscribe(
				folders => {
					this.loading = false;
					this.context = {
						selection: this.context.selection,
						currentPath: this.currentPath,
						fileList: folders
					};
				},
				() => this.loading = false
			);
	}

	selectCurrent() {
		this.modal.close(false, this.currentPath);
	}
}
