import React, { PropTypes } from 'react';

const Component = ({
  key, 
  i,
  items,
  columnKey,
  applyVertBorder,
  applyZebra,
  styles,
  removeFromCart,
  removeCatalogQty,
  addCatalogQty,
  addToCart,
  prices,
  catalogQty,
  setFocused
}) => {
    
    const { rowStyle, incDecSmallQtyPane, qtyInputStyle } = styles;
  
    const getJsx = () => {
      let style = applyZebra(rowStyle.qty, i);
      return (
        <div key={`${key}${columnKey}`} style={style}>
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
            type='text'
            id={i}
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
  
  return getJsx();
  
};

Component.propTypes = {
  items: PropTypes.object.isRequired,
  columnKey: PropTypes.number.isRequired,
  applyVertBorder: PropTypes.func.isRequired,
  applyZebra: PropTypes.func.isRequired
};

export default Component;