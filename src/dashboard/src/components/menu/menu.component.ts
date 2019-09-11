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
		const activeItems = this.menu
			.filter(m => !this.isHeader(m))
			.sort((i1: MenuItem, i2: MenuItem) => this.countActiveRoutes(i2) - this.countActiveRoutes(i1));

		this.activeItem = activeItems[0] as MenuItem;
	}

	isHeader(item: MenuEntry) {
		const props = [ 'action', 'link', 'route' ];
		return !this.isMenu(item) && !props.find(p => !!item[p]);
	}

	isMenu(item: MenuEntry) {
		return !!item['subMenu'];
	}

	activeMenuColor(item: MenuItem) {
		return item === this.activeItem
			? this.config.activeMenuColor
			: null;
	}

	activeMenuBoxShadow(item: MenuItem) {
		return item === this.activeItem
			? `0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px ${this.config.activeMenuBoxShadowColor}`
			: null;
	}

	onSelect(item: MenuItem, event: MouseEvent, parent?: MenuItem) {
		const newTab = 1 === event.button || event.ctrlKey || event.metaKey;
		const selection = window.getSelection();

		if (!newTab && selection && selection.toString().length) {
			return;
		}

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

	private countActiveRoutes(item: MenuItem): number {
		if (this.isMenu(item)) {
			return Math.max.apply(Math, item.subMenu.map(i => this.countActiveRoutes(i)));
		} else if (item.route) {
			const tree = this.router.createUrlTree(item.route);
			if (this.router.isActive(tree, false)) {
				return item.route.length;
			}
		}

		return 0;
	}
}
