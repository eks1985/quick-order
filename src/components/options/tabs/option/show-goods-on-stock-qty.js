import React from 'react';

import Toggle from 'material-ui/Toggle';

export default props => {
  const {options, toggleStyles, setOption} = props;
  let showGoodsOnStockQty;
  return (
    <div style={{flex: '1'}}>
      <Toggle
        disabled={!options.manageGoodsOnStockQty}
        defaultToggled={options.showGoodsOnStockQty}
        label="Показывать остатки в каталоге"
        labelPosition="right"
        style={toggleStyles.toggle}
        ref={
          (node) => {
            showGoodsOnStockQty = node;
          }
        }
        onToggle={
          () => {
            setOption("showGoodsOnStockQty", !showGoodsOnStockQty.state.switched);
          }
        }
      />
    </div>
  );
}
