import { cleanObj } from '../../core/ppt';
import { NOTIFIKASI_START } from '../actionTypes';
import { INITIAL_STATE_LOCAL } from '../constants';

export const actNotifikasi = (value = {}, onDataChange) => {
  return async (dispatch, getState, agent) => {
    onDataChange({
      ...INITIAL_STATE_LOCAL,
      data: [],
      loading: true,
    });
    return await agent.Api.notifikasi()
      .query(cleanObj(value))
      .then((response) => {
        response = response.body || {};
        onDataChange({
          ...INITIAL_STATE_LOCAL,
          ...response,
          loading: false,
          data: response?.data || [],
          refreshing: false,
        });
      })
      .catch((error) => {
        error =
          error && error.response && error.response.body
            ? error.response.body
            : null;
        onDataChange({
          ...INITIAL_STATE_LOCAL,
          loading: false,
          errors: error,
          refreshing: false,
        });
      });
  };
};

export const actGetNotif = (data) => ({
  type: NOTIFIKASI_START,
  payload: {
    data: data
  }
});
