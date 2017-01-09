import React, { PropTypes } from 'react';

const Component = ({
  keyProp,
  rowIndex,
  items,
  columnKey,
  applyZebra,
  styles,
  removeFromCart,
  removeCatalogQty,
  addToCart,
  addCatalogQty,
  catalogQty,
  setFocused
}) => {

    const { rowStyle, incDecSmallQtyPane, qtyInputStyle } = styles;

    const getJsx = () => {
      let style = applyZebra(rowStyle.qty, rowIndex);
      return (
        <div key={`${keyProp}${columnKey}`} style={style}>
          <div
            style={incDecSmallQtyPane}
            onClick={
              () => {
                if (catalogQty[keyProp]) {
                  const v = catalogQty[keyProp] - 1;
                  if (v === 0) {
                    removeFromCart(keyProp);
                    removeCatalogQty(keyProp);
                  } else {
                    addCatalogQty(keyProp, v);
                    addToCart(keyProp, v, items[keyProp].price);
                  }
                }
              }
            }
          ></div>
          <input
            type='text'
            id={rowIndex + 1000}
            className='catalogQtyInput'
            style={qtyInputStyle}
            value={catalogQty[keyProp] || ''}
            onFocus={
              () => {
                setFocused(keyProp);
              }
            }
            onChange={
              (e) => {
                const val = parseInt(e.target.value, 10) ? parseInt(e.target.value, 10) : '';
                addCatalogQty(keyProp, val);
                addToCart(keyProp, val, items[keyProp].price);
                if (val === '') {
                  removeFromCart(keyProp);
                  removeCatalogQty(keyProp);
                }
              }
            }
          >
          </input>
          <div
            style={incDecSmallQtyPane}
            onClick={
              () => {
                const v = catalogQty[keyProp] ? catalogQty[keyProp] + 1 :  1;
                addCatalogQty(keyProp, v);
                addToCart(keyProp, v, items[keyProp].price);
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
  columnKey: PropTypes.string.isRequired,
  applyZebra: PropTypes.func.isRequired
};

export default Component;
