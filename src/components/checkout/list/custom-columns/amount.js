import React, { PropTypes } from 'react';

const Component = ({
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

  const getJsx = () => {
    let style = applyZebra(rowStyle.price, rowIndex);
    return (
      <div key={`${keyProp}${columnKey}`} style={style}>
        {format1(items[keyProp].amount || 100, '')}
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
