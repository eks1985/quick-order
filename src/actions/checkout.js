import { cleanCart } from './cart';
import { detectIsLastPage, goToOrdersPage } from './orders';
import { setCurrentContent } from './current-content';
import { database } from './../firebase/firebase-app';
import { listenToOrdersHeaders, listenToOrdersItems } from './orders-firebase';

export const checkoutOrder = (draft = false) => {
  return (dispatch, getState) => {
    const date = new Date();
    const enterpriseNr = '';
    const cartItems = getState().cart.items;
    const itemsKeys = Object.keys(cartItems);
    const amount = itemsKeys.reduce((result, key) => result += cartItems[key].qty * cartItems[key].price, 0);
    const status = draft === true ? 'draft' : 'new';
    const comment = getState().checkout.comment;
    const ref = getState().checkout.ref;
    const checkoutOrderNr = getState().checkout.id;
    dispatch(cleanCart());
    dispatch({type: 'RESET_CHECKOUT'});
    dispatch({type: 'RESET_CATALOG_QTY'});

    //update firebase orders data
    const customerGuid = getState().customer.guid;
    if (customerGuid) {
      const newOrderNr = checkoutOrderNr || database.ref(`orders/headers/${customerGuid}`).push().key;
      const ordersHeadersRef = database.ref(`orders/headers/${customerGuid}/${newOrderNr}`);
      ordersHeadersRef.update({ amount, date, enterpriseNr, nr: newOrderNr, status, comment, ref })
      .then(
        () => {
          const ordersItemsRef = database.ref(`orders/items/${customerGuid}/${newOrderNr}`);
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

export const setCommentCheckout = comment => {
  return dispatch => {
    dispatch({
      type: 'SET_COMMENT_CHECKOUT',
      comment
    })
  }
}

export const setRefCheckout = ref => {
  return dispatch => {
    dispatch({
      type: 'SET_REF_CHECKOUT',
      ref
    })
  }
}
