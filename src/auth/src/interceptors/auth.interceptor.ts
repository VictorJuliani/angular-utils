import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
// services
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
	constructor(private auth: AuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
	{
		const token = this.auth.getAuth();

		console.log(req);

		if (token && !req.headers.has('Authorization')) {
			const headers: { [key: string]: string } = {};

			if (token) {
				headers['Authorization'] = 'Bearer ' + token;
			}

			req = req.clone({ setHeaders: headers });
		}
		else if(req.headers.get("Authorization") == "AWS")
		{
			req.headers.delete("Authorization");
		}

		return next.handle(req);
	}
}
