import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type Menu = (MenuCategory | MenuItem)[];

export interface MenuCategory {
	name: string;
	badge?: MenuBadge;
	roles?: string[];
}

export interface MenuItem {
	label: string;
	icon?: IconDefinition;
	badge?: MenuBadge;
	action?: Function;
	link?: string;
	route?: string | string[];
	subItems?: MenuItem[];
	roles?: string[];
}

export interface MenuBadge {
	text: string;
	class: string;
}
