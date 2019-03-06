import { NFMItem } from '../../shared/models/item.model';

export interface NavigatorContext<T extends (NFMItem | NFMItem[] | void)> {
	selection: T;
	fileList: NFMItem[];
	currentPath: string[];
}
