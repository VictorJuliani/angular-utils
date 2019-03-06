import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Captcha } from '../models/captcha.interface';

@Injectable()
export class FormsService
{
	constructor(private http: HttpClient) {}

	/**
	 * Request a new Captcha pair.
	 *
	 * @see Captcha
	 *
	 * @returns the Captcha
	 */
	public generateCaptcha(captchaUrl: string, headers?: HttpHeaders): Observable<Captcha>
	{
		return this.http.get<Captcha>(captchaUrl, { headers });
	}
}
