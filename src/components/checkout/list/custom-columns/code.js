import React, { PropTypes } from 'react';

const Component = ({
  keyProp,
  rowIndex,
  items,
  columnKey,
  applyVertBorder,
  applyZebra,
  rowStyle
}) => {

  const getJsx = () => {
    let style = applyZebra(rowStyle.code, rowIndex);
    return (
      <div key={`${keyProp}${columnKey}`} style={style}>
        {items[keyProp].code}
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
