import React from 'react';
import { connect } from 'react-redux';

const Checkout = ({
  cartItems,
  checkout
}) => {
  const style = {
    display: 'flex',
    flex: '1 0 auto',
    border: '1px solid gray',
    flexDirection: 'column'
  };
  return (
    <div className='checkout' style={style}>
      <div className='cart'>Cart</div>
      <div className='checkout'>
        <textarea style={{minWidth: '500px', minHeight: '200px'}} defaultValue={checkout.comment}></textarea>
      </div>
    </div>
  );
};

export default connect(
  state => ({ cartItems: state.cart.items, checkout: state.checkout })
)(Checkout);
