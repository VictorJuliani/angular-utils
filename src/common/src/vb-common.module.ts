import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
// pipes
import { EnumTitleCasePipe } from './pipes/enum-title-case.pipe';
import { EnumLowerCasePipe } from './pipes/enum-lower-case.pipe';
import { NullOptionPipe } from './pipes/null-option.pipe';
import { OptionPipe } from './pipes/option.pipe';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { SanitizeUrlPipe } from './pipes/sanitize-url.pipe';
import { PropertyPipe } from './pipes/property.pipe';

const components = [
	EnumTitleCasePipe,
	EnumLowerCasePipe,
	NullOptionPipe,
	OptionPipe,
	SanitizeHtmlPipe,
	SanitizeUrlPipe,
	PropertyPipe,
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
