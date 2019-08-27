export enum WindowActionTypes {
	RESIZE = '[APP] Set Size'
}

export class SetSize {
	static readonly type = WindowActionTypes.RESIZE;
	constructor(public size: number) {}
}
