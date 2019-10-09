import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// models
import { RequestError } from '@vonbraunlabs/app-state';
import { AUTH_CONFIG, AuthConfig } from '../models/config.interface';
import { AuthService } from '../services/auth.service';
import { ALLOW_UNAUTHORIZED } from '../util/auth.util';

@Injectable()
export class TokenInterceptor implements HttpInterceptor
{
	constructor(
		@Inject(AUTH_CONFIG) private config: AuthConfig,
		private auth: AuthService
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
	{
		const allowUnauthorized = req.headers.has(ALLOW_UNAUTHORIZED);
		if (allowUnauthorized) {
			req = req.clone({ headers: req.headers.delete(ALLOW_UNAUTHORIZED) });
		}

		// if no bypass is set, logout users upon 401
		if (this.config.logoutOnError && !allowUnauthorized) {
			return next.handle(req)
				.pipe(
					catchError((err: RequestError | HttpErrorResponse) => {
						if (401 === err.status) {
							this.auth.logout(this.config.cookieDomain(), this.config.redirectUrl(), this.config.nextOnError ? window.location.href : null);
						}

						return throwError(err);
					})
				);
		}

		return next.handle(req);
	}
}
