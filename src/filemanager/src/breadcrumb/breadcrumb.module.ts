import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
	imports: [
		SharedModule
	],
	exports: [
		BreadcrumbComponent
	],
	declarations: [
		BreadcrumbComponent
	]
})
export class BreadcrumbModule {}
