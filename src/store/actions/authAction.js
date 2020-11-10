import {
  LOGIN_SUCCESS,
  AUTHENTICATE,
  SET_DID_TRY_AL,
  LOGOUT
} from '../actionTypes';
import { INITIAL_STATE_LOCAL } from '../constants';
import { removeValue, storeObjData } from '../storage';

export const actSetDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const actAuthenticate = (data) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        ...data,
        access_token: data?.access_token,
      },
    });
    dispatch({
      type: AUTHENTICATE,
      payload: {
        ...data,
        access_token: data?.access_token,
      },
    });
  };
};

export const actLogin = (value, onChangeData) => {
  value = value || {};
  return (dispatch, getState, agent) => {
    onChangeData({
      ...INITIAL_STATE_LOCAL,
      loading: true,
    });
    return agent.Api.login()
      .send(value)
      .then((response) => {
        response = response.body || null;
        onChangeData({
          ...INITIAL_STATE_LOCAL,
          loading: false,
          data: response,
        });
        dispatch(actAuthenticate(response));
        storeObjData(response);
      })
      .catch((error) => {
        error =
          error && error.response && error.response.body
            ? error.response.body
            : null;
        onChangeData({
          ...INITIAL_STATE_LOCAL,
          loading: false,
          errors: error,
        });
      });
  };
};

export const actLogout = () => {
  removeValue()
  return {
    type: LOGOUT,
  }
}
