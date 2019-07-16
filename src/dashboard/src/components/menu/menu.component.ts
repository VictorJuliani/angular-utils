import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
// models
import { Menu, MenuItem } from '../../models/menu.interface';
import { DashboardConfig } from '../../models/config.interface';

@Component({
	selector: 'vb-menu',
	templateUrl: 'menu.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent
{
	@Input() menu: Menu;
	@Input() config: DashboardConfig;
	selectedItem: MenuItem;

	isHeader(item: Menu) {
		const props = [ 'action', 'link', 'route' ];
		return !this.isMenu(item) && !props.find(p => !!item[p]);
	}

	isMenu(item: Menu) {
		return !!item['subMenu'];
	}

	selectItem(item: MenuItem) {
		// TODO: if item is a route, mark it active (or its parent, for a sub-menu)
		this.selectedItem = item === this.selectedItem ? undefined : item;
	}
}
