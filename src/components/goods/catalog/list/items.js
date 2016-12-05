import React from 'react';
import { format1 } from './../../../../utils/format';
import styles from './styles';
import { ListItem } from 'material-ui/List';

export default ({
  items,
  itemsIds,
  cartItems,
  prices,
  catalogQty,
  catalogListSettings,
  //actions
  setCurentGuid,
  setModal,
  removeFromCart,
  removeCatalogQty,
  addCatalogQty,
  addToCart,
  setFocused
}) => {
  const { rowStyle, zebraStyle, incDecSmallQtyPane, qtyInputStyle }  = styles;
  const getCodeJsx = (key) => {
    return <div key={key + 'code'} style={rowStyle.code}>{items[key].code}</div>;
  };
  const getDescriptionJsx = (key) => {
    return (
      <div key={key + 'description'} style={rowStyle.description} tabIndex={-1}>
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
    );
  };
  const getPriceJsx = (key) => {
    return (
      <div key={key + 'price'} style={rowStyle.price}>{format1(prices[key], '')}</div>
    );
  };
  const getQtyJsx = (key) => {
    return (
      <div key={key + 'qty'} style={rowStyle.qty}>
        <div 
          style={incDecSmallQtyPane}
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
          style={qtyInputStyle}
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
          style={incDecSmallQtyPane}
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
    );
  };
  const getItemJsx = (columnName, key) => {
    switch (columnName) {
      case 'code': 
        return getCodeJsx(key);
      case 'description':
        return getDescriptionJsx(key);
      case 'price':
        return getPriceJsx(key);
      case 'qty':
        return getQtyJsx(key);
      default: 
        return <div></div>; 
    }
  };
  const getItemsJsx = () => {
    return itemsIds.map( (key, i) => {
      return (
        <div className='row' key={key} style={i % 2 === 0 ? rowStyle.container: { ...rowStyle.container, ...zebraStyle }}>
          {catalogListSettings.map(columnName => getItemJsx(columnName, key))}
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