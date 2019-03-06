import { HttpParams } from '@angular/common/http';
import { StringFilter } from './filter.util';

export function redirect(url: string): void
{
	if (!url.includes('//')) {
		url = '//' + url;
	}

	window.location.href = url;
}

export function getDomainName() {
	const hostname = window.location.hostname;
	return hostname.substring(hostname.lastIndexOf('.', hostname.lastIndexOf('.') - 1) + 1);
}

/**
 * Set filter parameters to HttpParams
 *
 * @param filter the filter to use
 *
 * @returns the HttpParams object
 */
export function setFilterParams(params?: HttpParams, filter?: StringFilter)
{
	if (!params) {
		params = new HttpParams();
	}

	if (filter)  {
		Object.keys(filter).forEach(f => {
			if (typeof filter[f] === 'string') {
				params = params.set(f, filter[f] as string);
			} else if (Array.isArray(filter[f]) && filter[f].length) {
				(filter[f] as string[]).forEach(i => params = params.append(f + '[]', i));
			}
		});
	}

	return params;
}
