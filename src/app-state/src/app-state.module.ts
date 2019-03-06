import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';
// store
import { NgxsModule } from '@ngxs/store';
import { ErrorState } from './store/error/error.state';
import { LoadState } from './store/load/load.state';
import { LangState } from './store/lang/lang.state';
import { UserState } from './store/user/user.state';
// modules
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
// components
import { ErrorComponent } from './components/error/error.component';
import { FlagsComponent } from './components/flags/flags.component';
import { LangPipe } from './pipes/lang.pipe';
import { ErrorPipe } from './pipes/error-translate.pipe';
// services
import { ErrorInterceptor } from './services/error.interceptor';
import { routeReuseFactory } from './services/route-reuse.strategy';
import { AppStateConfig, APP_STATE_CONFIG } from './models/config.model';

@NgModule({
	imports: [
		CommonModule,
		NgbAlertModule,
		TranslateModule,
		NgxsModule.forFeature([
			ErrorState,
			LangState,
			LoadState,
			UserState
		])
	],
	declarations: [
		ErrorComponent,
		FlagsComponent,
		LangPipe,
		ErrorPipe
	],
	exports: [
		ErrorComponent,
		FlagsComponent
	]
})
export class VbAppStateModule {
	static forRoot(config?: AppStateConfig): ModuleWithProviders {
		return {
			ngModule: VbAppStateModule,
			providers: [
				{ provide: APP_STATE_CONFIG, useValue: config || {} },
				{ provide: RouteReuseStrategy, useFactory: routeReuseFactory, deps: [ APP_STATE_CONFIG ] },
				{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
			]
		};
	}
}
