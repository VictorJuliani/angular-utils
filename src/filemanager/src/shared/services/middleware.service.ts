import { ErrorService } from '@vonbraunlabs/app-state';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
// services
import { APIService } from './api.service';
import { WindowRef } from '../models/window-ref.model';
import { NFMUtil } from '../util/util';
// models
import { FileHierarchy, TreeHierarchy, UploadAWS, Upload } from '../../navigator/models/file-tree.model';
import { NFMConfig, FileManagerConfig } from '../models/config.model';
import { NFMItem } from '../models/item.model';

@Injectable({ providedIn: 'root' })
export class MiddlewareService
{
	constructor(
		@Inject(NFMConfig) private config: FileManagerConfig,
		private winRef: WindowRef,
		private error: ErrorService,
		private api: APIService
	) {}

	public getPath(arrayPath: string[])
	{
		return ('/' + arrayPath.join('/')).replace(/\/\//, '/');
	}

	public getFileList(files: NFMItem[])
	{
		return (files || []).map(this.getFilePath);
	}

	public getFilePath(file: NFMItem)
	{
		return file && NFMUtil.fullPath(file);
	}

	public downloadUrl(file: NFMItem)
	{
		return this.api.downloadUrl(this.getFilePath(file));
	}

	public list(path: string[], fromModal: boolean)
	{
		const selector = fromModal ? 'modal' : 'nfm';
		return this.error.wrapError(this.api.list(this.getPath(path)), selector);
	}

	public hierarchy(tree: TreeHierarchy): Observable<UploadAWS>
	{
		return this.api.hierarchy(tree);
	}

	public download(item: NFMItem, forceNewWindow: boolean)
	{
		const itemPath = this.getFilePath(item);
		const toFilename = item.name;

		return this.error.wrapError(
			this.api.download(
				itemPath,
				toFilename,
				this.config.downloadFilesByAjax,
				forceNewWindow
			), 'nfm');
	}

	public downloadMultiple(items: NFMItem[], forceNewWindow: boolean)
	{
		const files = this.getFileList(items);
		const timestamp = new Date().getTime().toString().substr(8, 13);
		const toFilename = timestamp + '-' + this.config.multipleDownloadFileName;

		// TODO: implement me
		// return this.api.download(
		// 	files,
		// 	toFilename,
		// 	this.config.downloadFilesByAjax,
		// 	forceNewWindow
		// );
	}

	public copy(items: NFMItem[], path: string[], newName?: string)
	{
		const files = this.getFileList(items);
		const singleFilename = 1 === items.length ? newName : undefined;
		return this.api.copy(files, this.getPath(path), singleFilename);
	}

	public move(items: NFMItem[], path: string[])
	{
		const files = this.getFileList(items);
		return this.api.move(files, this.getPath(path));
	}

	public remove(items: NFMItem[])
	{
		const files = this.getFileList(items);
		return this.api.remove(files);
	}

	public registerUpload(destination: string, hash: string, file: File, peer: number): Observable<Object>
	{
		return this.api.registerUpload(destination, hash, file, peer);
	}

	public uploadS3(hash: string, file: File, aws: UploadAWS): Observable<HttpEvent<Object>>
	{
		const window = this.winRef.nativeWindow;
		if (!window['FormData']) {
			throw new Error('Unsupported browser version');
		}

		const formData = new FormData();
		formData.append('key', hash);
		formData.append('acl','private');
		formData.append('success_action_status','200');
		formData.append('Content-Type',file.type);		
		formData.append('AWSAccessKeyId', aws.accessKey);
		formData.append('policy',aws.policy);
		formData.append('signature', aws.signature);
		formData.append('file', file);
		
		return this.api.uploadS3(formData,aws.bucket);
	}

	public upload(destination: string, file: File): Observable<HttpEvent<Object>>
	{
		const window = this.winRef.nativeWindow;
		if (!window['FormData']) {
			throw new Error('Unsupported browser version');
		}

		const formData = new FormData();
		formData.append('file', file, file.name);
		formData.append('destination', destination);

		return this.api.upload(formData);
	}

	public getContent(item: NFMItem)
	{
		const itemPath = this.getFilePath(item);
		return this.api.getContent(itemPath);
	}

	public edit(item: NFMItem, content: string)
	{
		const itemPath = this.getFilePath(item);
		return this.api.edit(itemPath, content);
	}

	public rename(item: NFMItem, newName: string)
	{
		const itemPath = this.getFilePath(item);
		return this.api.rename(itemPath, newName);
	}

	public compress(items: NFMItem[], compressedFilename: string, path: string[])
	{
		const files = this.getFileList(items);
		return this.api.compress(files, compressedFilename, this.getPath(path));
	}

	public extract(item: NFMItem, folderName: string, path: string[])
	{
		const itemPath = this.getFilePath(item);
		return this.api.extract(itemPath, folderName, this.getPath(path));
	}

	public changePermissions(items: NFMItem[], newPerms: string[], recursive: boolean)
	{
		const files = this.getFileList(items);
		return this.api.changePermissions(files, newPerms, recursive);
	}

	public createFolder(name: string, path: string[])
	{
		const item = { name, path } as NFMItem;
		return this.api.createFolder(this.getFilePath(item));
	}
}
