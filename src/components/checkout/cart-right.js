import React from 'react';
import { connect } from 'react-redux';
import * as cartActions from './../../actions/cart';
import * as checkoutActions from './../../actions/checkout';
import RaisedButton from 'material-ui/RaisedButton';
import IconRemoveCart from 'material-ui/svg-icons/action/remove-shopping-cart';
import IconRowing from 'material-ui/svg-icons/action/rowing';
// import { format1 } from './../../utils/format';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';

const Cart = ({
  cart,
  //actions
  cleanCart,
  checkoutOrder,
  setCurrentContent
}) => {
  // const { totalItems, totalAmount } = cart;
  const style = {
    // height: '130px',
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
    paddingTop: '3px',
    paddingBottom: '18px',
    background: '#eee'
  };
  const hasItems = cart.totalItems > 0;

  const getCartStyledJsx = () => {
    // const style = { display: 'flex', height: '73px', alignItems: 'center', paddingLeft: '10px' };

    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {hasItems &&
          <div style={{display: 'flex', flex: '1 0 100%', justifyContent: 'center', marginTop: '10px'}}>
            <div style={{marginRight: '3px'}}>
              <RaisedButton
                icon={<IconRowing />}
                label='Отправить'
                labelStyle={{fontWeight: 'normal'}}
                onClick={checkoutOrder}
              />
            </div>
            <div style={{marginLeft: '3px'}}>
              <RaisedButton
                icon={<IconRemoveCart />}
                label='Очистить'
                labelStyle={{fontWeight: 'normal'}}
                onClick={
                  () => {
                    const yes = confirm("Уверены? Будут очищены все введеные значения количеств на страницах списка товаров");
                    if (yes) {
                      cleanCart();
                    }
                  }
                }
              />
            </div>

          </div>
        }

        <Subheader>
          Комментарий
        </Subheader>
        <TextField
          id='comment'
          multiLine={true}
          rows={5}
          style={{width: '90%', background: 'rgba(238, 238, 238, 0.7)', padding: '10px'}}
        />


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
