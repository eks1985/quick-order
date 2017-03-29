
const generateGuids = (propName, items, keys, val) => {
  return keys.reduce((res, key) => (items[key][propName] === val) || (items[key][propName] === undefined && val === '') ? res.concat(key) : res, []);
};

const generateIndexex = (propName, items, keys) => {
  const indexSort = keys.reduce((res, key) => {
    const val = items[key][propName];
    if (val && !res.includes(val)) {
      res.push(items[key][propName]);
    }
    return res;
  }, ['']);
  const index =  indexSort.reduce((res, val) => {
    const guids = generateGuids(propName, items, keys, val);
    try {
      res[val.toLowerCase()] = guids;
    } catch (e) {
      console.log('val', val);  
    }
    return res;
  }, {});
  return { index, indexSort: indexSort.sort() };
};

export const buildIndex = propName => {
  return (dispatch, getState) => {
    const items = getState().goods.itemsInitial;
    const keys = Object.keys(items);
    const { index, indexSort } = generateIndexex(propName, items, keys);
    const indexSortReverse = [ ...indexSort].reverse();
    dispatch({
      type: 'RECEIVE_INDEX_' + propName.toUpperCase(),
      payload: index
    });

    dispatch({
      type: 'RECEIVE_INDEX_SORT_' + propName.toUpperCase(),
      payload: indexSort
    });

    dispatch({
      type: 'RECEIVE_INDEX_SORT_REVERSE_' + propName.toUpperCase(),
      payload: indexSortReverse
    });

  };
};

// Utils

export const getIndexByColName = (state, columnName) => {
  try {
    return columnName ? state['__index__' + columnName].indexSort : undefined;
  } catch (e) {
    return undefined;
  }
};

export const getFilterStatusByColName = (state, columnName ) => {
  try {
    return columnName ? state['__index__' + columnName].indexFilterStatus : undefined;
  } catch (e) {
    return undefined;
  }
};

export const getFilterItemsByColName = (state, columnName ) => {
  try {
    return columnName ? state['__index__' + columnName].indexFilterItems : undefined;
  } catch (e) {
    return undefined;
  }
};

export const filterByPropVal = (getState, propName, propValues, items) => {
  if (!propValues) {
    return items;
  }
  return Object.keys(items).reduce((res, itemKey) => {
    return propValues.includes(items[itemKey][propName]) || ( propValues.includes("") && (items[itemKey][propName] === undefined) ) ? { ...res, [itemKey]: items[itemKey] } : res
  }, {});
}

export const filterByPropValCheckout = (goodsItems, propName, propValues, cartItems) => {
  if (!propValues) {
    return cartItems;
  }
  return Object.keys(cartItems).reduce((res, itemKey) => {
    return propValues.includes(goodsItems[itemKey][propName]) || ( propValues.includes("") && (goodsItems[itemKey][propName] === undefined) ) ? { ...res, [itemKey]: goodsItems[itemKey] } : res
  }, {});
}
