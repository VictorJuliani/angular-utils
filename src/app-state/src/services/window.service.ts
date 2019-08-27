import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Store } from '@ngxs/store';
import * as fromStore from '../store/';

@Injectable({
	providedIn: 'root'
})
export class WindowService {

	constructor(private store: Store) {
		fromEvent(window, 'resize')
			.subscribe(() => this.store.dispatch(new fromStore.SetSize(window.innerWidth)));
	}
}
