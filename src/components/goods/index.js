import React from 'react';
import Catalog from './catalog';
import Cart from './cart';
import GoodsCategories from './goods-categories';
export default () => {
  const style = {
    display: 'flex',
    flex: '1 0 auto',
    border: '1px solid gray'
  };
  const catalogStyle = {
    display: 'flex',
    flex: '1 0 75%',
    border: '1px solid gray'
  };
  const cartCategoriesStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 25%',
    border: '1px solid gray'
  }
  return (
    <div className='goods' style={style}>
      <div style={catalogStyle}>
        <Catalog />
      </div>
      <div style={cartCategoriesStyle}>
        <Cart />
        <GoodsCategories />
      </div>
    </div>
  );
};
