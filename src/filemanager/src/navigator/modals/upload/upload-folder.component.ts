import { Component, Input, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, OnInit, Inject } from '@angular/core';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { of, Observable, forkJoin, from, noop } from 'rxjs';
import { tap, catchError, mergeMap, switchMap } from 'rxjs/operators';
// modals
import { ModalComponent } from '../modal/modal.component';
import { NavigatorContext } from '../../models/navigator.context';
import { NFMItem } from '../../../shared/models/item.model';
import { FileTree, FileHierarchy, Upload, UploadState, UploadAWS } from '../../models/file-tree.model';
// services
import { MiddlewareService } from '../../../shared/services/middleware.service';
import { FileTreeBuilder } from '../../util/file-tree.builder';
import { NFMConfig, FileManagerConfig } from '../../../shared/models/config.model';
import { buildTreePath, buildTreeHierarchy, fileFullPath } from '../../util/util';


@Component({
	templateUrl: 'upload-folder.component.html',
	styleUrls: [ 'upload-folder.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadModalComponent implements OnInit
{
	readonly UPLOAD_STATE = UploadState;
	@Input() context: NavigatorContext<NFMItem[]>;
	@ViewChild(ModalComponent) modal: ModalComponent;

	builder: FileTreeBuilder;
	failures: string[];
	showFailures: boolean;
	dirty = false;

	get canDropFolder() {
		return typeof DataTransferItem.prototype.webkitGetAsEntry === 'function';
	}

	get canUpload() {
		return this.uploadList.length;
	}

	get currentPath() {
		return this.context.currentPath;
	}

	get fileTree() {
		return this.builder.fileTree;
	}

	get uploadList() {
		return this.builder.uploadList;
	}

	get loading() {
		return this.modal.loading;
	}

	constructor(
		@Inject(NFMConfig) private config: FileManagerConfig,
		private api: MiddlewareService,
		private cdr: ChangeDetectorRef,
	) {}

	ngOnInit() {
		this.builder = new FileTreeBuilder(this.context.currentPath);
	}

	drop(event: DragEvent) {
		if ('change' === event.type) {
			this.builder.appendFiles(Array.from(event.target['files']));
		} else {
			this.builder.appendToTree(Array.from(event.dataTransfer.items))
				.then(() => {
					this.builder.refreshUploadList();
					this.cdr.markForCheck();
				});
		}

		return false;
	}

	uploadFiles() {
		this.dirty = true;
		this.failures = [];
		this.showFailures = false;
		const treeHierarchy = buildTreeHierarchy(this.fileTree);

		const uploadTask = this.api.hierarchy(treeHierarchy)
			.pipe(
				switchMap(hierarchy => from(this.uploadTree(this.fileTree, hierarchy))),
				mergeMap(task => forkJoin(task), this.config.parallelUploadLimit)
			)
			.subscribe(
				noop,
				() => {
					this.failures = [];
					this.modal.error('An error occured uploading your files. Please try uploading again.');
					this.cdr.markForCheck();
				},
				() => {
					console.log('upload complete');
					if (UploadState.SUCCESS === this.fileTree.state) {
						this.modal.close('All files have been successfully uploaded');
					} else {
						this.modal.error(undefined);
					}
				});

		this.modal.saveTask(uploadTask);
		this.cdr.markForCheck();
	}

	uploadTree(tree: FileTree, hierarchy: UploadAWS): Observable<HttpEvent<Object>>[] {
		const uploadTasks = [];
		const destination = buildTreePath(tree);
		console.log('tree', tree.name, 'with path', destination);

		const hierarchyFiles = hierarchy.files;

		for (const upload of tree.uploads) {

			const file = upload.file;
			if (UploadState.SUCCESS === upload.state) {
				// skip uploaded files
				console.log('skipping file', file.name);
				continue;
			} else if (hierarchyFiles[fileFullPath(destination, upload)].toUpload) {
				console.log('skipping file (server has it)', file.name);
				upload.state = UploadState.SUCCESS;
				upload.progress = 100;
				continue;
			}

			upload.progress = 0;
			upload.state = UploadState.NOT_STARTED;

			const hash = hierarchyFiles[fileFullPath(destination, upload)].hash;
			const peer = hierarchyFiles[fileFullPath(destination, upload)].peer;

			const task = this.api.uploadS3(hash, file, hierarchy)
				.pipe(
					tap(event => {

						switch (event.type) {				
							case HttpEventType.UploadProgress:
								if (!event.total) {
									console.log('event with invalid total', event.total, upload, event);
									upload.progress = 100;
								} else {
									upload.progress = Math.round(100 * event.loaded / event.total);
								}
								break;
							case HttpEventType.Response:
								this.api.registerUpload(destination,hash,file,peer)
								.subscribe(
									() => console.log('Register file success ' + file.name),
									e => this.modal.error('Could not register files after the upload, please retry upload', true));
						
								upload.progress = 100;
								upload.state = UploadState.SUCCESS;	
								break;
						}

					}),
					catchError(error => {
						console.log('Error Uploading ' + file.name, error);
						const filePath = buildTreePath(upload.parent) + upload.name;
						this.failures.push(filePath);
						this.failures.sort((a, b) => a.localeCompare(b));

						upload.state = UploadState.ERROR;
						this.modal.toast({
							message: 'Failed uploading file "{{name}}"',
							params: { name: file.name }
						});
						return of({ error: upload });
					}),
					tap(() => {
						this.updateFolderProgress(tree, true);
						this.cdr.markForCheck();
					})
				);

			uploadTasks.push(task);
		}

		for (const dir of tree.directories) {
			if (UploadState.SUCCESS === dir.state) {
				continue;
			}

			dir.state = UploadState.NOT_STARTED;
			const tasks = this.uploadTree(dir, hierarchy);
			uploadTasks.push.apply(uploadTasks, tasks);
		}

		this.updateFolderProgress(tree, false);
		return uploadTasks;
	}

	deleteFiles() {
		if (!this.loading) {
			this.builder.resetTree();
		} else {
			this.modal.cancel();
		}

		this.failures = [];
		this.modal.error(undefined);
	}

	deleteSingleTreeElement(upload: Upload | FileTree, index: number) {
		this.builder.deleteElement(upload, index);
	}

	private updateFolderProgress(tree: FileTree, recursive: boolean) {
		let parent = tree;

		do {
			let progress = 0;
			let isComplete = true;
			let hasError = false;

			for (const u of parent.uploads) {
				progress += u.progress;
				isComplete = isComplete && UploadState.SUCCESS === u.state;
				hasError = hasError || UploadState.ERROR === u.state;
			}

			for (const dir of parent.directories) {
				progress += dir.progress;
				isComplete = isComplete && UploadState.SUCCESS === dir.state;
				hasError = hasError || UploadState.ERROR === dir.state;
			}

			parent.progress = progress / (parent.uploads.length + parent.directories.length);
			if (hasError) {
				parent.state = UploadState.ERROR;
			} else if (isComplete) {
				parent.state = UploadState.SUCCESS;
				parent.progress = 100;
			}

			parent = parent.parent;
		} while (parent && recursive);
	}
}

