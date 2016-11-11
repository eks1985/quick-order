import React from 'react';
import { connect } from 'react-redux';
import * as cartActions from './../../../actions/cart';

const Cart = ({
  cart,
  //actions
  cleanCart
}) => {
  const { totalItems, totalAmount } = cart;
  const style = {
    height: '50px',
    border: '1px solid gray',
    display: 'flex',
    flexDirection: 'column',
    padding: '8px'
  };
  return (
    <div className='cart' style={style}>
      <div style={{display: 'flex'}}>
          <div style={{flex: '0 0 70%'}}>
            <div>
              {`Всего позиций: ${totalItems}`}
            </div>
            <div>
              {`На сумму: ${totalAmount}`}
            </div>
          </div>
          <div style={{flex: '0 0 30%'}}>
            <button onClick={cleanCart}>
              Очистить
            </button>
          </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({cart: state.cart}),
  cartActions
)(Cart);
