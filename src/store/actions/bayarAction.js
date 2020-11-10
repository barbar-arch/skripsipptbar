import { cleanObj } from '../../core/ppt';
import { INITIAL_STATE_LOCAL } from '../constants';

export const actBayar = (value = {}, onDataChange) => {
  return async (dispatch, getState, agent) => {
    onDataChange({
      ...INITIAL_STATE_LOCAL,
      data: [],
      current_page: 0,
      per_page: 0,
      page_count: 0,
      total: 0,
      last_page: 0,
      loading: true,
    });
    return await agent.Api.bayar()
      .query(cleanObj(value))
      .then((response) => {
        response = response.body || null;
        onDataChange({
          ...INITIAL_STATE_LOCAL,
          ...response,
          loading: false,
          data: response.data || [],
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
          data: [],
          loading: false,
          errors: error,
          refreshing: false,
        });
      });
  };
};

export const actCreateVa = (value = {}, onDataChange) => {
  return async (dispatch, getState, agent) => {
    const userData = getState().auth || null;
    onDataChange({
      ...INITIAL_STATE_LOCAL,
      data: null,
      loading: true,
    });
    return await agent.Api.createVa()
      .send(cleanObj(value))
      .set('Authorization', `Bearer ${userData.access_token}`)
      .then((response) => {
        response = response.body || null;
        onDataChange({
          ...INITIAL_STATE_LOCAL,
          ...response,
          loading: false,
          errors: null,
          data: response.data || null,
        });
      })
      .catch((error) => {
        error =
          error && error.response && error.response.body
            ? error.response.body
            : null;
        onDataChange({
          ...INITIAL_STATE_LOCAL,
          data: null,
          loading: false,
          errors: error,
        });
      });
  };
};

export const actProssBayar = (value = {}, onDataChange) => {
  return async (dispatch, getState, agent) => {
    const userData = getState().auth || null;
    onDataChange({
      ...INITIAL_STATE_LOCAL,
      data: null,
      loading: true,
    });
    return await agent.Api.prosesBayar()
      .send(cleanObj(value))
      .set('Authorization', `Bearer ${userData.access_token}`)
      .then((response) => {
        response = response.body || null;
        onDataChange({
          ...INITIAL_STATE_LOCAL,
          ...response,
          loading: false,
          errors: null,
          data: response.data || null,
        });
      })
      .catch((error) => {
        error =
          error && error.response && error.response.body
            ? error.response.body
            : null;
        onDataChange({
          ...INITIAL_STATE_LOCAL,
          data: null,
          loading: false,
          errors: error,
        });
      });
  };
};

export const actHapusInv = (value = {}, onDataChange) => {
  return async (dispatch, getState, agent) => {
    const userData = getState().auth || null;
    onDataChange({
      ...INITIAL_STATE_LOCAL,
      data: null,
      loading: true,
    });
    return await agent.Api.hapusInv()
      .send(cleanObj(value))
      .set('Authorization', `Bearer ${userData.access_token}`)
      .then((response) => {
        response = response.body || null;
        onDataChange({
          ...INITIAL_STATE_LOCAL,
          ...response,
          loading: false,
          errors: null,
          data: response.data || null,
        });
      })
      .catch((error) => {
        error =
          error && error.response && error.response.body
            ? error.response.body
            : null;
        onDataChange({
          ...INITIAL_STATE_LOCAL,
          data: null,
          loading: false,
          errors: error,
        });
      });
  };
};
