import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconDone from 'material-ui/svg-icons/action/done';
import IconArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import styles from './styles';

export default ({
    catalogListSettings,
    headerSettingsMode,
    setHeaderSettingsMode,
    removeHeaderSettingsMode
}) => {
    const { headerStyle, arrowStyle } = styles;
    const columnNames = {
      code: 'Код',
      description: 'Наименование',
      price: 'Цена',
      qty: 'Количество',
      add: '',
    };
    const getColumnJsx = (columnName) => {
      return (
        <div style={headerStyle[columnName]}>
          {headerSettingsMode && <IconButton style={arrowStyle.button} iconStyle={arrowStyle.icon}><IconArrowBack /></IconButton>}
          <div>{columnNames[columnName]}</div>
          {headerSettingsMode && <IconButton style={arrowStyle.button} iconStyle={arrowStyle.icon}><IconArrowForward /></IconButton>}
        </div>
      );  
    };
    
    const getSettingsBtnJsx = () => {
      return (
        <div style={{position: 'absolute', top: '0px', right: '5px'}}>
          {!headerSettingsMode &&
            <IconButton 
              style={{height: '24px', width:'24px', padding: '2px'}}
              onClick={setHeaderSettingsMode}
            >
              <IconSettings color='#ccc' viewBox='0 0 24 24' />
            </IconButton>
          }
          {headerSettingsMode &&
            <IconButton 
              style={{height: '24px', width:'24px', padding: '2px'}}
              onClick={removeHeaderSettingsMode}
            >
              <IconDone viewBox='0 0 24 24' />
            </IconButton>
          }
        </div>
      );
    };
    
    return (
      <div style={headerStyle.container}>
        {getSettingsBtnJsx()}
        {catalogListSettings.map(key => getColumnJsx(key))}
      </div>
    );
};