export interface Pagination
{
	page: number;
	pageSize: number;
	requestTotal?: boolean;
}

export interface PaginatedResponse<T>
{
	body: T;
	totalLength?: number;
}

