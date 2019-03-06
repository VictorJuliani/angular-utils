import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// modules
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSyncAlt, faTimes, faCalendar } from '@fortawesome/free-solid-svg-icons';
// components
import { FormErrorComponent } from './components/form-error/form-error.component';
import { FormCaptchaComponent } from './components/form-captcha/form-captcha.component';
import { FormDatepickerComponent } from './components/form-datepicker/form-datepicker.component';
// directives
import { FormErrorDirective } from './directives/form-error.directive';
import { FormErrorContainerDirective } from './directives/form-error-container.directive';
import { FormSubmitDirective } from './directives/form-submit.directive';
// services
import { FormsService } from './services/forms.service';

library.add(faSyncAlt, faTimes, faCalendar);

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		NgbDatepickerModule,
		TranslateModule,
		FontAwesomeModule
	],
	declarations: [
		FormErrorDirective,
		FormErrorContainerDirective,
		FormSubmitDirective,
		FormDatepickerComponent,
		FormCaptchaComponent,
		FormErrorComponent,
	],
	exports: [
		FormErrorDirective,
		FormErrorContainerDirective,
		FormSubmitDirective,
		FormCaptchaComponent,
		FormDatepickerComponent,
	],
	providers: [
		FormsService
	],
	entryComponents: [
		FormErrorComponent
	]
})
export class VbFormsModule {}
