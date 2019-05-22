import { NgModule, APP_INITIALIZER } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export function translateSetup(translate: TranslateService): Function {
	translate.setDefaultLang('en');
	translate.use('en');

	return () => Promise.resolve();
}

@NgModule({
	imports: [ TranslateModule ],
	exports: [ TranslateModule ],
	providers: [
		{ provide: APP_INITIALIZER, useFactory: translateSetup, deps: [ TranslateService ], multi: true },
	]
})
export class TranslateTestingModule { }
