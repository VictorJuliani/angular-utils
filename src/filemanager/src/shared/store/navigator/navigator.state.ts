import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import * as fromActions from './navigator.action';
import { NFMHistory } from '../../models/history.model';
import { NFMItem } from '../../models/item.model';
import { TemplateMode } from '../../models/config.model';
import { PathState } from '../path/path.state';
import { NavigatorHelper } from './navigator.helper';

const MODE_CACHE = 'VB_FILEMANAGER_MODE';

interface StateModel {
	refreshing: boolean;
	fileList: NFMItem[];
	history: NFMHistory[];
	template: TemplateMode;
}

@State<StateModel>({
	name: 'navigator',
	defaults: {
		refreshing: false,
		fileList: [],
		history: [],
		template: localStorage.getItem(MODE_CACHE) as TemplateMode || 'icons'
	}
})
export class NavigatorState {
	constructor(private store: Store) {}

	/********************** ACTIONS **********************/
	@Action(fromActions.StartRefreshing)
	startRefreshing(ctx: StateContext<StateModel>) {
		ctx.patchState({ refreshing: true });
	}

	@Action(fromActions.StopRefreshing)
	stopRefreshing(ctx: StateContext<StateModel>) {
		ctx.patchState({ refreshing: false });
	}

	@Action(fromActions.SetFileList)
	setFileList(ctx: StateContext<StateModel>, action: fromActions.SetFileList) {
		const state = ctx.getState();
		ctx.patchState({ fileList: action.files });

		const tree = NavigatorHelper.buildTree(
			action.basePath,
			action.files,
			[ ...state.history ],
			this.store.selectSnapshot(PathState.currentPath));

		return ctx.dispatch(new fromActions.SetHistory(tree));

	}

	@Action(fromActions.SetHistory)
	setHistory(ctx: StateContext<StateModel>, action: fromActions.SetHistory) {
		ctx.patchState({ history: action.history });
	}

	@Action(fromActions.SetTemplateMode)
	setTemplateMode(ctx: StateContext<StateModel>, action: fromActions.SetTemplateMode) {
		localStorage.setItem(MODE_CACHE, action.mode);
		ctx.patchState({ template: action.mode });
	}

	/********************** SELECTORS **********************/
	@Selector()
	static refreshing(state: StateModel) {
		return state.refreshing;
	}

	@Selector()
	static fileList(state: StateModel) {
		return state.fileList;
	}

	@Selector()
	static history(state: StateModel) {
		return state.history;
	}

	@Selector()
	static templateMode(state: StateModel) {
		return state.template;
	}
}
