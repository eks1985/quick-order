import React from 'react';

import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';

export default props  => {
  const { options, setOption } = props;
  return (
    <div style={{flex: '1', marginBottom: '20px'}}>
      <Subheader>
        Отображать картинки
      </Subheader>
      <Checkbox
        label='В строке'
        checked={options.showPictures.row}
        onCheck={
          (e, isInputChecked) => {
            setOption('showPictures', { ...options.showPictures, row: isInputChecked });
          }
        }
      />
      <Checkbox
        label='Под таблицей товаров'
        checked={options.showPictures.side}
        onCheck={
          (e, isInputChecked) => {
            setOption('showPictures', { ...options.showPictures, side: isInputChecked });
          }
        }
      />
      <Checkbox
        label='В карточке товара'
        checked={options.showPictures.dialog}
        onCheck={
          (e, isInputChecked) => {
            setOption('showPictures', { ...options.showPictures, dialog: isInputChecked });
          }
        }
      />
    </div>
  );
}
