import { NOTIFIKASI_START } from '../actionTypes';

const initialState = {
  data: [],
};

const notifikasiReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFIKASI_START: {
      const { data } = action.payload;
      const dataObej = [];
      for (let key in data) {
        dataObej.push({ ...data[key], uuid: key });
      }
      return {
        ...state,
        data: [...dataObej],
      };
    }

    default:
      return state;
  }
};

export default notifikasiReducer;
