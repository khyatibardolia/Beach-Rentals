import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { AppReducer } from './appReducer';
import { CreateBooking } from './create-booking';

export const reducers = combineReducers({
  form: FormReducer,
  AppReducer: AppReducer,
  CreateBooking: CreateBooking
});
