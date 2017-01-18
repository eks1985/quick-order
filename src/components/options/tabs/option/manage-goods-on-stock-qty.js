import React from 'react';

import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

export default props => {
  const {options, toggleStyles, setOption} = props;
  let manageGoodsOnStockQty;
  return (
    <div style={{flex: '1'}}>
      <Subheader>
        Складские остатки
      </Subheader>
      <Toggle
        defaultToggled={options.manageGoodsOnStockQty}
        label="Учитывать складские остатки"
        labelPosition="right"
        style={toggleStyles.toggle}
        ref={
          node => {
            manageGoodsOnStockQty = node;
          }
        }
        onToggle={
          () => {
            setOption("manageGoodsOnStockQty", !manageGoodsOnStockQty.state.switched);
          }
        }
      />
    </div>
  );
}
