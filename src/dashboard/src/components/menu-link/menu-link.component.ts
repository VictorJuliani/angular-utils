import { Component, Input, ChangeDetectionStrategy, HostListener, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { redirect, navigate } from '@vonbraunlabs/common';
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
	@Output() selected = new EventEmitter<MenuItem>();

	constructor(private router: Router) {}

	@HostListener('click', ['$event'])
	@HostListener('auxclick', ['$event'])
	onClick(event: MouseEvent) {
		const newTab = 1 === event.button || event.ctrlKey;

		if (this.item.action) {
			this.item.action();
		} else if (this.item.link) {
			redirect(this.item.link, newTab);
		} else if (this.item.route) {
			const route = Array.isArray(this.item.route) ? this.item.route : [ this.item.route ];
			navigate(route, newTab, this.router);
		}

		if ('click' === event.type && !newTab) {
			this.selected.emit(this.item);
		}
	}
}
