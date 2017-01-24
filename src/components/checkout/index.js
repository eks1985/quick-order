import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
import List from './list';
import * as cartActions from './../../actions/cart';
import * as checkoutActions from './../../actions/checkout';
// import Subheader from 'material-ui/Subheader';

import Cart from './cart/index';
import GoodsGroups from './goods-groups/index';

import Pagination from './pagination';
import Search from './search';

const Checkout = props => {
  // const { totalItems, checkoutOrder, cleanCart, ...other } = props;
  // const { totalItems, checkoutOrder, cleanCart, ...other } = props;
  // const style = {
  //   display: 'flex',
  //   flex: '1 0 auto',
  //   padding: '10px',
  //   flexDirection: 'column'
  // };

  const style = {
    display: 'flex',
    flex: '1 0 auto'
  };
  const catalogStyle = {
    display: 'flex',
    flex: '1 0 75%',
    padding: '10px',
    flexDirection: 'column'
  };
  const cartCategoriesStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 25%'
  };

  return (
    // <Paper className='checkout' style={style}>
    //   {totalItems > 0 &&
    //     <div style={{marginBottom: '10px'}}>
    //       <RaisedButton
    //         labelStyle={{fontWeight: 'normal'}}
    //         onClick={checkoutOrder}
    //         label='Отправить заказ'
    //       >
    //       </RaisedButton>
    //       <RaisedButton
    //         labelStyle={{fontWeight: 'normal'}}
    //         style={{marginLeft: '10px'}}
    //         onClick={cleanCart}
    //         label='Очистить корзину'
    //       >
    //       </RaisedButton>
    //     </div>
    //   }
    //   <div className='checkout'>
    //     <List {...other} />
    //     <Subheader>
    //       Комментарий
    //     </Subheader>
    //     <TextField
    //       id='comment'
    //       multiLine={true}
    //       rows={10}
    //       style={{width: '100%', background: 'rgba(238, 238, 238, 0.7)', padding: '10px'}}
    //       // defaultValue={checkout.comment}
    //     />
    //   </div>
    // </Paper>

    <div className='checkout' style={style}>
      <div style={catalogStyle}>
        <div style={{display: 'flex', justifyContent: 'space-between', height: '65px'}}>
          <Search />
          <Pagination />
        </div>
        <List {...props} />
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

export default connect(
  state => ({ items: state.cart.items, totalItems: state.cart.totalItems, checkout: state.checkout }),
  { ...cartActions, ...checkoutActions }
)(Checkout);
