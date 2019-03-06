import { Component, Input, Output, EventEmitter, TemplateRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { Pagination, PaginatedResponse } from '../../models/pagination.interface';
import { PageUpdate } from '../../models/page-update.interface';

@Component({
	selector: 'vb-list-container',
	templateUrl: 'list-container.container.html',
	styleUrls: [ 'list-container.container.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListContainer<T>
{
	@Input() loader: ((pagination: Pagination) => Observable<PaginatedResponse<T[]>>);
	@Input() template: TemplateRef<any>;
	// default inputs
	@Input() pageSize: number;
	@Input() canUpdateSize = true;
	@Input() loadingSpinner = true;
	@Input() loadingMessage = 'Loading...';
	@Input() notFoundMessage = 'No items found';
	@Input() notFoundIsolated = true;

	@Output() pageChanged = new EventEmitter<PageUpdate<T>>();
	@ViewChild(PaginationComponent) pagination: PaginationComponent<T>;

	loading: boolean;

	get pageItems() {
		return this.pagination.pageItems;
	}

	get hasItems() {
		return this.pagination.hasItems;
	}

	get size() {
		return this.pagination.totalItems;
	}

	get showPagination() {
		return this.hasItems
			|| (this.pagination && this.size > this.pagination.pageSize)
			|| (this.pagination && this.pageSize !== this.pagination.pageSize);
	}

	onPageLoading(page: number) {
		this.loading = true;
	}

	onPageChanged(update: PageUpdate<T>) {
		this.loading = false;
		this.pageChanged.emit(update);
	}
}
