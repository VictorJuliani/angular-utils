export type Menu = MenuEntry[];
export type MenuEntry = MenuCategory | MenuItem;

export interface MenuCategory {
	label: string;
	roles?: string[];
}

export interface MenuItem {
	label: string;
	icon: string;
	badge?: MenuBadge;
	action?: Function;
	link?: string;
	route?: string[];
	subMenu?: MenuItem[];
	roles?: string[];
}

export interface MenuBadge {
	text: string;
	class: string;
}
