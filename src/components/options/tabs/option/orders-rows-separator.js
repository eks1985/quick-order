
import React from 'react';

import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';

export default props  => {
  const { options, setOption } = props;
  return (
    <div style={{flex: '1', marginBottom: '20px'}}>
      <Subheader>
        Заказы
      </Subheader>
      <Checkbox
        label='Показывать разделить строк заказов'
        checked={options.ordersRowsSeparator}
        onCheck={
          (e, isInputChecked) => {
            setOption('ordersRowsSeparator', isInputChecked);
          }
        }
      />
    </div>
  );
}
