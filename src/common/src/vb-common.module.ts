import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
// pipes
import { EnumTitleCasePipe } from './pipes/enum-title-case.pipe';
import { EnumLowerCasePipe } from './pipes/enum-lower-case.pipe';
import { NullOptionPipe } from './pipes/null-option.pipe';
import { OptionPipe } from './pipes/option.pipe';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';

const components = [
	EnumTitleCasePipe,
	EnumLowerCasePipe,
	NullOptionPipe,
	OptionPipe,
	SanitizeHtmlPipe,
	SpinnerComponent
];

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		...components
	],
	exports: [
		...components
	]
})
export class VbCommonModule {}
