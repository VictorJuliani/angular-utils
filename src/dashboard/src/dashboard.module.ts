import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// modules
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faTimes, faUser, faAngleRight, faCircle } from '@fortawesome/free-solid-svg-icons';
// components
import { DashboardContainer } from './containers/dashboard/dashboard.container';
import { MenuComponent } from './components/menu/menu.component';
import { MenuLinkComponent } from './components/menu-link/menu-link.component';
import { PageNotFoundComponent } from './components/not-found/not-found.component';

library.add(faBars, faTimes, faUser, faAngleRight, faCircle);

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		TranslateModule,
		FontAwesomeModule
	],
	declarations: [
		DashboardContainer,
		MenuComponent,
		MenuLinkComponent,
		PageNotFoundComponent
	],
	exports: [
		DashboardContainer,
		MenuComponent,
		MenuLinkComponent,
		PageNotFoundComponent
	]
})
export class VbDashboardModule {}
