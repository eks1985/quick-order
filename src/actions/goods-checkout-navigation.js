export const setQtyPagesGoodsCheckout = () => {
  return (dispatch, getState) => {
      const keysLength = Object.keys(getState().cart.items).length;
      const rowsPerPage = getState().goods.rowsPerPage || 10;
      const qtyPages = keysLength % rowsPerPage === 0 ? keysLength / rowsPerPage  : Math.floor(keysLength / rowsPerPage) + 1;
      dispatch({
        type: 'SET_QTY_PAGES_GOODS_CHECKOUT',
        qtyPages: qtyPages || 1
      });
  };
};

export const detectIsLastPageCheckout = () => {
  return (dispatch, getState) => {
      const { qtyPagesCheckout, pageNumberCheckout } = getState().goods;
      const payload = qtyPagesCheckout === pageNumberCheckout;
      dispatch({
        type: 'SET_IS_LAST_PAGE_GOODS_CHECKOUT',
        payload
      });
  };
};

export const moveGoodsForwardCheckout = () => {
  return (dispatch, getState) => {
    const isLastPage = getState().goods.isLastPageCheckout;
    if (!isLastPage) {
      dispatch({
        type: 'INCREASE_PAGE_NUMBER_GOODS_CHECKOUT'
      });
      dispatch(detectIsLastPageCheckout());
    }
  };
};

export const moveGoodsBackCheckout = () => {
  return (dispatch, getState) => {
    const isFirstPage = getState().goods.pageNumberCheckout === 1;
    if (!isFirstPage) {
      dispatch({
        type: 'DECREASE_PAGE_NUMBER_GOODS_CHECKOUT'
      });
      dispatch(detectIsLastPageCheckout());
    }
  };
};

export const goToGoodsPageCheckout = pageNumber => {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_PAGE_NUMBER_GOODS_CHECKOUT',
      pageNumber
    });
    dispatch(detectIsLastPageCheckout());
  };
};
