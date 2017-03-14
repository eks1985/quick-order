import { filterByGroupGuids } from './goods-groups';
export { setQtyPagesGoods, detectIsLastPage,  moveGoodsForward, moveGoodsBack, goToGoodsPage, setRowsPerPage } from './goods-navigation';
export { setQtyPagesGoodsCheckout, detectIsLastPageCheckout,  moveGoodsForwardCheckout, moveGoodsBackCheckout, goToGoodsPageCheckout } from './goods-checkout-navigation';
import { setQtyPagesGoods, goToGoodsPage } from './goods-navigation';
import { filterByPropVal } from './indexes';
import { getObjectsByIds } from './../utils/index';

// ui

export const setCurentGuid = (guid, callContext = '') => {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_CURRENT_GOODS_GUID',
      payload: guid,
      callContext
    }) ;
  }
};

// Search >

const searchByPropWord = (word, indexKeys, index, res) => {
  return indexKeys.reduce((res, key) => key.includes(word) ? [ ...res, ...index[key] ] : res, res);
};

export const searchByPropText = (words, index, res) => {
  const indexKeys = Object.keys(index);
  return words.reduce( (res, word) => [ ...res, ...searchByPropWord(word.trim(), indexKeys, index, res) ], res);
};

export const search = () => {
  return (dispatch, getState) => {
    // search
    const {
      goods: { itemsInitial, searchText },
      __index__code: { index: codes },
      __index__description: { index: descriptions },
      options: { catalogListColumns: columns },
      goodsGroups: { filtersIds: goodsGroupsFiltersIds},
      filtersApplied
    } = getState();
    const text = searchText.toLowerCase().trim();
    const words = text.split(' ');
    let result = {};
    let resultKeys = [];
    // filter by search field
    if (!text) {
      result = itemsInitial;
    } else {
      // filter codes and description fiels
      resultKeys = searchByPropText(words, codes, resultKeys);
      resultKeys = searchByPropText(words, descriptions, resultKeys);
      // filter all addition fields for which filter option is included
      const columnsKeys = Object.keys(columns).reduce((res, key) => columns[key][1] ? [ ...res, key ] : res , []);
      resultKeys = columnsKeys.reduce((res, key) => [ ...res, ...searchByPropText(words, getState()['__index__' + key].index, []) ], resultKeys);
      result = getObjectsByIds(resultKeys, itemsInitial);
    }
    // filter by category
    if (goodsGroupsFiltersIds.length > 0) {
      result = filterByGroupGuids(goodsGroupsFiltersIds, result);
    }
    // filter by props val
    const filtersAppliedKeys = Object.keys(filtersApplied);
    if (filtersAppliedKeys.length > 0) {
      result = filtersAppliedKeys.reduce((result, propName) => filterByPropVal(getState, propName, filtersApplied[propName], result) , result);
    }
    dispatch({
      type: 'SET_GOODS_LIST',
      payload: result,
    });
    dispatch(setQtyPagesGoods());
    dispatch(goToGoodsPage(1));
    dispatch({
      type: 'SET_FOCUSED',
      payload: ''
    });
  };
};

export const setSearchText = payload => {
  return dispatch => {
    dispatch({
      type: 'SET_SEARCH_TEXT',
      payload
    });
    dispatch(search());
  };
};

// Search <

// Sort >

const buildListByProp = (index, prop, items) => {
  const keys = index[prop.toLowerCase()];
  return keys.reduce((res, key) => items[key] ? { ...res, [key]: items[key] } : res, {});
};

// goods
const buildListByOrderIndex = (orderIndex, items, index, columnKey) => {
  const itemsKeys = Object.keys(items);
  const itemsProps = itemsKeys.reduce((res, key) => items[key][columnKey] ? [ ...res, items[key][columnKey] ] : res, ['']);
  return orderIndex.reduce((res, key) => itemsProps.indexOf(key) > -1 ? { ...res, ...buildListByProp(index, key, items) } : res, {});
};

export const sortGoods = (columnKey, sortDirection = '') => {
  return (dispatch, getState) => {
    const state = getState();
    const directionAll = state.ui.sortDirection;
    const directionColumn = directionAll[columnKey];
    const directionColumnNew = sortDirection || (directionColumn  === 'forward' ? 'reverse': 'forward');
    const items = state.goods.items;
    const index = state['__index__' + columnKey].index;
    const orderIndex = directionColumnNew === 'forward' ? state['__index__' + columnKey].indexSort : state['__index__' + columnKey].indexSortReverse;
    const directionAllKeys = Object.keys(directionAll);
    const directionAllNew = directionAllKeys.reduce((res, key) => ({ ...res, [key]: ''}), {});
    directionAllNew[columnKey] = directionColumnNew;
    dispatch({
      type: 'RECEIVE_SORT_DIRECTION',
      payload: directionAllNew
    });
    dispatch({
      type: 'SET_GOODS_LIST',
      payload: buildListByOrderIndex(orderIndex, items, index, columnKey)
    });
  };
};

// checkout
const buildListByOrderIndexCheckout = (orderIndex, items, index, columnKey, goodsItems) => {
  const itemsKeys = Object.keys(items);
  const itemsProps = itemsKeys.reduce((res, key) => goodsItems[key][columnKey] ? [ ...res, goodsItems[key][columnKey] ] : res, ['']);
  return orderIndex.reduce((res, key) => itemsProps.indexOf(key) > -1 ? { ...res, ...buildListByProp(index, key, items) } : res, {});
};

export const sortGoodsCheckout = (columnKey, sortDirection = '') => {
  return (dispatch, getState) => {
    const directionAll = getState().ui.sortDirectionCheckout;
    const directionColumn = directionAll[columnKey];
    const directionColumnNew = sortDirection || (directionColumn  === 'forward' ? 'reverse': 'forward');
    const items = getState().cart.itemsFiltered;
    const goodsItems = getState().goods.itemsInitial;
    const index = getState()['__index__' + columnKey].index;
    const orderIndex = directionColumnNew === 'forward' ? getState()['__index__' + columnKey].indexSort : getState()['__index__' + columnKey].indexSortReverse;
    const directionAllKeys = Object.keys(directionAll);
    const directionAllNew = directionAllKeys.reduce((res, key) => ({ ...res, [key]: ''}), {});
    directionAllNew[columnKey] = directionColumnNew;
    dispatch({
      type: 'RECEIVE_SORT_DIRECTION_CHECKOUT',
      payload: directionAllNew
    });
    dispatch({
      type: 'RECEIVE_CART_ITEMS_FILTETED',
      payload: buildListByOrderIndexCheckout(orderIndex, items, index, columnKey, goodsItems)
    });
  };
};

// Sort <

// Filter by prop >

export const applyGoodsFilterByProp = (keys, propName) => {
  return dispatch => {
    dispatch({
      type: 'APPLY_FILTER_BY_PROP',
      keys,
      propName
    });
  };
};

export const clearGoodsFilterByProp = propName => {
  return dispatch => {
    dispatch({
      type: 'CLEAR_FILTER_BY_PROP',
      propName
    });
  };
};

export const applyGoodsFilterByPropCheckout = (keys, propName) => {
  return dispatch => {
    dispatch({
      type: 'APPLY_FILTER_BY_PROP_CHECKOUT',
      keys,
      propName
    });
  };
};

export const clearGoodsFilterByPropCheckout = propName => {
  return dispatch => {
    dispatch({
      type: 'CLEAR_FILTER_BY_PROP_CHECKOUT',
      propName
    });
  };
};

// Filter by prop >
