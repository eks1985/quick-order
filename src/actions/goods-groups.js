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
