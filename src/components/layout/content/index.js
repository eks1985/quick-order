import React from 'react';
import { connect } from 'react-redux';
import Goods from './../../goods';
import Orders from './../../orders';
import Checkout from './../../checkout';
import Options from './../../options';
import QuickList from './../../quick-list';
import Management from './../../management';
const Content = ({
  currentContent
}) => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
    alignItems: 'stretch'
  };
  return (
    <div className='content' style={style}>
      {currentContent === 'goods' && <Goods />}
      {currentContent === 'orders' && <Orders />}
      {currentContent === 'checkout' && <Checkout />}
      {currentContent === 'settings' && <Options />}
      {currentContent === 'quick-list' && <QuickList />}
      {currentContent === 'management' && <Management />}
    </div>
  );
};

export default connect(
  state => ({currentContent: state.currentContent})
)(Content);
