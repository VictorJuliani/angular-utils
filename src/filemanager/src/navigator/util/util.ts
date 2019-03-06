import { NFMItem } from '../../shared/models/item.model';
import { FileTree, Upload, TreeHierarchy } from '../models/file-tree.model';

export function isSamePath(pathOne: string[], pathTwo: string[]) {
	const pathOneString = pathOne && pathOne.join('');
	const pathTwoString = pathTwo.join('');
	return pathOneString === pathTwoString;
}

export function itemsHave(items: NFMItem[], type: 'file' | 'dir') {
	return items.some(i => i.type === type);
}

export function itemExists(name: string, files: NFMItem[]) {
	name = name.trim();
	return !!files.find(file => file.name.trim() === name);
}

export function validFilename(name: string) {
	return /^[\w\-. ]*$/.test(name);
}

export function buildTreePath(tree: FileTree) {
	const relativePath = [ ...tree.relativePath ];
	if (tree.name) {
		relativePath.push(tree.name);
	}

	let destination = `/${relativePath.join('/')}`;
	if (!destination.endsWith('/')) {
		destination += '/';
	}

	return destination;
}

export function fileFullPath(path: string, upload: Upload) {
	return path + upload.name;
}

export function buildTreeHierarchy(tree: FileTree): TreeHierarchy {
	const path = buildTreePath(tree);

	return {
		path,
		files: tree.uploads.map(u => u.name),
		folders: tree.directories.map(buildTreeHierarchy)
	};
}
