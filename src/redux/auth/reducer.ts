import { createReducer, completeReducer, completeState} from 'redux-recompose';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import { CurrentUser } from '@interfaces/authInterfaces';
import { Nullable } from '@interfaces/globalInterfaces';
import { Action, AuthState } from '@interfaces/reduxInterfaces';

import { actions } from './actions';

const stateDescription = {
  description: {
    currentUser: null
  },
  ignoredTargets: {
    initialLoading: true  }
};

export const initialState = completeState(stateDescription);

const reducerDescription = {
  primaryActions: [actions.LOGIN, actions.LOGOUT],
  override: {
    [actions.AUTH_INIT]: (state: ImmutableObject<AuthState>, action: Action<Nullable<CurrentUser>>) =>
      state.merge({ initialLoading: false, [action.target as string]: action.payload})
  }
};

export default createReducer(Immutable(initialState), completeReducer(reducerDescription));
