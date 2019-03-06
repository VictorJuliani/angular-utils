import { FileTree, Upload, newUpload, newFileTree } from '../models/file-tree.model';

export class FileTreeBuilder {
	fileTree: FileTree;
	uploadList: (Upload | FileTree)[];

	constructor(private currentPath: string[]) {
		this.resetTree();
		this.fileTree.relativePath = this.currentPath;
	}

	buildTree(tree: FileTree, entries: any[]) {
		const promises = [];

		entries.forEach(entry => {
			if (entry.isFile) {
				const promise = this.parseFileEntry(entry)
					.then(file => {
						const upload = newUpload(file, tree);
						tree.uploads.push(upload);
					});
				promises.push(promise);
			} else if (entry.isDirectory) {
				const promise = this.parseDirectoryEntry(entry, tree)
					.then(directory => {
						tree.directories.push(directory);
					});
				promises.push(promise);
			}
		});

		return Promise.all(promises).then(() => tree);
	}

	resetTree() {
		this.uploadList = [];
		this.fileTree = newFileTree();
	}

	refreshUploadList() {
		this.uploadList = [
			...this.fileTree.uploads,
			...this.fileTree.directories,
		];
	}

	appendFiles(files: File[]) {
		files.forEach(file => {
			if (this.uploadList.findIndex(u => u.name === file.name) === -1) {
				const upload = newUpload(file, this.fileTree);
				this.fileTree.uploads.push(upload);
				this.uploadList.push(upload);
			}
		});
	}

	appendToTree(items: any[]) {
		const entries = items
					.filter(item => item.kind === 'file')
					.map(item => item.webkitGetAsEntry())
					.filter(item => this.uploadList.findIndex(f => f.name === item.name) === -1);

		return this.buildTree(this.fileTree, entries);
	}

	deleteElement(upload: Upload | FileTree, index: number) {
		// Remove from table
		this.uploadList.splice(index, 1);
		// Remove from tree
		if (upload.name) {
			this.fileTree.uploads = this.fileTree.uploads.filter(u => upload.name !== u.file.name);
			this.fileTree.directories = this.fileTree.directories.filter(dir => upload.name !== dir.name);
		}
	}

	private parseFileEntry(fileEntry): Promise<File> {
		return new Promise((resolve, reject) => {
			fileEntry.file(
				file => resolve(file),
				err => reject(err)
			);
		});
	}

	private parseDirectoryEntry(directoryEntry, parent: FileTree): Promise<FileTree> {
		const directoryReader = directoryEntry.createReader();
		const tree = newFileTree(directoryEntry.name, parent);

		return new Promise((resolve, reject) => {
			directoryReader.readEntries(
				entries => resolve(this.buildTree(tree, entries)),
				err => reject(err)
			);
		});
	}
}
