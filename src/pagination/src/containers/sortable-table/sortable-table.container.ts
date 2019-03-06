import { Component, Input, ChangeDetectionStrategy, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faLongArrowAltDown, faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
// models
import { ListContainer } from '../list-container/list-container.container';
import { Sort, SortDirection } from '../../models/sort.model';
import { Pagination } from '../../models/pagination.interface';
import { TableHeader } from '../../models/header.model';

@Component({
	selector: 'vb-sortable-table',
	templateUrl: 'sortable-table.container.html',
	styleUrls: [ 'sortable-table.container.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortableTableContainer
{
	@Input() loader: (pagination: Pagination, sort: Sort) => Observable<any>;
	@Input() headers: TableHeader[];
	@Input() body: TemplateRef<any>;
	@Input() pageSize: number;
	@Input() canUpdateSize = true;
	@Input() small = true;
	@Input() bordered = false;
	@Input() loadingMessage = 'Loading...';

	@ViewChild(ListContainer) list: ListContainer<any>;

	sort: Sort;
	sortIcon: IconDefinition = faLongArrowAltUp;
	sortLoader = (pagination: Pagination) => this.loader(pagination, this.sort);

	sortHeader(header: TableHeader) {
		if (!header.sortable) {
			return;
		}

		const direction = this.sort && this.sort.key === header.id
			? (this.sort.direction + 1) % 3
			: SortDirection.ASC;

		this.sort = {
			key: header.id,
			direction: direction
		};

		if (SortDirection.NONE === this.sort.direction) {
			delete this.sort;
		}

		this.updateIcon();
		this.reset();
	}

	public reset() {
		this.list.pagination.reset();
	}

	private updateIcon() {
		if (this.sort && SortDirection.ASC === this.sort.direction) {
			this.sortIcon = faLongArrowAltUp;
		} else {
			this.sortIcon = faLongArrowAltDown;
		}
	}
}
