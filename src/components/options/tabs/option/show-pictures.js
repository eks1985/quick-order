import React from 'react';

import img1 from './../../../../image.jpg';

import Subheader from 'material-ui/Subheader';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

export default props  => {
  const { options, radioStyles, setOption } = props;
  return (
    <div style={{flex: '1', marginBottom: '20px'}}>
      <Subheader>
        Отображать картинки
      </Subheader>
      <RadioButtonGroup
        name="showPictures"
        valueSelected={options.showPictures}
        onChange={
          (e, value)=>{
            setOption("showPictures", value);
          }
        }
      >
        <RadioButton
          value='no'
          label='Нет'
          style={radioStyles.radioButton}
        />
        <RadioButton
          value='row'
          label='В строке'
          style={radioStyles.radioButton}
        />
        <RadioButton
          value='side'
          label='На боковой панели'
          style={radioStyles.radioButton}
        />
        <RadioButton
          value='dialog'
          label='В отдельном окне'
          style={radioStyles.radioButton}
        />
      </RadioButtonGroup>

      <div
        style={{
          height: '200px',
          width: '200px',
          backgroundImage: `url(${img1})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          border: '1px solid #ddd'
        }}
      ></div>


    </div>
  );
}
