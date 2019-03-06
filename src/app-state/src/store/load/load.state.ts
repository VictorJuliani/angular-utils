import { State, Action, StateContext, Selector } from '@ngxs/store';
import * as fromActions from './load.action';

interface StateModel {
	loading: boolean;
}

@State<StateModel>({
	name: 'load',
	defaults: {
		loading: false
	}
})
export class LoadState {
	/********************** ACTIONS **********************/
	@Action(fromActions.SetLoading)
	setLoading(ctx: StateContext<StateModel>, action: fromActions.SetLoading) {
		ctx.setState({ loading: action.loading });
	}

	/********************** SELECTORS **********************/
	@Selector()
	static loading(state: StateModel) {
		return state.loading;
	}
}
