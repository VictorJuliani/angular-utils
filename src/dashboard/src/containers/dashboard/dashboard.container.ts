import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges,
	ChangeDetectionStrategy, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { AnonymousSubject } from 'rxjs/internal/Subject';
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
export class DashboardContainer implements OnInit, OnChanges, OnDestroy
{
	public readonly isSmallScreen = window.innerWidth < 768;
	private readonly MAIN_ROLES = [ 'admin', 'user' ];
	private hover$$: Subject<boolean> = new Subject<boolean>()
		.pipe(throttleTime(300, undefined, { trailing: true, leading: true })) as AnonymousSubject<boolean>;

	@Input() menu: Menu;
	@Input() config: DashboardConfig;
	@Input() user: User;
	@Input() status: string;
	@Output() search = new EventEmitter<string>();

	// state properties
	isHovering: boolean;
	isCompressed: boolean;
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
		for (const r of this.activeUser.roles) {
			if (r.name in this.MAIN_ROLES) {
				role = r.name;
			}
		}

		return role;
	}

	constructor(private changeDetector: ChangeDetectorRef) {}

	ngOnInit() {
		this.isCompressed = this.isSmallScreen || this.config.startCompressed;
		this.hover$$
			.subscribe(hover => {
				this.isHovering = hover;
				this.changeDetector.markForCheck();
			});
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.menu || changes.user) {
			const roles = this.user ? this.user.roles.map(r => r.name) : [];
			this.activeMenu = this.menu.filter(m => !m.roles || roles.find(r => m.roles.includes(r)));
		}
	}

	ngOnDestroy() {
		this.hover$$.complete();
	}

	onSearch(value: string) {
		this.search.emit(value);
	}

	compress() {
		this.isHovering = false;
		this.isCompressed = !this.isCompressed;
		this.hover$$.next(this.isHovering);
	}

	hover(hover: boolean) {
		this.hover$$.next(hover);
	}
}
