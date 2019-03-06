import { User, Role } from '../../models/user.model';

export enum UserActionTypes {
	SET_USER = '[APP] Set User',
	CLEAR_USER = '[APP] Clear User',
	SET_ROLES = '[APP] Set Roles'
}

export class SetUser {
	static readonly type = UserActionTypes.SET_USER;
	constructor(public user: User) {}
}

export class ClearUser {
	static readonly type = UserActionTypes.CLEAR_USER;
}

export class SetRoles {
	static readonly type = UserActionTypes.SET_ROLES;
	constructor(public roles: Role[]) {}
}
