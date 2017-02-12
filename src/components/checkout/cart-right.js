import React from 'react';
import { connect } from 'react-redux';
import * as cartActions from './../../actions/cart';
import * as checkoutActions from './../../actions/checkout';
import RaisedButton from 'material-ui/RaisedButton';
import IconSend from 'material-ui/svg-icons/content/send';
import IconDraft from 'material-ui/svg-icons/content/drafts';
import TextField from 'material-ui/TextField';

const Cart = ({
  cart,
  options,
  comment,
  refOrder,
  //actions
  cleanCart,
  checkoutOrder,
  setCurrentContent,
  setCommentCheckout,
  setRefCheckout
}) => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '3px',
  };
  const hasItems = cart.totalItems > 0;

  const getCartStyledJsx = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', padding: '10px', paddingBottom: '16px'}}>
          {hasItems &&
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '4px'}}>
              <div style={{marginRight: '6px', display: 'flex', flex: '1'}}>
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
          {hasItems && options.allowDraftOrders &&
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '4px'}}>
              <div style={{marginRight: '3px', display: 'flex'}}>
                <RaisedButton
                  style={{flex: '1'}}
                  icon={<IconDraft />}
                  label='В черновик'
                  labelStyle={{fontWeight: 'normal', flex: '1'}}
                  onClick={
                    () => {
                      checkoutOrder(true);
                    }
                  }
                />
              </div>
            </div>
          }
        </div>
        <div style={{width: '100%', borderTop: '2px solid #eee', opacity: '0.8'}}></div>
        <TextField
          value={refOrder}
          placeholder='Номер заказа'
          id='orderRef'
          underlineShow={false}
          style={{width: '95%', padding: '10px', paddingBottom: '0px', paddingTop: '0px'}}
          onChange={
            e => {
              const text = e.target.value.trim();
              text.length < 21 && setRefCheckout(e.target.value.trim());
            }
          }
        />
        <div style={{width: '100%', borderTop: '2px solid #eee', opacity: '0.8'}}></div>
        <TextField
          defaultValue={comment}
          placeholder='Комментарий к заказу'
          id='comment'
          multiLine={true}
          rows={5}
          underlineShow={false}
          style={{width: '95%', padding: '10px', paddingTop: '0px'}}
          onChange={
            e => {
              setCommentCheckout(e.target.value.trim())
            }
          }
        />
        <div style={{width: '100%',  marginBottom: '10px', opacity: '0.6'}}></div>
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
  state => ({ cart: state.cart, options: state.options, comment: state.checkout.comment, refOrder: state.checkout.ref }),
  { ...cartActions, ...checkoutActions }
)(Cart);
