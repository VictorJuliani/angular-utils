import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// modules
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { VbCommonModule } from '@vonbraunlabs/common';
// font-awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLongArrowAltDown, faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
// components
import { ListContainer } from './containers/list-container/list-container.container';
import { SortableTableContainer } from './containers/sortable-table/sortable-table.container';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NoItemsComponent } from './components/no-items/no-items.component';
// directives
import { LoadingDirective } from './directives/loading.directive';

library.add(faLongArrowAltUp, faLongArrowAltDown);

const components = [
	ListContainer,
	SortableTableContainer,
	PaginationComponent,
	NoItemsComponent,
	LoadingDirective
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NgbPaginationModule,
		TranslateModule,
		FontAwesomeModule,
		VbCommonModule
	],
	declarations: [
		...components
	],
	exports: [
		...components
	]
})
export class VbPaginationModule {}
