import React from 'react';

import Toggle from 'material-ui/Toggle';

export default props => {
  const {options, toggleStyles, setOption} = props;
  let showNoActivePosition;
  return (
    <div style={{flex: '1'}}>
      <Toggle
        disabled={!options.managePositionIsActiveProp}
        defaultToggled={options.showNoActivePosition}
        label="Показывать Не активные позиции"
        labelPosition="right"
        style={toggleStyles.toggle}
        ref={
          (node) => {
            showNoActivePosition = node;
          }
        }
        onToggle={
          () => {
            setOption("showNoActivePosition", !showNoActivePosition.state.switched);
          }
        }
      />
    </div>
  );
}
