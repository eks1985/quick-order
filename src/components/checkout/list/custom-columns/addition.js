import React, { PropTypes } from 'react';

const Component = ({
  currentCheckout,
  keyProp,
  rowIndex,
  items,
  columnKey,
  applyVertBorder,
  applyZebra,
  rowStyle
}) => {

  const applyCurrentRowBorder = style => {
    let extendedStyle = { ...style, background: 'rgba(255, 215, 0, 0.2)' };
    return currentCheckout === rowIndex ? { ...style, ...extendedStyle }: style;
  }

  const getJsx = () => {
    let style = applyCurrentRowBorder(applyZebra(rowStyle.code, rowIndex));
    return (
      <div
        key={`${keyProp}${columnKey}`}
        className='row-cell'
        style={style}
        onClick={
          () => {
            document.getElementById(rowIndex).focus();
          }
        }
      >
        {items[keyProp][columnKey]}
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
  rowStyle: PropTypes.object.isRequired
};

export default Component;
