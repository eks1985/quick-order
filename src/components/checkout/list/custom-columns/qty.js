import React, { PropTypes } from 'react';

const Qty = ({
  currentCheckout,
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
  setFocusedCheckout,
  setCurentGuidCheckout,
  setModal
}) => {

    const { rowStyle, incDecSmallQtyPane, qtyInputStyle } = styles;

    const applyCurrentRowBorder = (style) => {
      let extendedStyle = { ...style, background: 'rgba(255, 215, 0, 0.2)' };
      return currentCheckout === rowIndex ? { ...style, ...extendedStyle }: style;
    }

    const getJsx = () => {
      let style = applyCurrentRowBorder(applyZebra(rowStyle.qty, rowIndex));
      let x, y;
      return (
        <div
          key={`${keyProp}${columnKey}`}
          style={style}
          className='row-cell'
          onClick={
            () => {
              document.getElementById(rowIndex).focus();
            }
          }
        >
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
            id={rowIndex}
            className='catalogQtyInput'
            style={qtyInputStyle}
            value={catalogQty[keyProp] || ''}
            onClick={
              e => {
                // console.log('e.x', e.pageX);
                x = e.pageX - 30;
                y = e.pageY - 25;
              }
            }
            onFocus={
              () => {
                setFocusedCheckout(rowIndex);
                setCurentGuidCheckout(keyProp);
              }
            }
            onChange={
              (e) => {
                const val = parseInt(e.target.value, 10) ? parseInt(e.target.value, 10) : '';
                if (val !== '') {
                  addCatalogQty(keyProp, val);
                  addToCart(keyProp, val, items[keyProp].price);
                }
                if (val === '') {
                  setModal({
                    content: 'cart-row-qty-edit',
                    showClose: false,
                    style: { background: '#fff'},
                    x,
                    y,
                    data: {
                      keyProp
                    }
                  })
                  // removeFromCart(keyProp);
                  // removeCatalogQty(keyProp);
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

Qty.propTypes = {
  items: PropTypes.object.isRequired,
  columnKey: PropTypes.string.isRequired,
  applyZebra: PropTypes.func.isRequired
};

export default Qty;
