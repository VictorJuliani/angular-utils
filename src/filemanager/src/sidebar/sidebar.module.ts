import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';

@NgModule({
	imports: [
		SharedModule
	],
	exports: [
		SidebarComponent
	],
	declarations: [
		SidebarComponent,
		SidebarItemComponent
	]
})
export class SidebarModule {}
