import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
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
		return !!item['name'];
	}

	isMenu(item: Menu) {
		return !!item['subItems'];
	}

	isLink(item: Menu) {
		return !!item['label'] && !item['subItems'];
	}

	selectMenu(item: MenuItem) {
		// TODO: slideUp/slideDown animated
		this.selectedMenu = item === this.selectedMenu ? undefined : item;
	}
}
