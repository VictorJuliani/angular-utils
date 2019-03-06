import { NgModule } from '@angular/core';
import { ChartDirective } from './directives/chart.directive';

@NgModule({
	declarations: [
		ChartDirective
	],
	exports: [
		ChartDirective
	]
})
export class VbChartsModule {}
