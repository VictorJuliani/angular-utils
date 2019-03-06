import { Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { ClearErrors } from '../store';

@Injectable({ providedIn: 'root' })
export class RouterCleanerService implements OnDestroy {
	routerListener$$: Subscription;

	constructor(
		private router: Router,
		private store: Store
	) {
		this.init();
	}

	init() {
		this.routerListener$$ = this.router.events
			.pipe(filter(e => e instanceof NavigationStart))
			.subscribe(() => this.store.dispatch(new ClearErrors()));
	}

	ngOnDestroy() {
		if (this.routerListener$$) {
			this.routerListener$$.unsubscribe();
		}
	}
}
