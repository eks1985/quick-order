import React, { PropTypes } from 'react';

const Component = ({
  key, 
  i,
  items,
  columnKey,
  applyVertBorder,
  applyZebra,
  rowStyle,
  format1,
  prices
}) => {
  
  const getJsx = () => {
    let style = applyZebra(rowStyle.price, i);
    return (
      <div key={`${key}${columnKey}`} style={style}>
        {format1(prices[key] || 100, '')}
      </div>
    );
  };
  
  return getJsx();
  
};

Component.propTypes = {
  items: PropTypes.object.isRequired,
  columnKey: PropTypes.number.isRequired,
  applyVertBorder: PropTypes.func.isRequired,
  applyZebra: PropTypes.func.isRequired,
  prices: PropTypes.object.isRequired,
  format1: PropTypes.func.isRequired
};

export default Component;