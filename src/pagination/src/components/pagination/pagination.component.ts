import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination, PaginatedResponse } from '../../models/pagination.interface';
import { PageUpdate } from '../../models/page-update.interface';
import { DEFAULT_PAGE_SIZE } from '../../models/config.model';

@Component({
	selector: 'vb-pagination',
	templateUrl: 'pagination.component.html',
	styleUrls: [ 'pagination.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent<T> implements OnInit {
	@Input() loader: ((pagination: Pagination) => Observable<PaginatedResponse<T[]>>);
	@Input() pageSize: number;
	@Input() canUpdateSize = true;

	@Output() pageLoading = new EventEmitter<number>();
	@Output() pageChanged = new EventEmitter<PageUpdate<T>>();

	page = 0;
	pages: T[][] = []; // page cache
	totalItems = 0;

	get pageItems() {
		return this.pages[this.page - 1];
	}

	get hasItems() {
		return this.totalItems > 0;
	}

	get paginationInfo() {
		return {
			i: this.page,
			total: this.pages ? this.pages.length : 0
		};
	}

	constructor(private changeDetector: ChangeDetectorRef) {}

	ngOnInit() {
		if (!this.pageSize) {
			this.pageSize = DEFAULT_PAGE_SIZE;
		}

		this.reset(false);
	}

	changePage(page: number) {
		this.page = page;

		if (this.pages[page - 1]) {
			this.publishPage(page, false);
		} else {
			this.pageLoading.emit(page);
			this.loader(this.pagination(page))
				.subscribe(res => {
					if (null !== res.totalLength && res.totalLength !== this.totalItems) {
						this.totalItems = res.totalLength;
						this.reset(false); // set new pages array with totalItems
					}

					this.pages[page - 1] = res.body;
					this.publishPage(page, true);
				});
		}
	}

	reset(changePage = true) {
		if (!this.pageSize) {
			return;
		}

		const count = this.totalItems || 0;
		this.pages = new Array(Math.ceil((count + 1) / this.pageSize));

		if (changePage) {
			this.totalItems = 0;
			this.changePage(1);
		}
	}

	changeSize() {
		if (!this.pageSize) {
			this.pageSize = 1;
		}

		this.reset(false);
		this.changePage(this.page);
	}

	/**
	 * Update subject and trigger EventEmitter.
	 *
	 * @param page the page index (from 1) to publish
	 * @param changed whether the page was changed or not
	 */
	private publishPage(page: number, changed: boolean): void
	{
		this.changeDetector.markForCheck();
		this.pageChanged.emit({
			page,
			items: this.pageItems,
			changed
		});
	}

	/**
	 * Create a Pagination object to request a new page.
	 *
	 * @param page the page number (from 1)
	 *
	 * @returns the pagination object
	 */
	private pagination(page: number): Pagination
	{
		return {
			page,
			pageSize: this.pageSize,
			requestTotal: !this.hasItems
		};
	}
}
