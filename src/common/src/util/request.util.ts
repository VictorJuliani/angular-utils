import { HttpParams } from '@angular/common/http';
import { Router, NavigationExtras, UrlTree } from '@angular/router';
import { StringFilter } from './filter.util';

export function navigate(route: string[] | UrlTree, newTab: boolean, router: Router, extras?: NavigationExtras) {
	if (newTab) {
		const path = (route instanceof UrlTree ? route : router.createUrlTree(route, extras)).toString();
		const url = window.location.origin + (path.startsWith('/') ? '' : '/') + path;
		redirect(url, true);
	} else {
		if (Array.isArray(route)) {
			router.navigate(route, extras);
		} else {
			router.navigateByUrl(route, extras);
		}
	}
}
export function redirect(url: string, newTab: boolean)
{
	if (!url.includes('//')) {
		url = '//' + url;
	}

	if (newTab) {
		window.open(url, '_blank');
	} else {
		window.location.href = url;
	}
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
