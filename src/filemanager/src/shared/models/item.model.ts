export type NFMContent = Blob | string;

export interface NFMItem {
	name: string;
	path: string[];
	hash: string;
	father?: number;
	type: 'dir' | 'file';
	roles: string[];
	parentRoles?: string[];
	size?: number;
	date?: Date;
	content: NFMContent;
	recursive: boolean;
}
