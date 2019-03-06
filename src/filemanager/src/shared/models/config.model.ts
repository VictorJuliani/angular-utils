import { InjectionToken } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFile, faFolder } from '@fortawesome/free-solid-svg-icons';
import { NFMRole } from './role.model';

export const NFMDefaultConfig = new InjectionToken<FileManagerConfig>('NFM_default_config');
export const NFMConfig = new InjectionToken<FileManagerConfig>('NFM_config');

export type TemplateMode = 'table' | 'icons';

const editableRegEx = new RegExp (['/\.(txt|diff?|patch|svg|asc|cnf|cfg|conf|html?|.html|cfm|cgi|aspx?',
							'|ini|pl|py|md|css|cs|js|jsp|log|htaccess|htpasswd|gitignore|gitattributes',
							'|env|json|atom|eml|rss|markdown|sql|xml|xslt?|sh|rb|as|bat|cmd|cob|for|ftn',
							'|frm|frx|inc|lisp|scm|coffee|php[3-6]?|java|c|cbl|go|h|scala|vb|tmpl|lock',
							'|go|yml|yaml|tsv|lst)$/i'].join(''));

export interface FileManagerConfig {
	apiUrl: string;
	basePath: string;

	allowedActions?: {
		upload?: NFMRole;
		rename?: NFMRole;
		move?: NFMRole;
		copy?: NFMRole;
		edit?: NFMRole;
		changePermissions?: NFMRole;
		compress?: NFMRole;
		extract?: NFMRole;
		download?: NFMRole;
		downloadMultiple?: NFMRole;
		preview?: NFMRole;
		remove?: NFMRole;
		createFolder?: NFMRole;
		pickFiles?: NFMRole;
		pickFolders?: NFMRole;
	};

	breadcrumb?: {
		rootLabel: string;
		separator?: boolean;
	};

	icons?: {
		file: string | IconDefinition;
		folder: string | IconDefinition;
	};

	background?: boolean;
	parallelUploadLimit?: number;
	multipleDownloadFileName?: string;
	deselectOnClick?: boolean;
	searchForm?: boolean;
	sidebar?: boolean;
	showExtensionIcons?: boolean;
	useBinarySizePrefixes?: boolean;
	downloadFilesByAjax?: boolean;
	previewImagesInModal?: boolean;
	enablePermissionsRecursive?: boolean;
	pickCallback?: Function | null;
	isEditableFilePattern?: RegExp;
	isImageFilePattern?: RegExp;
	isExtractableFilePattern?: RegExp;
}

export const DEFAULT_FILE_MANAGER_CONFIG: FileManagerConfig = {
	apiUrl: 'http://localhost:3000',
	basePath: '/',
	multipleDownloadFileName: 'files.zip',

	allowedActions: {
		upload: [ 'admin' ],
		rename: [ 'admin' ],
		move: [ 'admin' ],
		copy: [ 'admin' ],
		edit: [ 'admin' ],
		changePermissions: [ 'admin' ],
		compress: false,
		extract: false,
		download: [],
		downloadMultiple: false,
		preview: false,
		remove: [ 'admin' ],
		createFolder: [ 'admin' ],
		pickFiles: false,
		pickFolders: false
	},

	breadcrumb: {
		rootLabel: '/',
		separator: true
	},

	icons: {
		file: faFile,
		folder: faFolder
	},

	background: true,
	parallelUploadLimit: 10,
	deselectOnClick: true,
	searchForm: true,
	sidebar: true,
	showExtensionIcons: true,
	useBinarySizePrefixes: false,
	downloadFilesByAjax: true,
	previewImagesInModal: true,
	enablePermissionsRecursive: true,
	pickCallback: null,
	isEditableFilePattern: editableRegEx,
	isImageFilePattern: /\.(jpe?g|gif|bmp|png|svg|tiff?)$/i,
	isExtractableFilePattern: /\.(gz|tar|rar|g?zip)$/i
};
