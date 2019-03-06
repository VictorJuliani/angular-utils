import { NgModule, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { translateFactory, translateConfig } from './translate.factory';
import { PATHS } from './translate.config';

@NgModule({
	imports: [
		TranslateModule.forRoot(translateFactory),
	],
	exports: [
		TranslateModule
	],
	providers: [
		{ provide: APP_INITIALIZER, multi: true, useFactory: translateConfig, deps: [ TranslateService, PATHS ] }
	]
})
export class VbTranslateModule {
	static forRoot(paths: string[]): ModuleWithProviders {
		return {
			ngModule: VbTranslateModule,
			providers: [
				{ provide: PATHS, useValue: paths }
			]
		};
	}
}
