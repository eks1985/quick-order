export const setQtyPagesOrders = () => {
  return (dispatch, getState) => {
      const keysLength = Object.keys(getState().orders.headers).length;
      const ordersListHeight = getState().orders.listHeight;
      const rowsPerPage = ordersListHeight > 0 ? Math.floor(ordersListHeight / 42) : 10;
      const qtyPages = keysLength % rowsPerPage === 0 ? keysLength / rowsPerPage : Math.floor(keysLength / rowsPerPage) + 1;
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
