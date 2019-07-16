import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material';
// modules
import { TranslateModule } from '@ngx-translate/core';
// components
import { DashboardContainer } from './containers/dashboard/dashboard.container';
import { MenuComponent } from './components/menu/menu.component';
import { MenuLinkComponent } from './components/menu-link/menu-link.component';
import { PageNotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		MatIconModule,
		TranslateModule
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
