import { State, Action, StateContext, Selector } from '@ngxs/store';
import * as fromActions from './window.action';

interface StateModel {
	size: number;
}

@State<StateModel>({
	name: 'size',
	defaults: {
		size: window.innerWidth
	}
})
export class WindowState {
	/********************** SELECTORS **********************/
	@Selector()
	static size(state: StateModel) {
		return state.size;
	}

	@Selector()
	static isSmallScreen(state: StateModel) {
		return state.size < 768;
	}

	/********************** ACTIONS **********************/
	@Action(fromActions.SetSize)
	setSize(ctx: StateContext<StateModel>, action: fromActions.SetSize) {
		ctx.setState({ size: action.size });
	}
}
