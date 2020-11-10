import { cleanObj } from "../../core/ppt";
import { INITIAL_STATE_LOCAL } from "../constants";

export const actCheckBerkas = (value, onDataChange) => {
  return async (dispatch, getState, agent) => {
    const userData = getState().auth || null;
    onDataChange({
      ...INITIAL_STATE_LOCAL,
      data: null,
      loading: true,
    });
    return await agent.Api.checkBerkas(value)
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

export const actVerifBerkas = (value, onDataChange) => {
  return async (dispatch, getState, agent) => {
    const userData = getState().auth || null;
    onDataChange({
      ...INITIAL_STATE_LOCAL,
      data: null,
      loading: true,
    });
    return await agent.Api.verifBerkas()
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

