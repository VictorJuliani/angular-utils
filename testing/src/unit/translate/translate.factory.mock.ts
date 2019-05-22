import { Observable, of } from 'rxjs';
import { TranslateModuleConfig, TranslateLoader } from '@ngx-translate/core';

export const NOOP = () => {};

export function TranslateTestingFactory(translations: object): TranslateModuleConfig {
	class FakeLoader implements TranslateLoader {
		getTranslation(lang: string): Observable<any> {
			return of(translations);
		}
	}

	return { loader: { provide: TranslateLoader, useClass: FakeLoader } };
}
