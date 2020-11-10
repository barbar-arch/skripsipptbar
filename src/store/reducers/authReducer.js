import { LOGIN_SUCCESS, SET_DID_TRY_AL, LOGOUT } from '../actionTypes';

const initialState = {
  access_token: null,
  didTryAutoLogin: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const { access_token } = action.payload;
      return {
        ...state,
        access_token: access_token,
        didTryAutoLogin: true,
      };
    }

    case SET_DID_TRY_AL: {
      return {
        ...state,
        didTryAutoLogin: true,
      };
    }
    
    case LOGOUT: {
      return {
        ...state,
        access_token: null,
        didTryAutoLogin: true,
      };
    }

    default:
      return state;
  }
}

export default authReducer
