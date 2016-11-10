export const setQtyPagesGoods = () => {
  return (dispatch, getState) => {
      const keysLength = Object.keys(getState().goods.items).length;
      dispatch({
        type: 'SET_QTY_PAGES_GOODS',
        qtyPages: keysLength % 10 === 0 ? keysLength / 10  : Math.floor(keysLength / 10) + 1
      });
  };
};

export const moveGoodsForward = () => {
  return (dispatch, getState) => {
    const { pageNumber, qtyPages } = getState().goods;
    if (pageNumber + 1 === qtyPages) {
      dispatch({
        type: 'SET_IS_LAST_PAGE_GOODS',
        payload: true
      });
    }
    dispatch({
      type: 'INCREASE_PAGE_NUMBER_GOODS'
    });
  }
}

export const moveGoodsBack = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_IS_LAST_PAGE_GOODS',
      payload: false
    });
    dispatch({
      type: 'DECREASE_PAGE_NUMBER_GOODS'
    });
  }
}

export const goToGoodsPage = (pageNumber) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_PAGE_NUMBER_GOODS',
      pageNumber: pageNumber
    });
    const qtyPages = getState().goods.qtyPages;
    if (pageNumber === qtyPages) {
      dispatch({
        type: 'SET_IS_LAST_PAGE_GOODS',
        payload: true
      });
    } else {
      dispatch({
        type: 'SET_IS_LAST_PAGE_GOODS',
        payload: false
      });
    }
  }
}
