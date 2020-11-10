import { cleanObj } from '../../core/ppt';
import { INITIAL_STATE_LOCAL } from '../constants';
import { DETAIL_PERMOHONAN_START, DETAIL_PERMOHONAN_SUCCESS, DETAIL_PERMOHONAN_FAIL } from '../actionTypes';

export const actPermohonan = (value = {}, onDataChange) => {
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
    return await agent.Api.permohonan()
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

export const actDetailPermohonanStart = () => ({
  type: DETAIL_PERMOHONAN_START,
});

export const actDetailPermohonanSuccess = (data) => ({
  type: DETAIL_PERMOHONAN_SUCCESS,
  payload: {
    detail: data
  }
});

export const actDetailPermohonanFail = () => ({
  type: DETAIL_PERMOHONAN_FAIL,
  payload: {
    errors: 'error'
  }
});

export const actDetailPermohonan = (value, onDataChange) => {
  return (dispatch, getState, agent) => {
    dispatch(actDetailPermohonanStart());
    onDataChange({
      ...INITIAL_STATE_LOCAL,
      data: null,
      loading: true,
    });
    return agent.Api.detailPermohonan(value)
      .then((response) => {
        response = response.body || null;
        const data = response.data || null;
        dispatch(actDetailPermohonanSuccess(data));
        onDataChange({
          ...INITIAL_STATE_LOCAL,
          data: data,
          loading: false,
        });
      })
      .catch((error) => {
        error =
          error && error.response && error.response.body
            ? error.response.body
            : null;
        dispatch(actDetailPermohonanFail());
        onDataChange({
          ...INITIAL_STATE_LOCAL,
          data: null,
          loading: false,
          errors: 'error',
        });
      });
  };
};

export const actBerkas = (value, onDataChange) => {
  return (dispatch, getState, agent) => {
    onDataChange({
      ...INITIAL_STATE_LOCAL,
      data: [],
      loading: true,
    });
    return agent.Api.berkas()
      .query({
        permohonan_id: value,
      })
      .then((response) => {
        response = response.body || null;
        onDataChange({
          ...INITIAL_STATE_LOCAL,
          data: response.data || [],
          loading: false,
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
          errors: 'error',
          refreshing: false,
        });
      });
  };
};

export const actValidasiPermohonan = (value = {}, onDataChange) => {
  return async (dispatch, getState, agent) => {
    onDataChange({
      ...INITIAL_STATE_LOCAL,
      data: null,
      loading: true,
    });
    return await agent.Api.validasiPermohonan()
      .send(cleanObj(value))
      .then((response) => {
        response = response.body || null;
        onDataChange({
          ...INITIAL_STATE_LOCAL,
          ...response,
          loading: false,
          data: response.data || null,
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

export const actUpdatePerhitunganPermohonan = (value = {}, onDataChange) => {
  return async (dispatch, getState, agent) => {
    onDataChange({
      ...INITIAL_STATE_LOCAL,
      data: null,
      loading: true,
    });
    return await agent.Api.updatePerhitungan()
      .send(cleanObj(value))
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

export const actHapusPermohonan = (value = {}, onDataChange) => {
  return async (dispatch, getState, agent) => {
    const userData = getState().auth || null;
    onDataChange({
      ...INITIAL_STATE_LOCAL,
      data: null,
      loading: true,
    });
    return await agent.Api.hapusPermohonan()
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
