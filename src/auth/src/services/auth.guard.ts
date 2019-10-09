import { Injectable, Inject } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { AUTH_CONFIG, AuthConfig } from '../models/config.interface';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild
{
	constructor(@Inject(AUTH_CONFIG) private config: AuthConfig, private auth: AuthService) {}

	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
	{
		if (!this.auth.isAuthed()) {
			this.auth.logout(this.config.cookieDomain(), this.config.redirectUrl(), window.location.href);
			return false;
		}

		return true;
	}

	public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
	{
		return this.canActivate(route, state);
	}
}
