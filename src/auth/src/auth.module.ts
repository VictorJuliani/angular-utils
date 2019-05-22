import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// modules
import { CookieService } from 'ngx-cookie-service';
// services
import { AuthGuard } from './services/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
// initializer
import { AuthConfig, AUTH_CONFIG } from './models/config.interface';

@NgModule({
	imports: [
		RouterModule
	],
	providers: [
		AuthGuard,
		CookieService
	]
})
export class VbAuthModule {
	static forRoot(config: AuthConfig): ModuleWithProviders
	{
		return {
			ngModule: VbAuthModule,
			providers: [
				{ provide: AUTH_CONFIG, useValue: config },
				{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
				{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
			]
		};
	}
}
