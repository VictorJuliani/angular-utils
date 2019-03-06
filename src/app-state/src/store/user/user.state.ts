import { State, Action, StateContext, Selector } from '@ngxs/store';
import * as fromActions from './user.action';
import { User, Role } from '../../models/user.model';

interface StateModel {
	user: User | undefined;
	roles: Role[];
}

@State<StateModel>({
	name: 'user',
	defaults: {
		user: undefined,
		roles: []
	}
})
export class UserState {
	/********************** ACTIONS **********************/
	@Action(fromActions.SetUser)
	setUser(ctx: StateContext<StateModel>, action: fromActions.SetUser) {
		ctx.patchState({ user: action.user });
	}

	@Action(fromActions.ClearUser)
	clearUser(ctx: StateContext<StateModel>, action: fromActions.ClearUser) {
		ctx.patchState({ user: undefined });
	}

	@Action(fromActions.SetRoles)
	setRoles(ctx: StateContext<StateModel>, action: fromActions.SetRoles) {
		ctx.patchState({ roles: action.roles });
	}

	/********************** SELECTORS **********************/
	@Selector()
	static user(state: StateModel) {
		return state.user;
	}

	@Selector()
	static roles(state: StateModel) {
		return state.roles;
	}
}
