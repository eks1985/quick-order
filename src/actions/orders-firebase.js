import { database } from '../firebase/firebase-app';

import { setQtyPagesOrders, filterOrders } from './orders';

const receiveHeaders = (dispatch, data) => {
  return new Promise(resolve => {
    // filter deleted orders
    const dataNoDeleted = Object.keys(data).reduce((res, key) => {
      return data[key].deleted ? res : { ...res, [key]: data[key]}
    }, {});
    dispatch({
      type: 'RECEIVE_ORDERS_HEADERS',
      payload: dataNoDeleted
    });
    dispatch(filterOrders());
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
        return ordersRef.on('value', snapshot => {
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
        return goodsGroupsRef.on('value', snapshot => {
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

export const deleteOrderFirebase = (id, customerGuid, permanent) => {
  return dispatch => {
    dispatch({
      type: 'DELETE_ORDER_FIREBASE'
    })
    const goodsGroupsRef = database.ref('orders/headers/' + customerGuid + '/' + id);
    if (permanent) {
      goodsGroupsRef.remove();
    } else {
      goodsGroupsRef.update({deleted: true});
    }
  }
}
