import { database } from '../firebase/firebase-app';

import { setQtyPagesOrders } from './orders';

const receiveHeaders = (dispatch, data) => {
  return new Promise(resolve => {
    dispatch({
      type: 'RECEIVE_ORDERS_HEADERS',
      payload: data
    });
    resolve();
  });  
};

export const listenToOrdersHeaders = () => {
	return (dispatch, getState) => {
	  try {
      const customerGuid = getState().customer.guid;
      if (customerGuid) {
        const ordersRef = database.ref('orders/headers/' + customerGuid);
        ordersRef.off();
        return ordersRef.once('value', snapshot => {
          receiveHeaders(dispatch, snapshot.val()).then(
            () => {
              dispatch(setQtyPagesOrders());
              // Promise.resolve();
            }  
          );
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
	  } catch (e) {}
	};
};

export const listenToOrdersItems= () => {
	return (dispatch, getState) => {
	  try {
      const customerGuid = getState().customer.guid;
      if (customerGuid) {
        const goodsGroupsRef = database.ref('orders/items/' + customerGuid);
        goodsGroupsRef.off();
        return goodsGroupsRef.once('value', snapshot => {
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
	  } catch (e) {}
	};
};
