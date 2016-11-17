export const setQtyPagesOrders = () => {
  return (dispatch, getState) => {
      const keysLength = Object.keys(getState().orders.items).length;
      const qtyPages = keysLength % 3 === 0 ? keysLength / 3  : Math.floor(keysLength / 3) + 1;
      dispatch({
        type: 'SET_QTY_PAGES_ORDERS',
        qtyPages: qtyPages || 1
      });
  };
};

export const detectIsLastPage = () => {
  return (dispatch, getState) => {
      const { qtyPages, pageNumber } = getState().orders;
      const payload = qtyPages === pageNumber;
      dispatch({
        type: 'SET_IS_LAST_PAGE_ORDERS',
        payload: payload
      });
  };
};

export const moveOrdersForward = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'INCREASE_PAGE_NUMBER_ORDERS'
    });
    dispatch(detectIsLastPage());
  };
};

export const moveOrdersBack = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'DECREASE_PAGE_NUMBER_ORDERS'
    });
    dispatch(detectIsLastPage());
  };
};

export const goToOrdersPage = (pageNumber) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_PAGE_NUMBER_ORDERS',
      pageNumber: pageNumber
    });
    dispatch(detectIsLastPage());
  };
};
