export interface PageUpdate<T>
{
	page: number;
	items: T[];
	changed: boolean;
}
