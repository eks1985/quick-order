import { combineReducers } from 'redux';
//reducers
import auth from './auth';
import goods from './goods';
import goodsGroups from './goods-groups';
import orders from './orders';

const rootReducer = combineReducers({
	auth,
	goods,
	goodsGroups,
	orders,
});

export default rootReducer;
