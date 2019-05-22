import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, Inject } from '@angular/core';
// models
import { NFMItem } from '../../../shared/models/item.model';
import { NFMUtil } from '../../../shared/util/util';
import { NFMConfig, FileManagerConfig, TemplateMode } from '../../../shared/models/config.model';

@Component({
	selector: 'vb-file',
	templateUrl: 'file.component.html',
	styleUrls: [ 'file.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent
{
	@Input() item: NFMItem;
	@Input() selected: boolean;
	@Input() showExtension: boolean;
	@Input() transparent: boolean;
	@Input() mode: TemplateMode;
	@Output() fileClick = new EventEmitter<MouseEvent>();

	get useImg() {
		return 'string' === typeof this.itemIcon;
	}

	get itemIcon() {
		return NFMUtil.isFolder(this.item) ? this.config.icons.folder : this.config.icons.file;
	}

	get tableView() {
		return 'table' === this.mode;
	}

	get hasExtension() {
		return this.showExtension && !NFMUtil.isFolder(this.item);
	}

	constructor(@Inject(NFMConfig) private config: FileManagerConfig) {}

	click(event: MouseEvent) {
		event.stopPropagation();
		this.fileClick.emit(event);
	}
}
