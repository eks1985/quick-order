import React, { Component } from 'react';
import { format1 } from './../../../../utils/format';
import styles from './styles';

export default ({
  items,
  itemsIds,
  cartItems,
  prices,
  catalogQty,
  //actions
  setCurentGuid,
  setModal,
  removeFromCart,
  removeCatalogQty,
  addCatalogQty,
  addToCart,
  setFocused
}) => {
  const { rowStyle, zebraStyle }  = styles;
  const getItemsJsx = () => {
    return itemsIds.map( (key, i) => {
      return (
        <div className='row' key={key} style={i % 2 === 0 ? rowStyle.container: { ...rowStyle.container, ...zebraStyle }}>
          <div style={rowStyle.code}>{items[key].code}</div>
          <div style={rowStyle.description} tabIndex={-1}>
            <a
              tabIndex={-1}
              href="#"
              style={{textDecoration: 'none'}}
              onClick={
                () => {
                  setCurentGuid(key);
                  setModal({ content: 'goodsCard', fullScreen: true });
                }
              }
            >
              <ListItem
                tabIndex={-1}
                innerDivStyle={{padding: '10px'}}
              >
                {items[key].description}
              </ListItem>
            </a>
          </div>
          <div style={rowStyle.price}>{format1(prices[key], '')}</div>
          <div style={rowStyle.qty}>
            <div 
              style={{width: '12px', cursor: 'pointer', background: 'rgba(238, 238, 238, 0.5)'}}
              onClick={
                () => {
                  if (catalogQty[key]) {
                    const v = catalogQty[key] - 1;
                    if (v === 0) {
                      removeFromCart(key);
                      removeCatalogQty(key);
                    } else {
                      addCatalogQty(key, v);
                      addToCart(key, v, prices[key]);                      
                    }
                  }
                }
              }
            ></div>
            <input
              type="text"
              className='catalogQtyInput'
              style={{width: '50px', textAlign: 'right', padding: '3px', fontSize: '16px'}}
              value={catalogQty[key] || ''}
              onFocus={
                () => {
                  setFocused(key);
                }
              }
              onChange={
                (e) => {
                  const val = parseInt(e.target.value, 10) ? parseInt(e.target.value, 10) : '';
                  addCatalogQty(key, val);
                  addToCart(key, val, prices[key]);
                  if (val === '') {
                    removeFromCart(key);
                    removeCatalogQty(key);
                  }
                }
              }
            >
            </input>
            <div 
              style={{width: '12px', cursor: 'pointer', background: 'rgba(238, 238, 238, 0.5)'}}
              onClick={
                () => {
                  const v = catalogQty[key] ? catalogQty[key] + 1 :  1;
                  addCatalogQty(key, v);
                  addToCart(key, v, prices[key]);                  
                }
              }
            >
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className='items'>
      {getItemsJsx()}
    </div>
  );
  
};