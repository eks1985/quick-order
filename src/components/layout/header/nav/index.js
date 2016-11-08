import React from 'react';
import { connect } from 'react-redux';
import * as currentContentActions from './../../../../actions/currentContent';
import * as modalActions from './../../../../lib/modal/actions/modal';
const Nav = ({
  //actions
  setCurrentContent,
  setModal
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
            setModal({ content: 'profile', fullScreen: true});
          }
        }
      >
        Profile
      </button>
      <button
        onClick={
          () => {
            setCurrentContent('help');
            setModal({ content: 'help', fullScreen: true});
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
  { ...currentContentActions, ...modalActions }
)(Nav);
