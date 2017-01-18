import React from 'react';

import Toggle from 'material-ui/Toggle';

export default props => {
  const {options, toggleStyles, setOption} = props;
  let orderNoActivePositions;
  return (
    <div style={{flex: '1'}}>
      <Toggle
        disabled={!options.managePositionIsActiveProp}
        defaultToggled={options.orderNoActivePositions}
        label="Разрешать заказывать Не активные позиции"
        labelPosition="right"
        style={toggleStyles.toggle}
        ref={
          (node) => {
            orderNoActivePositions = node;
          }
        }
        onToggle={
          () => {
            setOption("orderNoActivePositions", !orderNoActivePositions.state.switched);
          }
        }
      />
    </div>
  );
}
