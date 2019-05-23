import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngxs/store';
// services
import { ErrorService } from './error.service';
import { SetError } from '../store';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor
{
	constructor(private store: Store) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any>
	{
		return next.handle(req)
			.pipe(
				catchError(error => {
					if (error instanceof HttpErrorResponse) {
						error = ErrorService.parseError(error);
						this.store.dispatch(new SetError(error));
					}

					return throwError(error);
				}));
	}
}
