import { State, Action, StateContext, Selector } from '@ngxs/store';
import * as fromActions from './path.action';

interface StateModel {
	currentPath: string[];
}

@State<StateModel>({
	name: 'path',
	defaults: {
		currentPath: []
	}
})
export class PathState {
	/********************** ACTIONS **********************/
	@Action(fromActions.SetCurrentPath)
	setCurrentPath(ctx: StateContext<StateModel>, action: fromActions.SetCurrentPath) {
		ctx.setState({ currentPath: action.path });
	}

	@Action(fromActions.PathUpDir)
	upDir(ctx: StateContext<StateModel>) {
		const state = ctx.getState().currentPath;
		ctx.setState({ currentPath: state.slice(0, -1) });
	}

	@Action(fromActions.PathGoTo)
	goTo(ctx: StateContext<StateModel>, action: fromActions.PathGoTo) {
		const state = ctx.getState().currentPath;
		ctx.setState({ currentPath: state.slice(0, action.index + 1) });
	}

	/********************** SELECTORS **********************/
	@Selector()
	static currentPath(state: StateModel) {
		return state.currentPath;
	}

	@Selector()
	static stringPath(state: StateModel) {
		return state.currentPath.join('/') + '/';
	}
}
