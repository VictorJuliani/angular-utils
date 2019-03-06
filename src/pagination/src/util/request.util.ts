import { HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of, pipe, UnaryFunction } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Pagination, PaginatedResponse } from '../models/pagination.interface';
import { Sort, SortDirection } from '../models/sort.model';

export type Page<T> = Observable<PaginatedResponse<T>>;

export interface HttpRequestOptions
{
	headers?: HttpHeaders;
	observe: 'response';
	params?: HttpParams;
	reportProgress?: boolean;
	responseType?: 'json';
	withCredentials?: boolean;
}

export function emptyResponse<T>(): Observable<PaginatedResponse<T[]>>
{
	return of({ totalLength: 0, body: [] });
}

/**
 * Create an RequestOptionsArgs with pagination and filter parameter and pagination header.
 *
 * @param pagination the pagination parameters
 * @param sort the sort to use
 *
 * @returns the RequestOptionArgs object
 */
export function pageAndSortArgs(pagination: Pagination, sort: Sort): HttpRequestOptions
{
	const observe = 'response';
	let headers = new HttpHeaders();
	let params = new HttpParams();

	if (pagination) {
		params = params.set('page', pagination.page.toString());
		params = params.set('pageSize', pagination.pageSize.toString());

		if (pagination.requestTotal) {
			headers = new HttpHeaders().set('X-REQUEST-TOTAL-COUNT', 'true');
		}
	}

	if (sort && SortDirection.NONE !== sort.direction) {
		params = params.set('sort', sort.key);
		params = params.set('order', SortDirection[sort.direction]);
	}

	return { headers, params, observe };
}

export function paginateResponse<T>(emptyOnError: boolean = true)
{
	const parse = map((res: HttpResponse<T[]>) => {
		return {
			totalLength: handleTotalCount(res),
			body: res.body || []
		} as PaginatedResponse<T[]>;
	});

	if (emptyOnError) {
		return pipe(parse, catchError(() => emptyResponse() as Observable<PaginatedResponse<T[]>>));
	}

	return pipe(parse);
}

/**
 * Parse the pagination total count header.
 *
 * @param res the response
 *
 * @returns the total count
 */
export function handleTotalCount(res: HttpResponse<any>): number | null
{
	if (res.headers && res.headers.has('X-TOTAL-COUNT')) {
		return parseInt(res.headers.get('X-TOTAL-COUNT') || '', 10);
	}

	return null;
}
