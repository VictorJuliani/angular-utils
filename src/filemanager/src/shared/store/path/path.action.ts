export enum PathActionTypes {
	SET_CURRENT_PATH = '[NFM] Current Path',
	PATH_UP_DIR = '[NFM] Up Dir',
	PATH_GO_TO = '[NFM] Go To'
}

export class SetCurrentPath {
	static readonly type = PathActionTypes.SET_CURRENT_PATH;
	constructor(public path: string[]) {}
}

export class PathUpDir {
	static readonly type = PathActionTypes.PATH_UP_DIR;
}

export class PathGoTo {
	static readonly type = PathActionTypes.PATH_GO_TO;
	constructor(public index: number) {}
}
