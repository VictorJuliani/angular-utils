import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
// modules
import { TranslateModule } from '@ngx-translate/core';
// components
import { FormErrorComponent } from './components/form-error/form-error.component';
import { FormCaptchaComponent } from './components/form-captcha/form-captcha.component';
// directives
import { FormErrorDirective } from './directives/form-error.directive';
import { FormErrorContainerDirective } from './directives/form-error-container.directive';
import { FormSubmitDirective } from './directives/form-submit.directive';
// services
import { FormsService } from './services/forms.service';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatIconModule,
		TranslateModule
	],
	declarations: [
		FormErrorDirective,
		FormErrorContainerDirective,
		FormSubmitDirective,
		FormCaptchaComponent,
		FormErrorComponent,
	],
	exports: [
		FormErrorDirective,
		FormErrorContainerDirective,
		FormSubmitDirective,
		FormCaptchaComponent,
	],
	providers: [
		FormsService
	],
	entryComponents: [
		FormErrorComponent
	]
})
export class VbFormsModule {}
