import { State, Action, StateContext, Selector } from '@ngxs/store';
import * as fromActions from './error.action';
import { RequestError } from '../../models/request-error.interface';

interface Pair<T> {
	key: string;
	value: T;
}

interface StateModel {
	listeners: Pair<number>[];
	errors: Pair<string | RequestError | undefined>[];
}

@State<StateModel>({
	name: 'errors',
	defaults: {
		listeners: [],
		errors: []
	}
})
export class ErrorState {
	/********************** ACTIONS **********************/
	@Action(fromActions.SetError)
	setError(ctx: StateContext<StateModel>, action: fromActions.SetError) {
		const state = ctx.getState().errors;
		ctx.patchState({
			errors: [
				...state.filter(e => e.key !== action.key),
				{ key: action.key, value: action.error }
			]
		});
	}

	@Action(fromActions.ClearError)
	clearError(ctx: StateContext<StateModel>, action: fromActions.ClearError) {
		const state = ctx.getState();
		ctx.setState({
			errors: state.errors.filter(e => e.key !== action.key),
			listeners: state.listeners.filter(e => e.key !== action.key)
		});
	}

	@Action(fromActions.ClearErrors)
	clearErrors(ctx: StateContext<StateModel>) {
		ctx.setState({ errors: [], listeners: [] });
	}

	@Action(fromActions.SetErrorListener)
	setListeners(ctx: StateContext<StateModel>, action: fromActions.SetErrorListener) {
		const state = ctx.getState().listeners;
		const newState = action.keys
			.filter(k => k !== 'root')
			.map(k => {
				const oldListener = state.find(s => s.key === k);
				return {
					key: k,
					value: oldListener ? oldListener.value + 1 : 1
				};
			})
			.concat(state.filter(s => !action.keys.includes(s.key)));

		ctx.patchState({ listeners: newState });
	}

	@Action(fromActions.DropErrorListener)
	dropListeners(ctx: StateContext<StateModel>, action: fromActions.DropErrorListener) {
		const state = ctx.getState().listeners;
		const newState = state
			.map(s => {
				if (action.keys.includes(s.key)) {
					return {
						key: s.key,
						value: s.value - 1
					};
				}

				return s;
			})
			.filter(s => s.value > 0);

		ctx.patchState({ listeners: newState });
	}

	/********************** SELECTORS **********************/
	@Selector()
	static errors(state: StateModel) {
		const filter = (selectors: string[] | 'root') => {
			let selector = state.errors;
			if ('root' === selectors) {
				selectors = [ selectors ];
			}

			if (selectors.length > 0) {
				selector = selector
					.filter(e => selectors.includes(e.key));
			}

			return selector.map(s => s.value);
		};

		return filter;
	}
}
