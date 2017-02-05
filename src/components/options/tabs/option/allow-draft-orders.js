import React from 'react';

import Toggle from 'material-ui/Toggle';
import Subheader from 'material-ui/Subheader';

export default props => {
  const {options, toggleStyles, setOption} = props;
  let allowDraftOrders;
  return (
    <div style={{flex: '1'}}>
      <Subheader>
        Статусы заказов
      </Subheader>
      <Toggle
        defaultToggled={options.allowDraftOrders}
        label="Возможность сохранять черновики заказов"
        labelPosition="right"
        style={toggleStyles.toggle}
        ref={
          node => {
            allowDraftOrders = node;
          }
        }
        onToggle={
          () => {
            setOption("allowDraftOrders", !allowDraftOrders.state.switched);
          }
        }
      />
    </div>
  );
}
