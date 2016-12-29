import { applyMiddleware, createStore } from 'redux';
import createReducer from './create-reducer';
//middlewares
import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';

const middlewares = [thunk];

// if (process.env.NODE_ENV === 'development') {
// 	const logger = createLogger();
// 	middlewares.push(logger);
// }

const initialState = {};

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const store = createStoreWithMiddleware(createReducer(), initialState,
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.indexes = {};
export default store;

export function injectReducer(store, name, newReducer) {
  store.indexes['__index__' + name] = newReducer;
  store.replaceReducer(createReducer(store.indexes));
}
