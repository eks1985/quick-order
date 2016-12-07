import { setQtyPagesGoods, goToGoodsPage, search } from './goods';

export const filterGoodsByGroup = (groupGuid) => {
  return (dispatch, getState) => {
    const searchText = getState().goods.seatchText;
    let items;
    if (searchText) {
      search(searchText);
      items = getState().goods.items;
    } else {
      items = getState().goods.itemsInitial;
    }
    dispatch({
      type: 'SET_GOODS_LIST',
      filterData: {filterType: 'goodsGroup', groupGuid, itemsInitial: items}
    });
    dispatch(setQtyPagesGoods());
    dispatch(goToGoodsPage(1));
  };
};

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

export const addFilter = guid => ({
  type: 'ADD_GOODS_GROUPS_FILTER',
  guid
});

export const removeFilter = guid => ({
  type: 'REMOVE_GOODS_GROUPS_FILTER',
  guid
});

export const resetFilters = () => ({
  type: 'RESET_GOODS_GROUPS_FILTERS'
});
