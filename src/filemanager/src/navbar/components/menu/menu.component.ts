import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { TemplateMode } from '../../../shared/models/config.model';

@Component({
	selector: 'vb-menu',
	templateUrl: 'menu.component.html',
	styleUrls: [ 'menu.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
	@Input() mode: TemplateMode;
	@Input() showSearch: boolean;

	@Output() upDir = new EventEmitter<void>();
	@Output() search = new EventEmitter<string>();
	@Output() changeTemplate = new EventEmitter<TemplateMode>();

	query: string;

	goUp() {
		this.upDir.emit();
	}

	doSearch() {
		this.search.emit(this.query);
	}

	setTemplate(mode: TemplateMode) {
		this.changeTemplate.emit(mode);
	}
}
