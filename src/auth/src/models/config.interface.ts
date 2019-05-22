import { InjectionToken } from '@angular/core';

export const AUTH_CONFIG = new InjectionToken('auth_config');

export interface AuthConfig {
	mode: 'session' | 'oauth';
	redirectUrl: string;
	authCookie: string;
	cookieDomain: () => string;
	logoutOnError?: boolean;
	authorization?: 'Bearer' | 'Basic';
}
