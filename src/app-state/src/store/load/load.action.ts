export enum LoadActionTypes {
	SET_LOADING = '[APP] Set Loading'
}

export class SetLoading {
	static readonly type = LoadActionTypes.SET_LOADING;
	constructor(public loading: boolean) {}
}
