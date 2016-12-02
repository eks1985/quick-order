import React from 'react';
import { connect } from 'react-redux';
import * as cartActions from './../../actions/cart';
import * as checkoutActions from './../../actions/checkout';

const Checkout = ({
  cartItems,
  totalItems,
  checkout,
  // actions
  updateCart,
  removeFromCart,
  cleanCart,
  checkoutOrder
}) => {
  const style = {
    display: 'flex',
    flex: '1 0 auto',
    border: '1px solid gray',
    flexDirection: 'column'
  };
  const containerStyle = {
    overflowY: 'scroll',
    maxHeight: '70vh',
    paddingTop: '10px',
    display: 'flex',
    flexDirection: 'column'
  };
  const rowStyle = {
    container: {
      display: 'flex'
    },
    code: {
      display: 'flex',
      flex: '0 0 20%',
      padding: '3px',
      justifyContent: 'flex-start'
    },
    description: {
      display: 'flex',
      flex: '0 0 40%',
      padding: '3px',
      justifyContent: 'flex-start'
    },
    price: {
      display: 'flex',
      flex: '0 0 10%',
      padding: '3px',
      justifyContent: 'flex-end'
    },
    amount: {
      display: 'flex',
      flex: '0 0 10%',
      padding: '3px',
      justifyContent: 'flex-end'
    },
    qty: {
      display: 'flex',
      flex: '0 0 10%',
      padding: '3px',
      justifyContent: 'center',
    },
    add: {
      display: 'flex',
      flex: '0 0 10%',
      padding: '3px'
    }
  };
  const headerStyle = {
    container: {
      display: 'flex'
    },
    code: {
      display: 'flex',
      flex: '0 0 20%',
      padding: '3px',
      justifyContent: 'center'
    },
    description: {
      display: 'flex',
      flex: '0 0 40%',
      padding: '3px',
      justifyContent: 'center'
    },
    price: {
      display: 'flex',
      flex: '0 0 10%',
      padding: '3px',
      justifyContent: 'flex-end'
    },
    amount: {
      display: 'flex',
      flex: '0 0 10%',
      padding: '3px',
      justifyContent: 'flex-end'
    },
    qty: {
      display: 'flex',
      flex: '0 0 10%',
      padding: '3px',
      justifyContent: 'flex-end'
    },
    add: {
      display: 'flex',
      flex: '0 0 10%',
      padding: '3px'
    }
  };
  const getItemsJsx = () => {
    const itemsIds = Object.keys(cartItems);
    return itemsIds.map( key => {
      return (
        <div key={key} style={rowStyle.container}>
          <div style={rowStyle.code}>{cartItems[key].code}</div>
          <div style={rowStyle.description}>{cartItems[key].description}</div>
          <div style={rowStyle.price}>{cartItems[key].price}</div>
          <div style={rowStyle.qty}>
            <input
              type="text"
              style={{width: '50px', textAlign: 'right'}}
              value={cartItems[key].qty || ''}
              onChange={
                (e) => {
                  const val = parseInt(e.target.value, 10) ? parseInt(e.target.value, 10) : '';
                  updateCart(key, val);
                }
              }
            >
            </input>
          </div>
          <div style={rowStyle.amount}>{cartItems[key].amount}</div>
          <div style={rowStyle.add}>
              <span>
                <span style={{fontSize: '10px', marginRight: '3px'}}>
                  Удалить
                </span>
                <button
                  onClick={
                    () => {
                      removeFromCart(key);
                    }
                  }
                >
                  X
                </button>
              </span>
          </div>
        </div>
      );
    });
  }
  const getHeaderJsx = () => {
    return (
      <div style={headerStyle.container}>
        <div style={headerStyle.code}>Код</div>
        <div style={headerStyle.description}>Наименование</div>
        <div style={headerStyle.price}>Цена</div>
        <div style={headerStyle.qty}>Количество</div>
        <div style={headerStyle.price}>Сумма</div>
        <div style={headerStyle.add}></div>
      </div>
    );
  }

  return (
    <div className='checkout' style={style}>
      {totalItems > 0 &&
        <div>
          <button
            onClick={checkoutOrder}
          >
            Отправить заказ
          </button>
          <button
            onClick={cleanCart}
          >
            Очистить корзину
          </button>
        </div>
      }
      <div className='cart' style={containerStyle}>
        {getHeaderJsx()}
        {getItemsJsx()}
      </div>
      <div className='checkout'>
        <textarea
          style={{minWidth: '500px', minHeight: '200px'}}
          defaultValue={checkout.comment}
        >
        </textarea>
      </div>
    </div>
  );
};

export default connect(
  state => ({ cartItems: state.cart.items, totalItems: state.cart.totalItems, checkout: state.checkout }),
  { ...cartActions, ...checkoutActions }
)(Checkout);
