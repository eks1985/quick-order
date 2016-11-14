import { cleanCart } from './cart';
import { v4 } from 'node-uuid';

export const checkoutOrder = () => {
  return (dispatch, getState) => {
    dispatch({ //handled by reducer orders
      type: 'CHECKOUT',
      header: {guid: v4(), date: new Date()},
      cartItems: getState().cart.items
    })
    dispatch(cleanCart());
    dispatch({type: 'RESET_CHECKOUT'});
  };
};
