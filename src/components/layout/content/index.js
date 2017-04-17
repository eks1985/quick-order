import React from 'react';
import { connect } from 'react-redux';
import Goods from './../../goods';
import Orders from './../../orders';
import Checkout from './../../checkout/index';
import Options from './../../options';
import QuickList from './../../quick-list';
import Management from './../../management';
import PrintOrder from './../../orders/order-print';
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
      {currentContent === 'print-order' && <PrintOrder />}
    </div>
  );
};

export default connect(
  state => ({currentContent: state.ui.currentContent})
)(Content);
