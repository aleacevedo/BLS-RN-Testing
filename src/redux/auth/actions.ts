import { ApiOkResponse } from 'apisauce';
import { Dispatch } from 'react';
import { createTypes, completeTypes, withPostSuccess } from 'redux-recompose';
import { setApiHeaders, removeApiHeaders } from '@config/api';
import { CurrentUser, AuthData } from '@interfaces/authInterfaces';
import { Nullable } from '@interfaces/globalInterfaces';
import { Action, State } from '@interfaces/reduxInterfaces';
import { login, logout } from '@services/AuthService';

export const actions = createTypes(
  completeTypes({ primaryActions: ['LOGIN', 'LOGOUT'], ignoredActions: ['AUTH_INIT'] }),
  '@@AUTH'
);

const TARGETS = {
  CURRENT_USER: 'currentUser'
};

export const actionCreators = {
  init: () => (dispatch: Dispatch<Action<Nullable<CurrentUser>>>, getState: () => State) => {
    const { currentUser } = getState().auth;
    if (currentUser) setApiHeaders(currentUser.sessionToken);
    dispatch({
      type: actions.AUTH_INIT,
      target: TARGETS.CURRENT_USER,
      payload: currentUser
    });
  },
  login: (authData: AuthData) => ({
    type: actions.LOGIN,
    target: TARGETS.CURRENT_USER,
    service: login,
    payload: authData,
    injections: [
      withPostSuccess((_: any, response: ApiOkResponse<CurrentUser>) => {
        setApiHeaders(response.data?.sessionToken!);
      })
    ]
  }),
  logout: () => ({
    type: actions.LOGOUT,
    target: TARGETS.CURRENT_USER,
    service: logout,
    successSelector: () => null,
    injections: [
      withPostSuccess(() => {
        removeApiHeaders();
      })
    ]
  })};
