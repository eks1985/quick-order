import { combineReducers } from 'redux';
//reducers
import auth from './auth';
import goods from './goods';
import customer from './customer';
import goodsGroups from './goods-groups';
import orders from './orders';
import currentContent from './current-content';
import modal from './../../lib/modal/reducers/modal';

const rootReducer = combineReducers({
	auth,
	goods,
	customer,
	goodsGroups,
	orders,
	modal,
	currentContent
});

export default rootReducer;
