import React from 'react';

import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';

export default props  => {
  const { options, setOption } = props;
  return (
    <div style={{flex: '1', marginBottom: '20px'}}>
      <Subheader>
        Категориии товаров
      </Subheader>
      <Checkbox
        label='Показывать разделить строк категорий товаров'
        checked={options.categoryLineSeparator}
        onCheck={
          (e, isInputChecked) => {
            setOption('categoryLineSeparator', isInputChecked);
          }
        }
      />
    </div>
  );
}
