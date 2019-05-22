import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
// services
import { AuthService } from '../services/auth.service';
import { AuthConfig, AUTH_CONFIG } from '../models/config.interface';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
	constructor(
		@Inject(AUTH_CONFIG) public config: AuthConfig,
		private auth: AuthService
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
	{
		const token = this.auth.getAuth();

		if (token && !req.headers.has('Authorization')) {
			const headers: { [key: string]: string } = {};

			if (token) {
				headers['Authorization'] = `${this.config.authorization || 'Bearer'} ${token}`;
			}

			req = req.clone({ setHeaders: headers });
		} else if (req.headers.get('Authorization') === 'AWS') {
			req.headers.delete('Authorization');
		}

		return next.handle(req);
	}
}
