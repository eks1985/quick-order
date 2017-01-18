import React from 'react';

import Subheader from 'material-ui/Subheader';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

export default props => {
  const {options, radioStyles, setOption} = props;
  return (
    <div style={{flex: '1', marginBottom: '20px'}}>
      <Subheader>
        Определение активных/не активных позиций
      </Subheader>
      <RadioButtonGroup
        name="positionIsActiveDefinition"
        defaultSelected={options.positionIsActiveDefinition}
        valueSelected={options.positionIsActiveDefinition}
        selected={options.positionIsActiveDefinition}
        onChange={
          (e, value)=>{
            setOption("positionIsActiveDefinition", value);
          }
        }
      >
        <RadioButton
          disabled={!options.managePositionIsActiveProp}
          value='positionData'
          label='Непосредственно из данных от 1с'
          style={radioStyles.radioButton}
        />
        <RadioButton
          disabled={!options.manageGoodsOnStockQty || !options.managePositionIsActiveProp}
          value='stock'
          label={<span><span>Позиция активна если остаток на складе > 0 </span><span style={{color: 'goldenrod', marginLeft: '3px'}}>(опция доступна при Учитывать складские остатки = Да)</span></span>}
          style={radioStyles.radioButton}
        />
      </RadioButtonGroup>
    </div>
  );
}
