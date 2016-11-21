import { database } from '../firebase/firebase-app';

export const listenToOrdersHeaders = () => {
	return (getState, dispatch) => {
    const customerGuid = getState().customer.guid;
    if (customerGuid) {
      const goodsGroupsRef = database.ref('orders/heders/' + customerGuid);
      goodsGroupsRef.off();
      goodsGroupsRef.on('value', (snapshot) => {
        dispatch({
          type: 'RECEIVE_ORDERS_HEADERS',
          payload: snapshot.val()
        });
      }, (error) => {
        dispatch({
          type: 'RECEIVE_ORDERS_HEADERS_ERROR',
          message: error.message
        });
      });
    }
	};
};

export const listenToOrdersItems= () => {
	return (getState, dispatch) => {
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
    }
	};
};
