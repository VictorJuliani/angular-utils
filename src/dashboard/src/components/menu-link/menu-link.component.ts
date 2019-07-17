import { Component, Input, ChangeDetectionStrategy, HostListener, EventEmitter, Output } from '@angular/core';
import { MenuItem } from '../../models/menu.interface';

@Component({
	selector: 'vb-menu-link',
	templateUrl: 'menu-link.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuLinkComponent {
	@Input() item: MenuItem;
	@Input() isSubItem: boolean;
	@Input() hasCaret: boolean;
	@Output() selected = new EventEmitter<MouseEvent>();

	@HostListener('click', ['$event'])
	@HostListener('auxclick', ['$event'])
	onClick(event: MouseEvent) {
		if (event.button > 1) {
			return;
		}

		this.selected.emit(event);
	}
}
