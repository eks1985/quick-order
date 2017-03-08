import { filterByGroupGuids } from './goods-groups';
export { setQtyPagesGoods, detectIsLastPage,  moveGoodsForward, moveGoodsBack, goToGoodsPage, setRowsPerPage } from './goods-navigation';
export { setQtyPagesGoodsCheckout, detectIsLastPageCheckout,  moveGoodsForwardCheckout, moveGoodsBackCheckout, goToGoodsPageCheckout } from './goods-checkout-navigation';
import { setQtyPagesGoods, goToGoodsPage } from './goods-navigation';
import { filterByPropVal } from './indexes';
import { getObjectsByIds } from './../utils/index';

// Search index >

const generateCodesGuids = (goods, code) => {
  const goodsKeys = Object.keys(goods);
  return goodsKeys.reduce((res, key) => goods[key].code === code ? res.concat(key) : res, []);
};

export const generateCodes = () => {
  return (dispatch, getState) => {
    const goods = getState().goods.items;
    const goodsKeys = Object.keys(goods);
    const codesArr = goodsKeys.reduce((res, key) => {
      res.push(goods[key].code);
      return res;
    }, []);
    const codes =  codesArr.reduce((res, code) => {
      const guids = generateCodesGuids(goods, code);
      res[code.toLowerCase()] = guids;
      return res;
    }, {});
    dispatch({
      type: 'RECEIVE_CODES',
      payload: codes
    });
  };
};

const generateDescrGuids = (goods, descr) => {
  const goodsKeys = Object.keys(goods);
  return goodsKeys.reduce((res, key) => goods[key].description === descr ? res.concat(key) : res, []);
};

export const generateDescriptions = () => {
  return (dispatch, getState) => {
    const goods = getState().goods.items;
    const goodsKeys = Object.keys(goods);
    const descrArr = goodsKeys.reduce((res, key) => {
      res.push(goods[key].description);
      return res;
    }, []);
    const descriptions =  descrArr.reduce((res, descr) => {
      const guids = generateDescrGuids(goods, descr);
      res[descr.toLowerCase()] = guids;
      return res;
    }, {});
    dispatch({
      type: 'RECEIVE_DESCRIPTIONS',
      payload: descriptions
    });
  };
};

// Search index <

// Order index >

export const generateOrderIndexCodes = () => {
  return (dispatch, getState) => {
    const items = getState().goods.itemsInitial;
    const keys = Object.keys(items);
    const index = keys.map( key => items[key].code );
    dispatch({
      type: 'RECEIVE_GOODS_ORDER_INDEX_CODES',
      payload: index.sort()
    });
    dispatch({
      type: 'RECEIVE_GOODS_ORDER_INDEX_CODES_REVERSE',
      payload: [ ...index ].reverse()
    });
  };
};

export const generateOrderIndexDescriptions = () => {
  return (dispatch, getState) => {
    const items = getState().goods.itemsInitial;
    const keys = Object.keys(items);
    const index = keys.map( key => items[key].description );
    dispatch({
      type: 'RECEIVE_GOODS_ORDER_INDEX_DESCRIPTIONS',
      payload: index.sort()
    });
    dispatch({
      type: 'RECEIVE_GOODS_ORDER_INDEX_DESCRIPTIONS_REVERSE',
      payload: [ ...index ].reverse()
    });
  };
};

export const generateOrderIndexProp = (propName) => {
  return (dispatch, getState) => {
    const items = getState().goods.itemsInitial;
    const keys = Object.keys(items);
    const index = keys.map( key => items[key][propName] );
    dispatch({
      type: 'RECEIVE_GOODS_ORDER_INDEX_' + propName.toUpperCase(),
      payload: index.sort()
    });
    dispatch({
      type: 'RECEIVE_GOODS_ORDER_INDEX_' + propName.toUpperCase() + '_REVERSE',
      payload: [ ...index ].reverse()
    });
  };
};

// Order index <

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

export const searchByPropText = (words, index,  res) => {
  const indexKeys = Object.keys(index);
  return words.reduce( (res, word) => [ ...res, ...searchByPropWord(word.trim(), indexKeys, index, res) ], res);
};

