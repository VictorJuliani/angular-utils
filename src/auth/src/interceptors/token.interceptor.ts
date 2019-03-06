import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// models
import { RequestError } from '@vonbraunlabs/app-state';
import { AUTH_CONFIG, AuthConfig } from '../models/config.interface';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor
{
	constructor(
		@Inject(AUTH_CONFIG) private config: AuthConfig,
		private auth: AuthService
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
	{
		if (!this.config.logoutOnError) {
			return next.handle(req);
		}

		return next.handle(req)
			.pipe(
				catchError((err: RequestError) => {
					if (err.status === 401) {
						this.auth.logout(this.config.cookieDomain(), this.config.redirectUrl, window.location.href);
					}

					return throwError(err);
				})
			);
	}
}
