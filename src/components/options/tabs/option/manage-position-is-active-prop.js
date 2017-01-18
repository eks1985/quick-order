import React from 'react';

import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

export default props => {
  const {options, toggleStyles, setOption} = props;
  let managePositionIsActiveProp;
  return (
    <div style={{flex: '1'}}>
      <Subheader>
        Управление активностью позиций
      </Subheader>
      <Toggle
        defaultToggled={options.managePositionIsActiveProp}
        label="Разделять номенклатурные позиции на активные и нет"
        labelPosition="right"
        style={toggleStyles.toggle}
        ref={
          (node) => {
            managePositionIsActiveProp = node;
          }
        }
        onToggle={
          () => {
            setOption("managePositionIsActiveProp", !managePositionIsActiveProp.state.switched);
          }
        }
      />
    </div>
  );
}
