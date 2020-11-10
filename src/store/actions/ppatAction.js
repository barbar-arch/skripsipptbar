import { INITIAL_STATE_LOCAL } from "../constants";
import { cleanObj } from '../../core/ppt';

export const actPpat = (value = {}, onDataChange) => {
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
    return await agent.Api.ppat()
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
