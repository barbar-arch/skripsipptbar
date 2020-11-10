import {
  DETAIL_PERMOHONAN_START,
  DETAIL_PERMOHONAN_SUCCESS,
  DETAIL_PERMOHONAN_FAIL,
} from '../actionTypes';

const initialState = {
  detail: null,
  loading: false,
  errors: null,
};

const permohonanReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETAIL_PERMOHONAN_START: {
      return {
        ...state,
        detail: null,
        loading: true,
        error: null,
      };
    }

    case DETAIL_PERMOHONAN_SUCCESS: {
      return {
        ...state,
        detail: action.payload.detail,
        loading: false,
      };
    }

    case DETAIL_PERMOHONAN_FAIL: {
      return {
        ...state,
        detail: null,
        loading: false,
        errors: 'error',
      };
    }

    default:
      return state;
  }
};

export default permohonanReducer;
