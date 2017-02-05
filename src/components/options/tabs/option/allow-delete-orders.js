import React from 'react';

import Toggle from 'material-ui/Toggle';
import Subheader from 'material-ui/Subheader';

export default props => {
  const {options, toggleStyles, setOption} = props;
  let allowDeleteOrders;
  return (
    <div style={{flex: '1'}}>
      <Subheader>
        Удаление заказа
      </Subheader>
      <Toggle
        defaultToggled={options.allowDeleteOrders}
        label="Возможность удаление заказа пользователем"
        labelPosition="right"
        style={toggleStyles.toggle}
        ref={
          node => {
            allowDeleteOrders = node;
          }
        }
        onToggle={
          () => {
            setOption("allowDeleteOrders", !allowDeleteOrders.state.switched);
          }
        }
      />
    </div>
  );
}
