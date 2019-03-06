import { InjectionToken } from '@angular/core';

export const APP_STATE_CONFIG = new InjectionToken('APP_STATE_CONFIG');
export interface AppStateConfig {
	reuseRoutes?: { route: string, max: number }[];
}
