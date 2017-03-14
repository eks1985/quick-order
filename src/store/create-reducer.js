import { combineReducers } from 'redux';

import auth from './reducers/auth';
import goods from './reducers/goods';
import customer from './reducers/customer';
import goodsGroups from './reducers/goods-groups';
import orders from './reducers/orders';
import cart from './reducers/cart';
import checkout from './reducers/checkout';
import prices from './reducers/prices';
import quickList from './reducers/quick-list';
import catalogQty from './reducers/catalog-qty';
import options from './reducers/options';
import users from './reducers/users';
import customers from './reducers/customers';
import filtersApplied from './reducers/filters-applied';
import filtersAppliedCheckout from './reducers/filters-applied-checkout';
import current from './reducers/current';
import currentCheckout from './reducers/current-checkout';
import ui from './reducers/ui';
import goodsGroupsSelected from './reducers/goods-groups-selected';
import modal from './../lib/modal/reducers/modal';

export default function createReducer(indexes) {
  return combineReducers({
  	auth,
    users,
    customers,
    customer,
  	options,
    goods,
  	goodsGroups,
    prices,
  	orders,
    cart,
    catalogQty,
    checkout,
    quickList,
  	modal,
    //ui
    goodsGroupsSelected,
    filtersApplied,
    filtersAppliedCheckout,
    current,
    currentCheckout,
    ui,
    ...indexes
  });
}
