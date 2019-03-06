export interface Role {
	id: number;
	name: string;
}

export interface User {
	name: string;
	roles: Role[];
	picture?: string;
}
