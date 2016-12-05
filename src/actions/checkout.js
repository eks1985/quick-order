import { cleanCart } from './cart';
import { v4 } from 'node-uuid';
import { detectIsLastPage, goToOrdersPage } from './orders';
import { setCurrentContent } from './current-content';
import { database } from './../firebase/firebase-app';
import { listenToOrdersHeaders, listenToOrdersItems } from './orders-firebase';

export const checkoutOrder = () => {
  return (dispatch, getState) => {
    const nr = v4();
    const date = new Date();
    const enterpriseNr = '';
    const cartItems = getState().cart.items;
    const itemsKeys = Object.keys(cartItems);
    const amount = itemsKeys.reduce((result, key) => result += cartItems[key].qty * cartItems[key].price, 0);
    dispatch(cleanCart());
    dispatch({type: 'RESET_CHECKOUT'});
    dispatch({type: 'RESET_CATALOG_QTY'});

    //update firebase orders data
    const customerGuid = getState().customer.guid;
    if (customerGuid) {
      const ordersHeadersRef = database.ref(`orders/headers/${customerGuid}/${nr}`);
      ordersHeadersRef.update({amount, date, enterpriseNr, nr})
      .then(
        () => {
          const ordersItemsRef = database.ref(`orders/items/${customerGuid}/${nr}`);
          return ordersItemsRef.update({...cartItems});
        }
      )
      .then(
        () => {
          return dispatch(listenToOrdersHeaders());
        }
      )
      .then(
        () => {
          dispatch(goToOrdersPage(1));
          dispatch(detectIsLastPage());
          return dispatch(listenToOrdersItems());
        }  
      )
      .then(
        () => {
          dispatch(setCurrentContent('orders'));            
        }
      );
    }
  };
};
