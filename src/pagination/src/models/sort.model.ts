export enum SortDirection {
	NONE,
	ASC,
	DESC
}

export interface Sort {
	key: string;
	direction: SortDirection;
}
