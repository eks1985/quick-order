import React, { PropTypes } from 'react';

const Component = ({
  key, 
  i,
  items,
  columnKey,
  applyVertBorder,
  applyZebra,
  rowStyle
}) => {
  
  const getJsx = () => {
    let style = applyVertBorder(applyZebra(rowStyle.code, i));
    return (
      <div key={`${key}${columnKey}`} style={style}>
        {items[key].code}
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