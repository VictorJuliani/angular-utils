import { NFMHistory } from '../models/history.model';
import { NFMItem } from '../models/item.model';

export class NFMUtil {
	public static isActive(currentPath: string | string[], file: NFMHistory) {
		if (Array.isArray(currentPath)) {
			currentPath = currentPath.join('/') + '/';
		}

		return file.name === currentPath;
	}

	public static sort(items: NFMItem[], by: keyof NFMItem, reverse: boolean) {
		const sorted = items.sort((a, b) => {
			const one = (reverse ? b : a)[by].toString();
			const two = (reverse ? a : b)[by].toString();
			return one.localeCompare(two);
		});

		return sorted;
	}

	public static fullPath(item: NFMItem) {
		const path = item.path.filter(Boolean);
		return ('/' + path.join('/') + '/' + item.name).replace(/\/\//, '/');
	}

	public static isFolder(item: NFMItem) {
		return 'dir' === item.type;
	}
}
