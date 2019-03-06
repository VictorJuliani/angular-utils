import { NFMItem } from './item.model';

export interface NFMHistory
{
	name: string;
	nodes: NFMHistory[];
	item: NFMItem | undefined;
}
