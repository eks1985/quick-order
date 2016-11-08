import React from 'react';
import { connect } from 'react-redux';
import * as currentContentActions from './../../../../actions/currentContent';
const Nav = ({
  //actions
  setCurrentContent
}) => {
  const style = {
    display: 'flex'
  }
  return (
    <div className='headerNav' style={style}>
      <button
        onClick={
          () => {
            setCurrentContent('goods');
          }
        }
      >
        Goods
      </button>
      <button
        onClick={
          () => {
            setCurrentContent('orders');
          }
        }
      >
        Orders
      </button>
      <button
        onClick={
          () => {
            setCurrentContent('checkout');
          }
        }
      >
        Checkout
      </button>
      <button
        onClick={
          () => {
            setCurrentContent('profile');
          }
        }
      >
        Profile
      </button>
      <button
        onClick={
          () => {
            setCurrentContent('help');
          }
        }
      >
        Help
      </button>
    </div>
  );
};

export default connect(
  null,
  currentContentActions
)(Nav);
