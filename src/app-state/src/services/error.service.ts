import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// store
import { Store } from '@ngxs/store';
import * as fromStore from '../store';
// models
import { RequestError, ServerError, ErrorDetail, KeyError } from '../models/request-error.interface';

@Injectable({ providedIn: 'root' })
export class ErrorService
{
	constructor(private store: Store) {}

	public wrapError<T>(request: Observable<T>, selector?: string) {
		if (selector) {
			this.store.dispatch(new fromStore.ClearError(selector));
		}

		return request
			.pipe(
				catchError(error => {
					const parsed = ErrorService.parseError(error);
					parsed.stored = true;
					this.store.dispatch(new fromStore.SetError(parsed, selector));

					return throwError(parsed);
				})
			);
	}

	/**
	 * Parse the error response.
	 *
	 * @param err the response
	 *
	 * @returns an observable with the RequestError
	 */
	public static parseError(err: HttpErrorResponse): RequestError
	{
		console.error(err);
		let serverError: ServerError = err.error || {};
		if (typeof err.error === 'string') {
			try {
				serverError = JSON.parse(err.error);
			} catch (e) {
				serverError = {} as any;
			}
		}

		const error: RequestError = {
			code: 0,
			raw: err,
			message: serverError.message || err.message || err.toString(),
			status: err.status,
			identifiers: [],
			keys: []
		};

		if (serverError.code) {
			error.code = serverError.code;
		}

		if (serverError.identifiers) {
			error.identifiers = this.parseIdentifiers(serverError.identifiers.filter(i => typeof i === 'string') as string[]);
			error.keys = serverError.identifiers.filter(i => typeof i === 'object') as KeyError[];
		}

		return error;
	}

	/**
	 * Parsed identifiers and it's index or subproperties.
	 *
	 * @example [ 'manufacturer', 'date' ]
	 *
	 * @param identifiers the identifiers to parse
	 *
	 * @returns the parsed identifiers
	 */
	public static parseIdentifiers(identifiers: string[]): ErrorDetail[]
	{
		const parsed: ErrorDetail[] = [];
		for (const identifier of identifiers) {
			const detail = this.parseIdentifier(identifier);

			if (detail) {
				parsed.push(detail);
			}
		}

		return parsed;
	}

	private static parseIdentifier(identifier: string): ErrorDetail | undefined
	{
		// group 1: variable name
		// group 2: (sub properties)
		const regex = /^(\w+)((?:\.\w+)*)$/;
		const match = identifier.match(regex);

		return match ?
			{
				variable: match[1],
				properties: match[2] ? match[2].split('.').slice(1) : undefined
			}
			: undefined;
	}
}
