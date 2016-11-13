export const setCurentGuid = (guid) => {
  return {
    type: 'SET_CURRENT_GOODS_GUID',
    payload: guid
  };
};

export const setQtyPagesGoods = () => {
  return (dispatch, getState) => {
      const keysLength = Object.keys(getState().goods.items).length;
      dispatch({
        type: 'SET_QTY_PAGES_GOODS',
        qtyPages: keysLength % 10 === 0 ? keysLength / 10  : Math.floor(keysLength / 10) + 1
      });
  };
};

export const detectIsLastPage = () => {
  return (dispatch, getState) => {
      const { qtyPages, pageNumber } = getState().goods;
      const payload = qtyPages === pageNumber;
      dispatch({
        type: 'SET_IS_LAST_PAGE_GOODS',
        payload: payload
      });
  };
};

export const moveGoodsForward = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'INCREASE_PAGE_NUMBER_GOODS'
    });
    dispatch(detectIsLastPage());
  };
};

export const moveGoodsBack = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'DECREASE_PAGE_NUMBER_GOODS'
    });
    dispatch(detectIsLastPage());
  };
};

export const goToGoodsPage = (pageNumber) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_PAGE_NUMBER_GOODS',
      pageNumber: pageNumber
    });
    dispatch(detectIsLastPage());
  };
};
