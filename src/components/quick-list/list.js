import React from 'react';
import { connect } from 'react-redux';
import * as cartActions from './../../actions/cart';

const List = ({
  quickList,
  goodsItemsInitial,
  cartTotalItems,
  //actions
  addQuickListToCart
}) => {
  const rowJsx = (key) => {
    const code = goodsItemsInitial[quickList[key].guid].code;
    const description = goodsItemsInitial[quickList[key].guid].description;
    const qty = quickList[key].qty;
    return (
      <div style={{display: 'flex'}}>
        <div style={{display: 'flex', flex: '0 0 15%'}}>{code}</div>
        <div style={{display: 'flex', flex: '0 0 35%'}}>{description}</div>
        <div style={{display: 'flex', flex: '0 0 15%'}}>{qty}</div>
      </div>
    );
  };
  const rowsJsx = () => {
    const keys = Object.keys(quickList);
    return keys.map(key => {
      return (
        <div key={key} style={{margin: '10px'}}>
          {quickList[key].guid ? rowJsx(key) : <div style={{background: '#eee'}}>{key}</div>}
        </div>
      );
    });
  };
  const rowsHeaderJsx = () => {
    return (
      <div style={{display: 'flex', padding: '10px', background: '#eee', marginTop: '10px', border: '1px solid #eee'}}>
        <div style={{display: 'flex', flex: '0 0 15%'}}>Код</div>
        <div style={{display: 'flex', flex: '0 0 35%'}}>Наименование</div>
        <div style={{display: 'flex', flex: '0 0 15%'}}>Количество</div>
      </div>
    );
  };

  const hasItems = Object.keys(quickList).length > 0;

  let cleanCartInput;

  return (
    <div style={{display: 'flex', flexDirection: 'column', flex:'1'}}>
      {hasItems && <div>{rowsHeaderJsx()}</div>}
      {hasItems && <div style={{border: '1px solid #eee'}}>{rowsJsx()}</div>}
      {hasItems &&
        <div style={{padding: '10px'}}>
          <button
            onClick={
              () => {
                const cleanCart = cleanCartInput ? cleanCartInput.checked : false;
                addQuickListToCart(cleanCart);
              }
            }
          >
            Добавить в корзину
          </button>
          { cartTotalItems > 0 &&
            <span style={{marginLeft: '10px'}}>
              <input
                type='checkbox'
                ref={
                  (node) => {
                    cleanCartInput = node;
                  }
                }
              >
              </input>
              <span>Очистить корзину перед добавлением позиций</span>
            </span>
          }
        </div>
      }
    </div>
  );
};

export default connect(
  state => ({ quickList: state.quickList, goodsItemsInitial: state.goods.itemsInitial, cartTotalItems: state.cart.totalItems }),
  cartActions
)(List);
