import { cleanObj } from '../../core/ppt';
import { INITIAL_STATE_LOCAL } from '../constants';

export const actPenetapan = (value = {}, onDataChange) => {
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
    return await agent.Api.penetapan()
      .query(cleanObj(value))
      .then((response) => {
        response = response.body || null;
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
          data: [],
          loading: false,
          errors: error,
          refreshing: false,
        });
      });
  };
};

export const actDetailPenetapan = (value, onDataChange) => {
  return (dispatch, getState, agent) => {
    onDataChange({
      ...INITIAL_STATE_LOCAL,
      data: null,
      loading: true,
    });
    return agent.Api.detailPenetapan(value)
      .then((response) => {
        response = response.body || null;
        onDataChange({
          ...INITIAL_STATE_LOCAL,
          data: response.data,
          loading: false,
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
          errors: 'error',
        });
      });
  };
};

export const actSimpanPenetapan = (value = {}, onDataChange) => {
  return async (dispatch, getState, agent) => {
    const userData = getState().auth || null;
    onDataChange({
      ...INITIAL_STATE_LOCAL,
      data: null,
      loading: true,
    });
    return await agent.Api.simpanPenetapan()
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

export const actProsesPenetapan = (value = {}, onDataChange) => {
  return async (dispatch, getState, agent) => {
    const userData = getState().auth || null;
    onDataChange({
      ...INITIAL_STATE_LOCAL,
      data: null,
      loading: true,
    });
    return await agent.Api.prosesPenetapan()
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

export const actHapusPenetapan = (value = {}, onDataChange) => {
  return async (dispatch, getState, agent) => {
    const userData = getState().auth || null;
    onDataChange({
      ...INITIAL_STATE_LOCAL,
      data: null,
      loading: true,
    });
    return await agent.Api.hapusPenetapan()
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
