import { Injectable, Inject, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
// store
import { Store } from '@ngxs/store';
import * as fromStore from '../store';
import { appStore } from '@vonbraunlabs/app-state';
// models
import { FileManagerConfig } from './../models/config.model';
import { NFMConfig } from '../models/config.model';
import { NFMItem } from '../models/item.model';
import { NFMRole } from '../models/role.model';
// services
import { MiddlewareService } from './middleware.service';
import { NFMUtil } from '../util/util';
import { NavigatorContext } from '../../navigator/models/navigator.context';

@Injectable({ providedIn: 'root' })
export class NavigatorService implements OnInit
{
	constructor(
		@Inject(NFMConfig) private config: FileManagerConfig,
		private store: Store,
		private api: MiddlewareService,
		private modal: NgbModal
	) {
		this.ngOnInit();
	}

	ngOnInit() {
		this.store.dispatch(new fromStore.SetCurrentPath(this.getBasePath()));
	}

	public getBasePath() {
		const path = (this.config.basePath || '').replace(/^\//, '');
		return path.trim() ? path.split('/') : [];
	}

	public hasAnyRole(roles: NFMRole) {
		const user = this.store.selectSnapshot(appStore.UserState.user);
		if (!user || !roles) {
			return false;
		}

		return !roles.length
			|| (user.roles && user.roles.map(r => r.name).some(r => roles.includes(r)));
	}

	public isEditable(item: NFMItem) {
		return !NFMUtil.isFolder(item) && this.config.isEditableFilePattern.test(item.name);
	}

	public isImage(item: NFMItem) {
		return this.config.isImageFilePattern.test(item.name);
	}

	public isExtractable(item: NFMItem) {
		return !NFMUtil.isFolder(item) && this.config.isExtractableFilePattern.test(item.name);
	}

	public isSelectable(item: NFMItem) {
		return (NFMUtil.isFolder(item) && this.hasAnyRole(this.config.allowedActions.pickFolders))
			|| (!NFMUtil.isFolder(item) && this.hasAnyRole(this.config.allowedActions.pickFiles));
	}

	public folderClick(item: NFMItem) {
		let path: string[] = [];
		if (item && NFMUtil.isFolder(item)) {
			path = NFMUtil.fullPath(item).split('/').splice(1);
		}
		this.store.dispatch(new fromStore.SetCurrentPath(path));
		this.refresh();
	}

	public upDir() {
		this.store.dispatch(new fromStore.PathUpDir());
		this.refresh();
	}

	public goTo(index: number) {
		this.store.dispatch(new fromStore.PathGoTo(index));
		this.refresh();
	}

	public refresh() {
		this.store.dispatch(new fromStore.SetFileList([], this.getBasePath()));
		this.store.dispatch(new fromStore.StartRefreshing());

		const path = this.store.selectSnapshot(fromStore.PathState.currentPath);
		this.api.list(path, false)
			.pipe(
				tap(() => this.store.dispatch(new fromStore.StopRefreshing())),
				catchError(e => {
					this.store.dispatch(new fromStore.StopRefreshing());
					return throwError(e);
				})
			)
			.subscribe(list => this.store.dispatch(new fromStore.SetFileList(list, this.getBasePath())));
	}

	public openModal<T extends (NFMItem | NFMItem[])>(
		context: NavigatorContext<NFMItem | NFMItem[]>,
		selection: T,
		component: any,
		size: 'sm' | 'lg' | null = null
	): NgbModalRef {
		const window = this.modal.open(component, { size, backdrop: 'static', keyboard: false });
		window.componentInstance.context = {
			currentPath: context.currentPath,
			fileList: context.fileList,
			selection: selection
		} as NavigatorContext<T>;

		return window;
	}
}
