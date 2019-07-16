import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
// models
import { Menu, MenuItem } from '../../models/menu.interface';

@Component({
	selector: 'vb-menu',
	templateUrl: 'menu.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent
{
	@Input() menu: Menu;
	selectedMenu: MenuItem;

	isHeader(item: Menu) {
		return !this.isMenu(item) && !this.isLink(item);
	}

	isMenu(item: Menu) {
		return !!item['subMenu'];
	}

	isLink(item: Menu) {
		const props = [ 'action', 'link', 'route' ];
		return !this.isMenu(item) && props.find(p => !!item[p]);
	}

	selectMenu(item: MenuItem) {
		// TODO: slideUp/slideDown animated
		this.selectedMenu = item === this.selectedMenu ? undefined : item;
	}
}
