export const setQtyPagesGoods = () => {
  return (dispatch, getState) => {
      const keysLength = Object.keys(getState().goods.items).length;
      const rowsPerPage = getState().goods.rowsPerPage || 10;
      const qtyPages = keysLength % rowsPerPage === 0 ? keysLength / rowsPerPage  : Math.floor(keysLength / rowsPerPage) + 1;
      // const qtyPages = keysLength % 10 === 0 ? keysLength / 10  : Math.floor(keysLength / 10) + 1;
      dispatch({
        type: 'SET_QTY_PAGES_GOODS',
        qtyPages: qtyPages || 1
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
    const isLastPage = getState().goods.isLastPage;
    if (!isLastPage) {
      dispatch({
        type: 'INCREASE_PAGE_NUMBER_GOODS'
      });
      dispatch(detectIsLastPage());
    }
  };
};

export const moveGoodsBack = () => {
  return (dispatch, getState) => {
    const isFirstPage = getState().goods.pageNumber === 1;
    if (!isFirstPage) {
      dispatch({
        type: 'DECREASE_PAGE_NUMBER_GOODS'
      });
      dispatch(detectIsLastPage());
    }
  };
};

export const goToGoodsPage = pageNumber => {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_PAGE_NUMBER_GOODS',
      pageNumber: pageNumber
    });
    dispatch(detectIsLastPage());
  };
};
