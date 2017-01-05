import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import List from './list';

const Checkout = (props) => {
  const { totalItems, checkoutOrder, cleanCart, ...other } = props;
  const style = {
    display: 'flex',
    flex: '1 0 auto',
    padding: '10px',
    flexDirection: 'column'
  };

  return (
    <Paper className='checkout' style={style}>
      {totalItems > 0 &&
        <div style={{marginBottom: '10px'}}>
          <RaisedButton
            labelStyle={{fontWeight: 'normal'}}
            onClick={checkoutOrder}
            label='Отправить заказ'
          >
          </RaisedButton>
          <RaisedButton
            labelStyle={{fontWeight: 'normal'}}
            style={{marginLeft: '10px'}}
            onClick={cleanCart}
            label='Очистить корзину'
          >
          </RaisedButton>
        </div>
      }
      <div className='checkout'>
        <List {...other} />
        <TextField
          id='comment'
          multiLine={true}
          rows={10}
          style={{width: '100%', background: 'rgba(238, 238, 238, 0.7)', padding: '10px'}}
          // defaultValue={checkout.comment}
        />
      </div>
    </Paper>
  );
};

export default connect(
  state => ({ items: state.cart.items, totalItems: state.cart.totalItems, checkout: state.checkout })
)(Checkout);
