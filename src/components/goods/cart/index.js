import React from 'react';
import { connect } from 'react-redux';
import * as cartActions from './../../../actions/cart';
import * as currentContentActions from './../../../actions/current-content';

const Cart = ({
  cart,
  //actions
  cleanCart,
  setCurrentContent
}) => {
  const { totalItems, totalAmount } = cart;
  const style = {
    height: '60px',
    border: '1px solid gray',
    display: 'flex',
    flexDirection: 'column',
    padding: '8px'
  };
  const hasItems = cart.totalItems > 0;
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
          {hasItems &&
            <div style={{flex: '0 0 30%'}}>
              <button onClick={cleanCart}>
                Очистить
              </button>
              <button
                onClick={
                  () => {
                    setCurrentContent('checkout');
                  }
                }
              >
                Оформить
              </button>
            </div>
          }
      </div>
    </div>
  );
};

export default connect(
  state => ({cart: state.cart}),
  { ...cartActions, ...currentContentActions }
)(Cart);
