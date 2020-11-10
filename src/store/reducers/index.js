import { combineReducers } from 'redux';
import authReducer from './authReducer';
import permohonanReducer from './permohonanReducer';
import notifikasiReducer from './notifikasiReducer';

const rootReducers = combineReducers({
  auth: authReducer,
  permohonan: permohonanReducer,
  notifikasi: notifikasiReducer,
});

export default rootReducers;
