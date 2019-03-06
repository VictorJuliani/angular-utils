import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
	imports: [
		FormsModule,
		BreadcrumbModule,
		SharedModule
	],
	exports: [
		NavbarComponent
	],
	declarations: [
		NavbarComponent,
		MenuComponent
	]
})
export class NavbarModule {}
