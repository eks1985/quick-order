import React from 'react';

import Toggle from 'material-ui/Toggle';

export default props => {
  const {options, toggleStyles, setOption} = props;
  let permanentDeleteOrders;
  return (
    <div style={{flex: '1'}}>
      <Toggle
        defaultToggled={options.permanentDeleteOrders}
        label="Удалять заказы без возможности восстановления"
        labelPosition="right"
        style={toggleStyles.toggle}
        ref={
          node => {
            permanentDeleteOrders = node;
          }
        }
        onToggle={
          () => {
            setOption("permanentDeleteOrders", !permanentDeleteOrders.state.switched);
          }
        }
      />
    </div>
  );
}
