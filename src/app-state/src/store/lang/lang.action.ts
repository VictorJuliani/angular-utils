export enum LangActionTypes {
	SET_LANG = '[APP] Set Lang'
}

export class SetLang {
	static readonly type = LangActionTypes.SET_LANG;
	constructor(public lang: string) {}
}
