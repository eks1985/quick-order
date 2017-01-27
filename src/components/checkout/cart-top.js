import React from 'react';
import { connect } from 'react-redux';
import * as cartActions from './../../actions/cart';
import * as checkoutActions from './../../actions/checkout';
import * as currentContentActions from './../../actions/current-content';
import IconShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import { format1 } from './../../utils/format';
import RaisedButton from 'material-ui/RaisedButton';
import IconRemoveCart from 'material-ui/svg-icons/content/clear';

const Cart = ({
  cart,
  //actions
  cleanCart,
  checkoutOrder,
  setCurrentContent
}) => {
  const { totalAmount } = cart;
  const style = {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
    paddingTop: '3px',
    paddingBottom: '18px',
  };
  const hasItems = cart.totalItems > 0;

  const getCartStyledJsx = () => {
    const style = { display: 'flex', height: '73px', alignItems: 'center', paddingLeft: '10px' };

    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div
          style={style}
        >
          <div>
            <IconShoppingCart style={{width: 42, height: 42}} />
          </div>
          {hasItems && <div style={{fontSize: '20px'}}>Корзина</div> }
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
          {hasItems &&
            <RaisedButton
              style={{marginLeft: '6px'}}
              icon={<IconRemoveCart />}
              label='Очистить'
              labelStyle={{fontWeight: 'normal'}}
              onClick={cleanCart}
            />
          }
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
  { ...cartActions, ...checkoutActions, ...currentContentActions }
)(Cart);
