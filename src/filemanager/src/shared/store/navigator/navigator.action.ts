import { NFMItem } from '../../models/item.model';
import { NFMHistory } from '../../models/history.model';
import { TemplateMode } from '../../models/config.model';

export enum NavActionTypes {
	START_REFRESHING = '[NFM] Start Refreshing',
	STOP_REFRESHING = '[NFM] Stop Refreshing',
	SET_FILE_LIST = '[NFM] Set File List',
	SET_HISTORY = '[NFM] Set History',
	SET_TEMPLATE_MODE = '[NFM] Set Template Mode'
}

export class StartRefreshing {
	static readonly type = NavActionTypes.START_REFRESHING;
}

export class StopRefreshing {
	static readonly type = NavActionTypes.STOP_REFRESHING;
}

export class SetFileList {
	static readonly type = NavActionTypes.SET_FILE_LIST;
	constructor(public files: NFMItem[], public basePath: string[]) {}
}

export class SetHistory {
	static readonly type = NavActionTypes.SET_HISTORY;
	constructor(public history: NFMHistory[]) {}
}

export class SetTemplateMode {
	static readonly type = NavActionTypes.SET_TEMPLATE_MODE;
	constructor(public mode: TemplateMode) {}
}
