import React, { PropTypes, Component } from 'react';

const Qty = ({
  x,y,
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
  setModal,
  setCoord
}) => {

    const { rowStyle, incDecSmallQtyPane, qtyInputStyle } = styles;

    const applyCurrentRowBorder = (style) => {
      let extendedStyle = { ...style, background: 'rgba(255, 215, 0, 0.2)' };
      return currentCheckout === rowIndex ? { ...style, ...extendedStyle }: style;
    }

    const getJsx = () => {
      let style = applyCurrentRowBorder(applyZebra(rowStyle.qty, rowIndex));
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
            onMouseEnter={
              e => {
                x = e.pageX - 30;
                y = e.pageY - 25;
                setCoord(x, y);
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

class QtyContainer extends Component {

  constructor() {
    super();
    this.state = { x: 0, y: 0};
  }

  setCoord = (x, y) => {
    this.setState({x, y});
  }

  render() {
    return <Qty {...this.props} setCoord={this.setCoord} x={this.state.x} y={this.state.y} />
  }
}


Qty.propTypes = {
  items: PropTypes.object.isRequired,
  columnKey: PropTypes.string.isRequired,
  applyZebra: PropTypes.func.isRequired
};

export default QtyContainer;
