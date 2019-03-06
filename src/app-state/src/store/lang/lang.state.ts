import { State, Action, StateContext, Selector } from '@ngxs/store';
import * as fromActions from './lang.action';

interface StateModel {
	lang: string;
}

@State<StateModel>({
	name: 'lang',
	defaults: {
		lang: 'en'
	}
})
export class LangState {
	/********************** ACTIONS **********************/
	@Action(fromActions.SetLang)
	setLang(ctx: StateContext<StateModel>, action: fromActions.SetLang) {
		ctx.setState({ lang: action.lang });
	}

	/********************** SELECTORS **********************/
	@Selector()
	static lang(state: StateModel) {
		return state.lang;
	}
}
