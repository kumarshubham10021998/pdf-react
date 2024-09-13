import { createStore, combineReducers } from 'redux';
import { pdfReducer } from './reducers';

const rootReducer = combineReducers({
  pdf: pdfReducer,
});

const store = createStore(rootReducer);

export default store;
