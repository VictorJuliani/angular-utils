import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges,
	ChangeDetectionStrategy, ViewEncapsulation, OnInit } from '@angular/core';
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
	public readonly isSmallScreen = window.innerWidth < 768;
	@Input() menu: Menu;
	@Input() config: DashboardConfig;
	@Input() user: User;
	@Input() status: string;
	@Output() search = new EventEmitter<string>();

	// state properties
	isHovering: boolean;
	isCompressed: boolean;
	hoverDelay: number;
	activeMenu: Menu;

	get activeUser(): User {
		return this.user || { name: 'Unknown', roles: [] };
	}

	get pinned(): boolean {
		return !this.isSmallScreen && this.isCompressed && !this.isHovering;
	}

	get toggled(): boolean {
		return !this.isSmallScreen || !this.isCompressed;
	}

	get role() {
		let role = this.activeUser.roles.length ? this.activeUser.roles[0].name : 'user';
		for (const r of this.MAIN_ROLES) {
			if (r in this.activeUser.roles) {
				role = r;
			}
		}

		return role;
	}

	ngOnInit() {
		this.isCompressed = this.isSmallScreen || this.config.startCompressed;
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.menu || changes.user) {
			const roles = this.user ? this.user.roles.map(r => r.name) : [];
			this.activeMenu = this.menu.filter(m => !m.roles || roles.find(r => m.roles.includes(r)));
		}
	}

	onSearch(value: string) {
		this.search.emit(value);
	}

	compress() {
		this.hoverDelay = new Date().getTime();
		this.isHovering = false;
		this.isCompressed = !this.isCompressed;
	}

	hover(hover: boolean) {
		const now = new Date().getTime();
		if (now - this.hoverDelay < 300) {
			return;
		}

		this.isHovering = hover;
		this.hoverDelay = now;
	}
}
