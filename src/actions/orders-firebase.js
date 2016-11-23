import { database } from '../firebase/firebase-app';

import { setQtyPagesOrders } from './orders';

export const listenToOrdersHeaders = () => {
	return (dispatch, getState) => {
    const customerGuid = getState().customer.guid;
    if (customerGuid) {
      const goodsGroupsRef = database.ref('orders/headers/' + customerGuid);
      goodsGroupsRef.off();
      goodsGroupsRef.on('value', snapshot => {
        dispatch({
          type: 'RECEIVE_ORDERS_HEADERS',
          payload: snapshot.val()
        });
        dispatch(setQtyPagesOrders());
      }, (error) => {
        dispatch({
          type: 'RECEIVE_ORDERS_HEADERS_ERROR',
          message: error.message
        });
      });
    } else {
      dispatch({
        type: 'RESET_ORDERS_HEADERS'
      });
    }
	};
};

export const listenToOrdersItems= () => {
	return (dispatch, getState) => {
    const customerGuid = getState().customer.guid;
    if (customerGuid) {
      const goodsGroupsRef = database.ref('orders/items/' + customerGuid);
      goodsGroupsRef.off();
      goodsGroupsRef.on('value', (snapshot) => {
        dispatch({
          type: 'RECEIVE_ORDERS_ITEMS',
          payload: snapshot.val()
        });
      }, (error) => {
        dispatch({
          type: 'RECEIVE_ORDERS_HEADERS_ERROR',
          message: error.message
        });
      });
    } else {
      dispatch({
        type: 'RESET_ORDERS_ITEMS'
      });
    }
	};
};
