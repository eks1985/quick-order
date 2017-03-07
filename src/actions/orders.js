import { deleteOrderFirebase } from './orders-firebase';
import { addToCart } from './cart';
import { addCatalogQty } from './catalog-qty';
import { dayEnd, dayStart, dayBefore, monthEnd, monthStart, monthBefore } from './../utils/date-time';
import { setQtyPagesOrders, detectIsLastPage } from './orders-navigation'
export { setQtyPagesOrders, detectIsLastPage, moveOrdersForward, moveOrdersBack, goToOrdersPage } from './orders-navigation';
// export

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
      let filterByText = false;
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
      if (filters.text) {
        filterByText = true;
      }
      // filter by status and date
      result = Object.keys(headers).reduce((res, key) => {
        let filterMatch = true;
        // filter by status
        if (filterByStatus) {
          filterMatch = headers[key].status === filters.status ? filterMatch : false;
        }
        // filter by date
        if (filterByDate) {
          const orderDate = new Date(headers[key].date);
          filterMatch = orderDate >= dateStart && orderDate <= dateEnd ? filterMatch : false;
        }
        // filter by text (nr, comment, ref)
        if (filterByText) {
          filterMatch = headers[key].nr.includes(filters.text) || headers[key].comment.includes(filters.text) || headers[key].ref.includes(filters.text);
        }

        return filterMatch ? { ...res, [key]: headers[key] } : res;
      }, {});


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
