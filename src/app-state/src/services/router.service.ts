import { Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { ClearErrors } from '../store';

@Injectable({ providedIn: 'root' })
export class RouterCleanerService implements OnDestroy {
	destroy$ = new Subject<boolean>();

	constructor(
		private router: Router,
		private store: Store
	) {
		this.init();
	}

	init() {
		this.router.events
			.pipe(
				filter(e => e instanceof NavigationStart),
				takeUntil(this.destroy$)
			)
			.subscribe(() => this.store.dispatch(new ClearErrors()));
	}

	ngOnDestroy() {
		this.destroy$.next(true);
	}
}
