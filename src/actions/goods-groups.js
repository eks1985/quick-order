import { setQtyPagesGoods, goToGoodsPage } from './goods';

export const filterGoodsByGroup = (groupGuid) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_GOODS_LIST',
      filterData: {filterType: 'goodsGroup', groupGuid, itemsInitial: getState().goods.itemsInitial}
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

export const filterGoodsGroups = (text) => {
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