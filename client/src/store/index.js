import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import productsReducer from '../reducers/productsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;