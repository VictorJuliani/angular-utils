import { HttpHeaders } from '@angular/common/http';

export const ALLOW_UNAUTHORIZED = 'ALLOW_UNAUTHORIZED';

/**
 * Remove the protocol from url.
 *
 * @example
 *  http://bla.com -> bla.com
 *  //bla.com -> bla.com
 *  bla.com -> bla.com
 *
 * @param url the url to strip
 *
 * @returns the url with no protocol
 */
export function stripProtocol(url: string): string
{
	return url.replace(/(^\w+:|^)\/\//, '');
}

export function allowUnathorized(headers?: HttpHeaders): { headers: HttpHeaders }
{
	return { headers: headers || new HttpHeaders().append(ALLOW_UNAUTHORIZED, 'true') };
}
