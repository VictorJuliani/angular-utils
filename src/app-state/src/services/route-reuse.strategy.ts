import { ComponentRef } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy, Route } from '@angular/router';
import { AppStateConfig } from '../models/config.model';

interface RouteStates {
	max: number;
	handles: { [handleKey: string]: DetachedRouteHandle };
	handleKeys: string[];
}

export function routeReuseFactory(config: AppStateConfig) {
	return new AppRouteReuseStrategy(config);
}

function getResolvedUrl(route: ActivatedRouteSnapshot): string {
	return route.pathFromRoot
		.filter(v => v.url.length)
		.map(v => v.url.map(segment => segment.toString()).join('/'))
		.join('/');
}

function getConfiguredUrl(route: ActivatedRouteSnapshot): string {
	return '/' + route.pathFromRoot
		.filter(v => v.routeConfig && v.url.length)
		.map(v => (v.routeConfig as Route).path)
		.join('/');
}

export class AppRouteReuseStrategy implements RouteReuseStrategy {
	private routes: { [routePath: string]: RouteStates } = {};

	constructor(config: AppStateConfig) {
		if (config.reuseRoutes) {
			for (const reuse of config.reuseRoutes) {
				this.routes[reuse.route] = { max: reuse.max, handles: {}, handleKeys: [] };
			}
		}
	}

	/** Determines if this route (and its subtree) should be detached to be reused later */
	shouldDetach(route: ActivatedRouteSnapshot): boolean {
		return !!this.routes[getConfiguredUrl(route)];
	}

	/**
	 * Stores the detached route.
	 * Storing a `null` value should erase the previously stored value.
	 */
	store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
		if (route.routeConfig) {
			const config = this.routes[getConfiguredUrl(route)];
			if (config) {
				const storeKey = this.getStoreKey(route);
				if (handle) {
					if (!config.handles[storeKey]) {
						// add new handle
						if (config.handleKeys.length >= config.max) {
							const oldestUrl = config.handleKeys[0];
							config.handleKeys.splice(0, 1);

							// this is important to work around memory leaks, as Angular will never destroy the Component
							// on its own once it got stored in our router strategy.
							const oldHandle = config.handles[oldestUrl] as { componentRef: ComponentRef<any> };
							oldHandle.componentRef.destroy();

							delete config.handles[oldestUrl];
						}
						config.handles[storeKey] = handle;
						config.handleKeys.push(storeKey);
					}
				} else {
					// we do not delete old handles on request, as we define when the handle dies
				}
			}
		}
	}

	/** Determines if this route (and its subtree) should be reattached */
	shouldAttach(route: ActivatedRouteSnapshot): boolean {
		return !!this.getHandle(route);
	}

	/** Retrieves the previously stored route */
	retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
		return this.getHandle(route);
	}

	/** Determines if `curr` route should be reused */
	shouldReuseRoute(before: ActivatedRouteSnapshot, after: ActivatedRouteSnapshot): boolean {
		return before.routeConfig === after.routeConfig && getResolvedUrl(before) === getResolvedUrl(after);
	}

	private getHandle(route: ActivatedRouteSnapshot) {
		if (route.routeConfig) {
			const config = this.routes[getConfiguredUrl(route)];

			if (config) {
				const storeKey = this.getStoreKey(route);
				return config.handles[storeKey];
			}
		}

		return null;
	}

	private getStoreKey(route: ActivatedRouteSnapshot) {
		const baseUrl = getResolvedUrl(route);

		// this works, as ActivatedRouteSnapshot has only every one children ActivatedRouteSnapshot
		// as you can't have more since urls like `/project/1,2` where you'd want to display 1 and 2 project at the
		// same time
		const childrenParts = [];
		let deepestChild = route;
		while (deepestChild.firstChild) {
			deepestChild = deepestChild.firstChild;
			childrenParts.push(deepestChild.url.join('/'));
		}

		// it's important to separate baseUrl with childrenParts so we don't have collisions.
		return baseUrl + '////' + childrenParts.join('/');
	}
}