export const search = () => {
  return (dispatch, getState) => {
    // search
    const state = getState().goods;
    const { codes, descriptions, itemsInitial, searchText,  } = state;
    let text = searchText.toLowerCase();
    let result = {};
    let resultKeys = [];
    if (text.trim() === '') {
      result = itemsInitial;
    } else {
      const words = text.split(' ');
      resultKeys = searchByPropText(words, codes, resultKeys);
      resultKeys = searchByPropText(words, descriptions, resultKeys);
      const columns = getState().options.catalogListColumns;
      const columnsKeys = Object.keys(columns).reduce((res, key) => columns[key][1] ? [ ...res, key ] : res , []);
      resultKeys = columnsKeys.reduce((res, key) => [ ...res, ...searchByPropText(words, getState()['__index__' + key].index, []) ], resultKeys);
      result = getObjectsByIds(resultKeys, itemsInitial);
    }
    // filter by category
    const goodsGroupsFiltersIds = getState().goodsGroups.filtersIds;
    if (goodsGroupsFiltersIds.length > 0) {
      result = filterByGroupGuids(goodsGroupsFiltersIds, result);
    }
    // filter by props val
    const filtersApplied = getState().filtersApplied;
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

export const setSearchText = (payload) => {
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

const buildListByOrderIndex = (orderIndex, items, index, columnKey) => {
  const itemsKeys = Object.keys(items);
  const itemsProps = itemsKeys.reduce((res, key) => items[key][columnKey] ? [ ...res, items[key][columnKey] ] : res, ['']);
  return orderIndex.reduce((res, key) => itemsProps.indexOf(key) > -1 ? { ...res, ...buildListByProp(index, key, items) } : res, {});
};

export const sortGoods = (columnKey, sortDirection = '') => {
  return (dispatch, getState) => {
    const directionAll = getState().sortDirection;
    const directionColumn = directionAll[columnKey];
    const directionColumnNew = sortDirection || (directionColumn  === 'forward' ? 'reverse': 'forward');
    const items = getState().goods.items;
    const index = (columnKey === 'code' || columnKey === 'description') ? getState().goods[columnKey + 's'] : getState()['__index__' + columnKey].index;
    let orderIndex;
    if (columnKey === 'code' || columnKey === 'description') {
      if (directionColumnNew === 'forward') {
        orderIndex = getState().goods[ columnKey + 'OrderIndex'];
      } else {
        orderIndex = getState().goods[ columnKey + 'OrderIndexReverse'];
      }
    } else {
      if (directionColumnNew === 'forward') {
        orderIndex = getState()['__index__' + columnKey].indexSort;
      } else {
        orderIndex = getState()['__index__' + columnKey].indexSortReverse;
      }
    }
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

const buildListByOrderIndexCheckout = (orderIndex, items, index, columnKey, goodsItems) => {
  const itemsKeys = Object.keys(items);
  const itemsProps = itemsKeys.reduce((res, key) => goodsItems[key][columnKey] ? [ ...res, goodsItems[key][columnKey] ] : res, ['']);
  return orderIndex.reduce((res, key) => itemsProps.indexOf(key) > -1 ? { ...res, ...buildListByProp(index, key, items) } : res, {});
};

export const sortGoodsCheckout = (columnKey, sortDirection = '') => {
  return (dispatch, getState) => {
    const directionAll = getState().sortDirectionCheckout;
    const directionColumn = directionAll[columnKey];
    const directionColumnNew = sortDirection || (directionColumn  === 'forward' ? 'reverse': 'forward');
    const items = getState().cart.itemsFiltered;
    const goodsItems = getState().goods.itemsInitial;
    const index = (columnKey === 'code' || columnKey === 'description') ? getState().goods[columnKey + 's'] : getState()['__index__' + columnKey].index;
    let orderIndex;
    if (columnKey === 'code' || columnKey === 'description') {
      if (directionColumnNew === 'forward') {
        orderIndex = getState().goods[ columnKey + 'OrderIndex'];
      } else {
        orderIndex = getState().goods[ columnKey + 'OrderIndexReverse'];
      }
    } else {
      if (directionColumnNew === 'forward') {
        orderIndex = getState()['__index__' + columnKey].indexSort;
      } else {
        orderIndex = getState()['__index__' + columnKey].indexSortReverse;
      }
    }
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
