import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
// models
import { LANGUAGE_KEY } from '@vonbraunlabs/translate';
import * as fromStore from '../../store';
import { Flag, EN_LANG } from '../../models/flag.model';

@Component({
	selector: 'vb-flags',
	templateUrl: 'flags.component.html',
	styleUrls: [ 'flags.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlagsComponent {
	@Input() flags: Flag[];
	@Input() showSelectedFlag: boolean;

	get currentLang() {
		return localStorage.getItem(LANGUAGE_KEY) || EN_LANG.lang;
	}

	constructor(
		private translate: TranslateService,
		private store: Store
	) {}

	onClick(flag: Flag) {
		localStorage.setItem(LANGUAGE_KEY, flag.lang);
		this.store.dispatch(new fromStore.SetLang(flag.lang));
		this.translate.use(flag.lang);
	}

	isSelected(flag: Flag) {
		return this.currentLang === flag.lang;
	}
}
