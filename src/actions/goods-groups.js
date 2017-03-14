
const searchByDescription = (goodsGroups, keys, text) => {
  return keys.reduce((result, key) => {
    return goodsGroups[key].toLocaleLowerCase().includes(text) ? { ...result, [key]: goodsGroups[key] } : result;
  }, {});
};

export const filterGoodsGroupsByText = (text) => {
  return (dispatch, getState) => {
    const goodsGroups = getState().goodsGroups.itemsInitial;
    const keys = Object.keys(goodsGroups);
    const lowerText = text.toLocaleLowerCase();
    const words = lowerText.split(' ');
    let result = words.reduce( (res, word) => {
      let r = searchByDescription(goodsGroups, keys, word.trim());
      return { ...result, ...r };
    }, {});
    dispatch({
      type: 'FILTER_GOODS_GROUPS',
      payload: result
    });
  };
};

export const addFilter = guid => {
  return (dispatch, getState) => {
    const filtersIds = getState().goodsGroups.filtersIds;
    if (!filtersIds.includes(guid)) {
      dispatch({
        type: 'ADD_GOODS_GROUPS_FILTER',
        guid
      })
    }
  }
};

export const removeFilter = guid => ({
  type: 'REMOVE_GOODS_GROUPS_FILTER',
  guid
});

export const resetFilters = () => ({
  type: 'RESET_GOODS_GROUPS_FILTERS'
});

export const setGoodsGroupsSelected = () => {
  return (dispatch, getState) => {
    const cartItems = getState().cart.items;
    const payload = Object.keys(cartItems).reduce((res, productKey) => {
      const currentGroupRef = cartItems[productKey].groupRef;
      if (res[currentGroupRef]) {
        return { ...res, [currentGroupRef]: res[currentGroupRef] + 1};
      } else {
        return { ...res, [currentGroupRef]: 1}
      }
    }, {});
    dispatch({
      type: 'SET_GOODS_GROUPS_SELECTED',
      payload
    })
  }
}

// Utils

const filterByGroupGuid = (groupGuid, items) => {
  const keys = Object.keys(items);
  return keys.reduce( (result, key) => {
    if (items[key].groupRef === groupGuid) {
      result[key] = { ...items[key] };
      return result;
    } else {
      return result;
    }
  }, {});
};

export const filterByGroupGuids = (groupGuids, items) => {
  if (groupGuids.length === 0) {
    return items;
  }
  return groupGuids.reduce((res, guid) => {
    return { ...res, ...filterByGroupGuid(guid, items) };
  }, {});
};
