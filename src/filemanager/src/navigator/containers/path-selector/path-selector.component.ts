import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// modals
import { SelectorModalComponent } from '../../modals/selector/selector.component';
import { NFMItem } from '../../../shared/models/item.model';
import { NavigatorContext } from '../../models/navigator.context';
// services
import { NFMUtil } from '../../../shared/util/util';
import { NavigatorService } from '../../../shared/services/navigator.service';

@Component({
	selector: 'vb-path-selector',
	templateUrl: 'path-selector.component.html',
	styleUrls: [ 'path-selector.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PathSelectorComponent implements OnInit
{
	@Input() context: NavigatorContext<NFMItem[]>;
	@Output() selected = new EventEmitter<string[]>();

	selectedPath$ = new BehaviorSubject([]);

	get isSingleItem() {
		return 1 === this.context.selection.length;
	}

	get items() {
		return this.context.selection;
	}

	constructor(private navigator: NavigatorService) {}

	ngOnInit() {
		this.selectedPath$.next(this.context.currentPath);
		this.selected.emit(this.context.currentPath);
	}

	showNavigator() {
		const modal = this.navigator.openModal(this.context, this.context.selection, SelectorModalComponent);
		modal.result.then(path => {
			if (path) {
				this.selectedPath$.next(path);
				this.selected.emit(path);
			}
		});
	}

	getSelectedPath(path: string[]) {
		let result = '/' + path.join('/');
		if (this.isSingleItem && !NFMUtil.isFolder(this.items[0])) {
			result += '/' + this.items[0].name;
		}

		return result.replace(/\/\//, '/');
	}
}
