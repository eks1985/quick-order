import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
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
const store = createStoreWithMiddleware(rootReducer, initialState,
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;
