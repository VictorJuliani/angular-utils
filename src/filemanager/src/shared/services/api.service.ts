import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { setFilterParams } from '@vonbraunlabs/common';
// models
import { WindowRef } from '../models/window-ref.model';
import { NFMItem, NFMContent } from '../models/item.model';
import { NFMConfig, FileManagerConfig } from '../models/config.model';
import { FileHierarchy, TreeHierarchy, UploadAWS } from '../../navigator/models/file-tree.model';

@Injectable({ providedIn: 'root' })
export class APIService
{
	private API: string;

	constructor(
		@Inject(NFMConfig) private config: FileManagerConfig,
		private http: HttpClient,
		private winRef: WindowRef
	) {
		this.API = this.config.apiUrl;
	}

	public downloadUrl(path: string) {
		if (!path) {
			return undefined;
		}
		path = encodeURIComponent(path);
		const params = setFilterParams(undefined, { path });
		return `${this.API}/download?${params.toString()}`;
	}

	public list(path: string, exts?: string[]): Observable<NFMItem[]>
	{
		path = encodeURIComponent(path);
		const params = {
			path: path,
			// fileExtensions: exts
		};

		return this.http.get<NFMItem[]>(`${this.API}/list`, { params: setFilterParams(undefined, params) })
			.pipe(
				map(list => list.map(i => {
					return {
						...i,
						path: (i.path as any as string).split('/').splice(1)
					};
				}))
			);
	}

	public hierarchy(uploads: TreeHierarchy): Observable<UploadAWS>
	{
		const payload = uploads;
		return this.http.post<UploadAWS>(`${this.API}/hierarchy`, payload);
	}

	public copy(items: string[], path: string, singleFilename: string | undefined): Observable<Object>
	{
		const payload = {
			items: items,
			newPath: path,
			singleFilename: singleFilename && items.length === 1 ? singleFilename : ''
		};

		return this.http.post(`${this.API}/copy`, payload);
	}

	public move(items: string[], path: string): Observable<Object>
	{
		const payload = {
			items: items,
			newPath: path
		};

		return this.http.post(`${this.API}/move`, payload);
	}

	public remove(items: string[]): Observable<Object> {
		const payload = {
			items: items
		};

		return this.http.post(`${this.API}/remove`, payload);
	}

	public upload(formData: FormData): Observable<HttpEvent<Object>>
	{
		const headers = new HttpHeaders({Accept: 'application/vnd.filemanager.v1+multipart/form-data'});
		return this.http.post(`${this.API}/upload`, formData, { headers: headers, reportProgress: true, observe: 'events' });
	}

	public registerUpload(destination: string, hash: string, file: File, peer: number): Observable<Object>
	{
		const payload = {
			name: file.name,
			hash: hash,
			size: file.size,
			peer: peer,
			type: file.type,
			path: destination
		};
		return this.http.post(`${this.API}/registerUpload`, payload);
	}

	public uploadS3(formData: FormData, bucket: string): Observable<HttpEvent<Object>>
	{
		const headers = new HttpHeaders(
			{
				Accept: 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5', 
				Authorization: ' '
			});	
		//return this.http.post(`https://${bucket}.s3.amazonaws.com/`, formData, { headers: headers, reportProgress: true, observe: 'events' });
		return this.http.post(`https://s3.us-east-1.amazonaws.com/${bucket}/`, formData, { headers: headers, reportProgress: true, observe: 'events' });
	}

	public getContent(itemPath: string): Observable<NFMContent>
	{
		const params = {
			item: itemPath
		};

		return this.http.get<NFMContent>(`${this.API}/content`, { params: setFilterParams(undefined, params) });
	}

	public edit(path: string, content: string): Observable<Object>
	{
		return this.http.post(`${this.API}/edit/${path}`, content);
	}

	public rename(itemPath: string, newPath: string): Observable<Object>
	{
		const payload = {
			newItemPath: newPath,
			oldItemPath: itemPath
		};
		return this.http.post(`${this.API}/rename`, payload);
		// return this.http.post(`${this.API}/rename/${itemPath}`, payload);
	}

	public download(itemPath: string, toFilename: string, ajax: boolean, newWindow: boolean): Observable<boolean | NFMContent>
	{
		const headers = new HttpHeaders(
			{ Accept: `application/vnd.filemanager.v1+*/*` }
		);
		const url = this.downloadUrl(itemPath);
		const window = this.winRef.nativeWindow;

		if (!ajax || newWindow || !window['saveAs']) {
			return of(!!window.open(url, '_blank', ''));
		}

		return this.http.get(url, {headers: headers})
			.pipe(
				map((bin: any) => {
					const blob = new Blob([ bin ]);
					window['saveAs'](blob, toFilename);

					return blob;
				}
			));
	}

	public compress(items: string[], compressedFilename: string, destination: string): Observable<Object>
	{
		const payload = {
			items: items,
			destination: destination,
			compressedFilename: compressedFilename
		};

		return this.http.post(`${this.API}/compress`, payload);
	}

	public extract(item: string, folderName: string, destination: string): Observable<Object>
	{
		const payload = {
			destination: destination,
			folderName: folderName
		};

		return this.http.post(`${this.API}/extract/${item}`, payload);
	}

	public changePermissions(items: string[], permissions: string[], recursive: boolean): Observable<Object>
	{
		const payload = {
			items: items,
			permissions: permissions,
			recursive: recursive
		};

		return this.http.post(`${this.API}/permissions`, payload);
	}

	public createFolder(path: string): Observable<Object>
	{
		const payload = {
			path: path
		};

		return this.http.post(`${this.API}/folder`, payload);
	}
}
