import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import List from './list';
import * as cartActions from './../../actions/cart';
import * as checkoutActions from './../../actions/checkout';

import CartTop from './cart-top';
import CartRight from './cart-right';
import GoodsGroups from './goods-groups/index';

import Pagination from './pagination';
import Search from './search';

const Checkout = props => {
  const style = {
    display: 'flex',
    flex: '1 0 auto'
  };
  const catalogStyle = {
    display: 'flex',
    flex: '1 0 75%',
    padding: '10px',
    paddingTop: '0px',
    flexDirection: 'column'
  };
  const cartCategoriesStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 25%'
  };

  return (
    <div className='checkout' style={style}>
      <Paper style={catalogStyle} zDepth={2}>
        <div style={{display: 'flex', justifyContent: 'space-between', height: '65px'}}>
          <Search />
          <CartTop />
          <Pagination />
        </div>
        <List {...props} />
      </Paper>
      <div style={cartCategoriesStyle}>
        <Paper rounded={false} zDepth={2}>
          <CartRight />
        </Paper>
        <GoodsGroups />
      </div>
    </div>
    );
};

export default connect(
  state => ({ items: state.cart.items, totalItems: state.cart.totalItems, checkout: state.checkout }),
  { ...cartActions, ...checkoutActions }
)(Checkout);
