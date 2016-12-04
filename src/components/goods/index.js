import React from 'react';
import Catalog from './catalog';
import Cart from './cart';
import GoodsGroups from './goods-groups';
import Paper from 'material-ui/Paper';
export default () => {
  const style = {
    display: 'flex',
    flex: '1 0 auto',
  };
  const catalogStyle = {
    display: 'flex',
    flex: '1 0 75%',
  };
  const cartCategoriesStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 25%',
  };
  return (
    <div className='goods' style={style}>
      <div style={catalogStyle}>
        <Catalog />
      </div>
      <div style={cartCategoriesStyle}>
        <Paper rounded={false} zDepth={2}>
          <Cart />
        </Paper>
        <GoodsGroups />
      </div>
    </div>
  );
};
