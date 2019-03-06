import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpTestingController } from '@angular/common/http/testing';
// models
import { RequestError } from '@vonbraunlabs/common';
import { ErrorService } from '@vonbraunlabs/app-state';

export class MockError extends HttpErrorResponse implements Error {

	constructor(error: RequestError);
	constructor(error: string, status: number);
	constructor(error: any, status?: number) {
		if (typeof error === 'string') {
			super({ error, status });
		} else {
			super({ error, status: error.status });
		}
	}
}

export function paginationHeader(totalCount: number): HttpHeaders {
	const headers = new HttpHeaders();
	return headers.set('X-TOTAL-COUNT', totalCount.toString());
}

export function errorResponse(error: RequestError): MockError;
export function errorResponse(error: string, status: number): MockError;
export function errorResponse(error: any, status?: number): MockError {
	return new MockError(error, status || error.status);
}

export function observableThrow(error: RequestError): Observable<RequestError> {
	return throwError(error);
}

export function getAttributes(el: DebugElement): NamedNodeMap {
	return (el.nativeElement.attributes as NamedNodeMap);
}

export function getAttribute(el: DebugElement, name: string): string {
	return getAttributes(el).getNamedItem(name)!.value;
}

export function hasClass(el: DebugElement, clazz: string): boolean {
	return el.nativeElement.classList.contains(clazz);
}

export function testCatch(
		endpoint: string,
		error: ErrorService,
		controller: HttpTestingController,
		target: () => Observable<any>,
		dispatch?: boolean) {
	spyOn(error, 'handleError').and.callThrough();

	target().subscribe(
		() => fail('Should throw an error'),
		err => {
			if (typeof dispatch === 'boolean') {
				expect(error.handleError).toHaveBeenCalledWith(err.raw, dispatch);
			} else {
				expect(error.handleError).toHaveBeenCalledWith(err.raw);
			}
		});

	const req = controller.expectOne(r => r.url.includes(endpoint));
	req.flush(errorResponse({ code: 5000, message: 'catch', status: 400 }), { status: 400, statusText: '400' });

	controller.verify();
}

export function unsort <T>(items: T[], key: keyof T): T[] {
	return [ ...items ].sort((a, b) => (b[key] as any).localeCompare(a[key]));
}

export function sort <T>(items: T[], key: keyof T): T[] {
	return [ ...items ].sort((a, b) => (a[key] as any).localeCompare(b[key]));
}
