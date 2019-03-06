import { NgModule } from '@angular/core';
// modules
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { VbAppStateModule } from '@vonbraunlabs/app-state';
// store
import { NgxsModule } from '@ngxs/store';
// pipes
import { StrLimitPipe } from './pipes/str-limit.pipe';

const declarations = [
	StrLimitPipe
];

@NgModule({
	imports: [
		CommonModule,
		FontAwesomeModule,
		NgxsModule,
		TranslateModule,
		VbAppStateModule,
	],
	declarations: [
		...declarations
	],
	exports: [
		CommonModule,
		FontAwesomeModule,
		TranslateModule,
		VbAppStateModule,
		...declarations
	]
})
export class SharedModule {}
