import { cleanCart } from './cart';
import { v4 } from 'node-uuid';
import { setQtyPagesOrders, detectIsLastPage } from './orders';

export const checkoutOrder = () => {
  return (dispatch, getState) => {
    dispatch({ //handled by reducer orders
      type: 'CHECKOUT',
      header: {guid: v4(), date: new Date()},
      cartItems: getState().cart.items
    })
    dispatch(cleanCart());
    dispatch({type: 'RESET_CHECKOUT'});
    dispatch(setQtyPagesOrders());
    dispatch(detectIsLastPage());
  };
};
