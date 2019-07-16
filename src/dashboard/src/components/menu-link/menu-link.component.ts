import { Component, Input, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../models/menu.interface';

@Component({
	selector: 'vb-menu-link',
	templateUrl: 'menu-link.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuLinkComponent {
	@Input() item: MenuItem;
	@Input() overrideIcon: any;
	@Input() size: string;

	get icon() {
		return this.overrideIcon || this.item.icon;
	}

	constructor(private router: Router) {}

	@HostListener('click')
	onClick() {
		if (this.item.action) {
			this.item.action();
		} else if (this.item.link) {
			this.redirect(this.item.link);
		} else if (this.item.route) {
			const route = Array.isArray(this.item.route) ? this.item.route : [ this.item.route ];
			this.router.navigate(route);
		}
	}

	private redirect(url: string) {
		if (!url.includes('//')) {
			url = '//' + url;
		}

		window.location.href = url;
	}
}
