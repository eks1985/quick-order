import React from 'react';
import { connect } from 'react-redux';
import * as cartActions from './../../actions/cart';
import * as checkoutActions from './../../actions/checkout';
import RaisedButton from 'material-ui/RaisedButton';
import IconSend from 'material-ui/svg-icons/content/send';
import TextField from 'material-ui/TextField';

const Cart = ({
  cart,
  //actions
  cleanCart,
  checkoutOrder,
  setCurrentContent
}) => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
    paddingTop: '3px',
    paddingBottom: '18px',
    background: '#eee'
  };
  const hasItems = cart.totalItems > 0;

  const getCartStyledJsx = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {hasItems &&
          <div style={{display: 'flex', flex: '1 0 100%', justifyContent: 'center', marginTop: '10px'}}>
            <div style={{marginRight: '3px', marginBottom: '5px', display: 'flex'}}>
              <RaisedButton
                style={{flex: '1'}}
                icon={<IconSend />}
                label='Отправить заказ'
                labelStyle={{fontWeight: 'normal', flex: '1'}}
                onClick={checkoutOrder}
              />
            </div>
          </div>
        }
        <TextField
          placeholder='Комментарий'
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
