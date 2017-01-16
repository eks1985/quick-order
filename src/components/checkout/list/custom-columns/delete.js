import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';

const Component = ({
  keyProp,
  rowIndex,
  items,
  columnKey,
  applyVertBorder,
  applyZebra,
  rowStyle,
  format1,
  prices,
  removeFromCart,
  removeCatalogQty
}) => {

  const getJsx = () => {
    let style = applyZebra(rowStyle.price, rowIndex);
    return (
      <div key={`${keyProp}${columnKey}`} style={style}>
        <FlatButton
          label='удалить'
          onClick={
            () => {
              removeFromCart(keyProp);
              removeCatalogQty(keyProp)
            }
          }
        >
        </FlatButton>
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
