import React from 'react';
import { connect } from 'react-redux';
import Goods from './../../goods';
import Orders from './../../orders';
import Checkout from './../../checkout';
import Profile from './../../profile';
import Help from './../../help';
import QuickOrder from './../../quick-order';
const Content = ({
  currentContent
}) => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
    border: '1px solid gray',
  };
  return (
    <div className='content' style={style}>
      {currentContent === 'goods' && <Goods />}
      {currentContent === 'orders' && <Orders />}
      {currentContent === 'checkout' && <Checkout />}
      {currentContent === 'profile' && <Profile />}
      {currentContent === 'help' && <Help />}
      {currentContent === 'quick-order' && <QuickOrder />}
    </div>
  );
};

export default connect(
  state => ({currentContent: state.currentContent})
)(Content);
