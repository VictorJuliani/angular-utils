export class LangUtil {
	/**
   	* Returns the language code name from the browser, e.g. "de"
   	*/
	public static getBrowserLang(): string | undefined {
		if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
			return undefined;
		}

		let browserLang: any = window.navigator.languages ? window.navigator.languages[0] : null;
		browserLang = browserLang || window.navigator.language || window.navigator['browserLanguage'] || window.navigator['userLanguage'];

		if (browserLang.indexOf('-') !== -1) {
		browserLang = browserLang.split('-')[0];
		}

		if (browserLang.indexOf('_') !== -1) {
		browserLang = browserLang.split('_')[0];
		}

		return browserLang;
	}

	/**
   	* Returns the culture language code name from the browser, e.g. "de-DE"
   	*/
	public static getBrowserCultureLang(): string | undefined {
		if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
			return undefined;
		}

		let browserCultureLang: any = window.navigator.languages ? window.navigator.languages[0] : null;
		browserCultureLang = browserCultureLang || window.navigator.language
							|| window.navigator['browserLanguage'] || window.navigator['userLanguage'];

		return browserCultureLang;
	}
}
