import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import * as fromStore from '../../store';
import { RequestError } from '../../models/request-error.interface';

@Component({
	selector: 'vb-error',
	templateUrl: 'error.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent implements OnInit
{
	@Input() selectors: string | string[] | 'root' = 'root';
	@Input() error: string;
	@Input() type = 'danger';

	errors$: Observable<(RequestError | string | undefined)[]>;

	constructor(private store: Store) {}

	ngOnInit() {
		if (this.selectors) {
			this.errors$ = this.store.select(fromStore.ErrorState.errors)
				.pipe(map(filterFn => filterFn(this.selectors)));
		}
	}
}
