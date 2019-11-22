import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges,
	ChangeDetectionStrategy, ViewEncapsulation, OnInit, HostListener, HostBinding } from '@angular/core';
import { User } from '@vonbraunlabs/app-state';
import { Menu } from '../../models/menu.interface';
import { DashboardConfig } from '../../models/config.interface';

@Component({
	selector: 'vb-dashboard',
	templateUrl: 'dashboard.container.html',
	styleUrls: [ '../../scss/dashboard.scss', '../../scss/sidebar-themes.scss' ],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardContainer implements OnInit, OnChanges
{
	private readonly MAIN_ROLES = [ 'admin', 'user' ];
	@Input() menu: Menu;
	@Input() config: DashboardConfig;
	@Input() user: User;
	@Input() status: string;
	@Input() isCompressed: boolean;
	@Output() search = new EventEmitter<string>();

	// css bindings
	@HostBinding('class') get wrappers(): string {
		const classes = 'page-wrapper border-radius-on';
		if (this.config) {
			return `${classes} ${this.config.theme}-theme`;
		}

		return classes;
	}

	@HostBinding('class.visible') get isVisible(): boolean {
		return !this.isSmallScreen || !this.isCompressed;
	}

	@HostBinding('class.compressed') get compressed(): boolean {
		return this.isCompressed;
	}

	// state properties
	isSmallScreen: boolean;
	activeMenu: Menu;

	get activeUser(): User {
		return this.user || { name: 'Unknown', roles: [] };
	}

	get role() {
		let role = this.activeUser.roles.length ? this.activeUser.roles[0].name : 'user';
		for (const r of this.activeUser.roles) {
			if (r.name in this.MAIN_ROLES) {
				role = r.name;
			}
		}

		return role;
	}

	ngOnInit() {
		this.isCompressed = this.isCompressed || this.isSmallScreen;
		this.onResize();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.menu || changes.user) {
			const roles = this.user ? this.user.roles.map(r => r.name) : [];
			this.activeMenu = this.menu.filter(m => !m.roles || roles.find(r => m.roles.includes(r)));
		}
	}

	@HostListener('window:resize')
	onResize() {
		this.isSmallScreen = window.innerWidth < 768;
	}

	onSearch(value: string) {
		this.search.emit(value);
	}
}
