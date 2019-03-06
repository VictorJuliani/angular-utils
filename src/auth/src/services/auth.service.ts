import { Injectable, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
// models
import { redirect } from '@vonbraunlabs/common';
import { AuthConfig, AUTH_CONFIG } from '../models/config.interface';

@Injectable({ providedIn: 'root' })
export class AuthService
{
	constructor(
		@Inject(AUTH_CONFIG) public config: AuthConfig,
		private cookies: CookieService
	) {}

	/**
	 * Set auth cookie with given token.
	 *
	 * @param token the user auth token
	 */
	public setAuth(value: string, domain: string, secure?: boolean, expiration?: Date): void
	{
		this.cookies.set(this.config.authCookie, value, expiration, '/', domain, secure);
	}

	/**
	 * Get the access cookie from cookies.
	 *
	 * @returns the access cookie
	 */
	public getAuth(): string
	{
		return this.cookies.get(this.config.authCookie);
	}

	/**
	 * Check if user has auth cookie.
	 *
	 * @returns whether the cookie is present or not
	 */
	public isAuthed(): boolean
	{
		return this.cookies.check(this.config.authCookie);
	}

	/**
	 * Check if we should logout on auth error.
	 *
	 * @returns whether to logout on auth error or not.
	 */
	public logoutOnError(): boolean
	{
		return this.config.logoutOnError;
	}

	/**
	 * Clear interface access code and user auth cookie.
	 */
	public logout(domain: string, goTo?: string, next?: string): void
	{
		const authDomain = this.stripProtocol(domain);
		this.cookies.delete(this.config.authCookie, '/', authDomain);

		if (goTo) {
			if (next) {
				goTo += '?next=' + encodeURI(next);
			}

			redirect(goTo);
		}
	}

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
	public stripProtocol(url: string): string
	{
		return url.replace(/(^\w+:|^)\/\//, '');
	}
}