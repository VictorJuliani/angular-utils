import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
// models
import { User } from '@vonbraunlabs/app-state';
import { Menu } from '../../models/menu.interface';

@Component({
	selector: 'vb-dashboard',
	templateUrl: './dashboard.container.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardContainer implements OnChanges
{
	readonly MAIN_ROLES = [ 'admin', 'distributer', 'user' ];
	@Input() menu: Menu;
	@Input() loadingBar = false;
	@Input() includeSpinner = true;
	@Input() loadingColor = 'red';
	@Input() brand: string;
	@Input() user: User;

	toggled = window.innerWidth > 767;
	activeMenu: Menu;

	// ngOnInit() {
	// 	if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	// 		$(".sidebar-content").mCustomScrollbar({
	// 			axis: "y",
	// 			autoHideScrollbar: true,
	// 			scrollInertia: 300
	// 		});
	// 		$(".sidebar-content").addClass("desktop");
	// 	}
	// }

	get role() {
		let role = this.user.roles.length ? this.user.roles[0].name : '';
		for (const r of this.MAIN_ROLES) {
			if (r in this.user.roles) {
				role = r;
			}
		}

		return role;
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.menu || changes.user) {
			const roles = this.user ? this.user.roles.map(r => r.name) : [];
			this.activeMenu = this.menu.filter(m => !m.roles || roles.find(r => m.roles.includes(r)));
		}

		if (!this.user) {
			this.user = { name: 'Unknown', roles: [] };
		}
	}

	open() {
		this.toggled = true;
	}

	close() {
		this.toggled = false;
	}
}
