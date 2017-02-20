import { deleteOrderFirebase } from './orders-firebase';
import { addToCart } from './cart';
import { addCatalogQty } from './catalog-qty';
import { dayEnd, dayStart, dayBefore, monthEnd, monthStart, monthBefore } from './../utils/date-time';

export const setQtyPagesOrders = () => {
  return (dispatch, getState) => {
      const keysLength = Object.keys(getState().orders.headers).length;
      const ordersListHeight = getState().orders.listHeight;
      const rowsPerPage = ordersListHeight > 0 ? Math.floor(ordersListHeight / 42) : 10;
      const qtyPages = keysLength % rowsPerPage === 0 ? keysLength / rowsPerPage : Math.floor(keysLength / rowsPerPage) + 1;
      // const qtyPages = keysLength % 3 === 0 ? keysLength / 3  : Math.floor(keysLength / 3) + 1;
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

export const deleteOrder = id => {
  return (dispatch, getState) => {
    dispatch({
      type: 'FIREBASE_DELETE_ORDER'
    })
    dispatch(deleteOrderFirebase(id, getState().customer.guid, getState().options.permanentDeleteOrders));
  }
}

export const restoreOrder = id => {
  return (dispatch, getState) => {
    const state = getState();
    const items = state.orders.items[id];
    const prices = state.prices;
    const itemsKeys = Object.keys(items);
    itemsKeys.forEach(key => {
      dispatch(addToCart(key, items[key].qty, prices[key]));
      dispatch(addCatalogQty(key, items[key].qty));
    });
    dispatch({
      type: 'SET_CURRENT_CONTENT',
      contentName: 'checkout'
    })
    dispatch({
      type: 'SET_ID_CHECKOUT',
      id
    })
    dispatch({
      type: 'SET_COMMENT_CHECKOUT',
      comment: state.orders.headers[id].comment
    })
    dispatch({
      type: 'SET_REF_CHECKOUT',
      ref: state.orders.headers[id].ref
    })
  }
}

// filters

export const filterOrders = () => {
  return (dispatch, getState) => {
    const ordersState = getState().orders;
    const { filters, headers } = ordersState;
    let result;
    if (filters.status === 'Все' && filters.text === '' && filters.dateRange === 'Все') {
      result = headers;
    } else {
      let filterByStatus = false;
      let filterByDate = false;
      if (filters.status !== 'Все') {
        filterByStatus = true;
      }
      let dateStart, dateEnd;
      if (filters.dateRange !== 'Все') {
        filterByDate = true;
        let today = new Date();
        if (filters.dateRange === 'Сегодня') {
          dateStart = dayStart(today);
          dateEnd = dayEnd(today);
        } else if (filters.dateRange === 'Вчера') {
          dateStart = dayBefore(today);
          dateEnd = dayEnd(dayBefore(today));
        } else if (filters.dateRange === 'ЭтотМесяц') {
          dateStart = monthStart(today);
          dateEnd = monthEnd(today);
        } else if (filters.dateRange === 'ПрошлыйМесяц') {
          dateStart = monthStart(monthBefore(today));
          dateEnd = monthEnd(monthBefore(today));
        } else if (filters.dateRange === 'БолееРанние') {
          dateStart = new Date(1970, 1, 1);
          dateEnd = monthStart(monthBefore(today));
        }
      }
      result = Object.keys(headers).reduce((res, key) => {
        let filterMatch = true;
        if (filterByStatus) {
          filterMatch = headers[key].status === filters.status ? filterMatch : false;
        }
        if (filterByDate) {
          const orderDate = new Date(headers[key].date);
          filterMatch = orderDate >= dateStart && orderDate <= dateEnd ? filterMatch : false;
        }
        return filterMatch ? { ...res, [key]: headers[key] } : res;
      }, {})

    }
    dispatch({
      type: 'RECEIVE_ORDERS_HEADERS_FILTERED',
      payload: result
    })
  }
}

export const setOrdersListHeight = () => {
  return dispatch => {
    const height = document.getElementById('orderListContainer').getBoundingClientRect().height;
    dispatch({
      type: 'SET_ORDERS_LIST_HEIGHT',
      payload: height
    });
    dispatch(setQtyPagesOrders());
    dispatch(detectIsLastPage());
  }
}

export const setFiltersOrders = (status, dateRange, text) => {
  return dispatch => {
    dispatch({
      type: 'SET_ORDER_FILTER',
      payload: { status, dateRange, text}
    });
    dispatch(filterOrders());
  }
}

export const resetFiltersOrders = () => {
  return dispatch => {
    dispatch({
      type: 'SET_ORDER_FILTER',
      payload: {
                status: 'Все',
                dateRange: 'Все',
                dateStart: '',
                dateEnd: '',
                text: ''
               }
    });
    dispatch(filterOrders());
  }
}

export const setListCollapsedAll = () => {
  return (dispatch, getState) => {
    const listCollapsedAll = getState().orders.listCollapsedAll;
    dispatch({
      type: 'SET_LIST_COLLAPSED_ALL_ORDERS',
      payload: !listCollapsedAll
    })
  }
}
