import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { redirect, navigate } from '@vonbraunlabs/common';
// models
import { Menu, MenuItem, MenuEntry } from '../../models/menu.interface';
import { DashboardConfig } from '../../models/config.interface';

@Component({
	selector: 'vb-menu',
	templateUrl: 'menu.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit
{
	@Input() menu: Menu;
	@Input() config: DashboardConfig;
	activeItem: MenuItem;

	constructor(private router: Router) {}

	ngOnInit() {
		this.activeItem = this.menu
			.filter(m => !this.isHeader(m))
			.find((i: MenuItem) => this.isActive(i)) as MenuItem;
	}

	isHeader(item: MenuEntry) {
		const props = [ 'action', 'link', 'route' ];
		return !this.isMenu(item) && !props.find(p => !!item[p]);
	}

	isMenu(item: MenuEntry) {
		return !!item['subMenu'];
	}

	onSelect(item: MenuItem, event: MouseEvent, parent?: MenuItem) {
		const newTab = 1 === event.button || event.ctrlKey;

		if (item.action) {
			item.action();
		} else if (item.link) {
			redirect(item.link, newTab);
		} else if (item.route) {
			navigate(item.route, newTab, this.router);
		}

		if (!newTab && !item.action) {
			this.activeItem = parent || item;
		}
	}

	private isActive(item: MenuItem): boolean {
		if (this.isMenu(item)) {
			return !!item.subMenu.find(i => this.isActive(i));
		} else if (item.route) {
			const tree = this.router.createUrlTree(item.route);
			return this.router.isActive(tree, false);
		}

		return false;
	}
}
