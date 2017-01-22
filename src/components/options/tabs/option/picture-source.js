import React from 'react';

import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';

export default props  => {
  const { options, setOption } = props;
  return (
    <div style={{flex: '1', marginBottom: '20px'}}>
      <Subheader>
        Источник картинок
      </Subheader>
      <Checkbox
        label='Путь к картинке интернет'
        checked={options.pictureSource === 'url'}
        onCheck={
          (e, isInputChecked) => {
            setOption('pictureSource', 'url');
          }
        }
      />
      <Checkbox
        label='Firebase (поле в формате base64)'
        checked={options.showPictures.side}
        onCheck={
          (e, isInputChecked) => {
            setOption('pictureSource', 'firebase');
          }
        }
      />
    </div>
  );
}
