export enum UploadState {
	SUCCESS,
	ERROR,
	NOT_STARTED
}

export interface FileTree {
	name: string;
	relativePath: string[];
	uploads: Upload[];
	directories: FileTree[];
	parent: FileTree | undefined;
	progress: number;
	state: UploadState;
}

export interface Upload {
	name: string;
	file: File;
	progress: number;
	state: UploadState;
	parent: FileTree;
}

export interface UploadAWS {
	files: FileHierarchy[];
	bucket: string;
	accessKey: string;
	policy: string;
	signature: string;
}

export interface FileHierarchy {
	[key: string]: { hash: string, toUpload: boolean, peer: number};
}

export interface TreeHierarchy {
	path: string;
	files: string[];
	folders: TreeHierarchy[];
}

export function newUpload(file: File, parent: FileTree): Upload {
	return {
		name: file.name,
		file,
		parent,
		progress: 0,
		state: UploadState.NOT_STARTED
	};
}

export function newFileTree(name = '', parent?: FileTree): FileTree {
	let relativePath = [];
	if (parent) {
		relativePath = [ ...parent.relativePath ];
		if (parent.name) {
			relativePath.push(parent.name);
		}
	}

	return {
		name,
		relativePath: relativePath,
		progress: 0,
		uploads: [],
		directories: [],
		parent,
		state: UploadState.NOT_STARTED
	};
}
