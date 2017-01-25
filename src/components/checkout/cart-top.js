import React from 'react';
import { connect } from 'react-redux';
import * as cartActions from './../../actions/cart';
import * as checkoutActions from './../../actions/checkout';
import IconShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import { format1 } from './../../utils/format';
import RaisedButton from 'material-ui/RaisedButton';
import IconRemoveCart from 'material-ui/svg-icons/action/remove-shopping-cart';

const Cart = ({
  cart,
  //actions
  cleanCart,
  checkoutOrder,
  setCurrentContent
}) => {
  const { totalAmount } = cart;
  const style = {
    // height: '130px',
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
    paddingTop: '3px',
    paddingBottom: '18px',
    // background: '#eee'
  };
  const hasItems = cart.totalItems > 0;

  const getCartStyledJsx = () => {
    const style = { display: 'flex', height: '73px', alignItems: 'center', paddingLeft: '10px' };

    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div
          style={style}
          onClick={
            () => {
              hasItems && setCurrentContent('checkout');
            }
          }
        >
          <div>
            <IconShoppingCart style={{width: 42, height: 42}} />
          </div>
          <div style={{fontSize: '20px'}}>Корзина</div>
          {hasItems &&
            <div style={{display: 'flex', flexDirection: 'row', paddingLeft: '10px'}}>
              <div style={{fontSize: '20px', fontWeight: 'bold'}}>
                {format1(totalAmount, 'руб.')}
              </div>
            </div>
          }
          {!hasItems &&
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '10px', fontSize: '20px'}}>
              Корзина пуста
            </div>
          }
          <RaisedButton
            style={{marginLeft: '6px'}}
            icon={<IconRemoveCart />}
            label='Очистить'
            labelStyle={{fontWeight: 'normal'}}
            onClick={checkoutOrder}
          />
        </div>

      </div>

    );
  };

  return (
    <div className='cart' style={style}>
      {getCartStyledJsx()}
    </div>
  );
};

export default connect(
  state => ({cart: state.cart}),
  { ...cartActions, ...checkoutActions }
)(Cart);
