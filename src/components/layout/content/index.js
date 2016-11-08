import React from 'react';
import Goods from './../../goods';
import Orders from './../../orders';
import Checkout from './../../checkout';
import Profile from './../../profile';
import Help from './../../help';
export default () => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
    border: '1px solid gray',
  };
  return (
    <div className='content' style={style}>
      <Goods />
      <Orders />
      <Checkout />
      <Profile />
      <Help />
    </div>
  );
};
