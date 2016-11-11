import { cleanCart } from './cart';
export const checkout = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'CHECKOUT',
      cartItems: getState().cart.items
    })
    dispatch(cleanCart());
  };
};
