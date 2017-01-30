import React, { PropTypes } from 'react';

const Component = ({
  currentCheckout,
  keyProp,
  rowIndex,
  items,
  columnKey,
  applyVertBorder,
  applyZebra,
  rowStyle,
  format1,
  prices
}) => {

  const applyCurrentRowBorder = (style) => {
    let extendedStyle = { ...style, background: 'rgba(255, 215, 0, 0.2)' };
    return currentCheckout === rowIndex ? { ...style, ...extendedStyle }: style;
  }

  const getJsx = () => {
    let style = applyCurrentRowBorder(applyZebra(rowStyle.price, rowIndex));
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
        {format1(items[keyProp].price || 100, '')}
      </div>
    );
  };

  return getJsx();

};

Component.propTypes = {
  items: PropTypes.object.isRequired,
  columnKey: PropTypes.string.isRequired,
  applyVertBorder: PropTypes.func.isRequired,
  applyZebra: PropTypes.func.isRequired,
  format1: PropTypes.func.isRequired,
  rowStyle: PropTypes.object.isRequired
};

export default Component;
