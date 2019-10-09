import { InjectionToken } from '@angular/core';

export const AUTH_CONFIG = new InjectionToken('auth_config');

export interface AuthConfig {
	mode: 'session' | 'oauth';
	authCookie: string;
	redirectUrl: () => string;
	cookieDomain: () => string;
	logoutOnError?: boolean;
	nextOnError?: boolean;
	authorization?: 'Bearer' | 'Basic';
}
