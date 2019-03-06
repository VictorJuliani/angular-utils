import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModuleConfig, TranslateService } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { PATHS, LANGUAGE_KEY } from './translate.config';

/**
 * Create and return an Http Loader for translations.
 *
 * @param http the injected http object
 *
 * @returns the loader
 */
export function HttpLoaderFactory(http: HttpClient, paths: string[])
{
	return new MultiTranslateHttpLoader(http, paths.map(p => ({ prefix: p, suffix: '.json' })));
}

/**
 * Build a Translate Factory to be used with forRoot().
 *
 * @return the factory
 */
export const translateFactory: TranslateModuleConfig = {
	loader: {
		provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [ HttpClient, PATHS ]
	}
};

export function translateConfig(service: TranslateService) {
	return () => new Promise(resolve => {
		const lang = localStorage.getItem(LANGUAGE_KEY)
					|| service.getBrowserLang()
					|| 'en';

		service.setDefaultLang('en');
		service.use(lang);
		resolve();
	});
}
