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
    removeHeaderSettingsMode,
    moveHeaderColumn
}) => {
    const { headerStyle, arrowStyle, headerSettingsIBStyle, headerSettingsIconStyle } = styles;
    const columnNames = {
      code: 'Код',
      description: 'Наименование',
      price: 'Цена',
      qty: 'Количество',
      add: '',
    };
    const getColumnJsx = (columnName, i, length) => {
      return (
        <div key={columnName} style={headerStyle[columnName]}>
          {headerSettingsMode && i > 0 && 
            <IconButton 
              style={arrowStyle.button} 
              iconStyle={arrowStyle.icon}
              onClick={
                ()=>{
                  moveHeaderColumn(columnName, 'back');
                }
              }
            >
              <IconArrowBack />
            </IconButton>
          }
          <div>{columnNames[columnName]}</div>
          {headerSettingsMode && i + 1 < length && 
            <IconButton 
              style={arrowStyle.button} 
              iconStyle={arrowStyle.icon}
              onClick={
                ()=>{
                  moveHeaderColumn(columnName, 'forward');
                }
              }
            >
              <IconArrowForward />
            </IconButton>
          }
        </div>
      );  
    };
    
    const getSettingsBtnJsx = () => {
      return (
        <div style={headerSettingsIBStyle}>
          {!headerSettingsMode &&
            <IconButton 
              tabIndex={-1}
              style={headerSettingsIconStyle}
              onClick={setHeaderSettingsMode}
            >
              <IconSettings color='#ccc' />
            </IconButton>
          }
          {headerSettingsMode &&
            <IconButton 
              tabIndex={-1}
              style={headerSettingsIconStyle}
              onClick={removeHeaderSettingsMode}
            >
              <IconDone />
            </IconButton>
          }
        </div>
      );
    };
    
    return (
      <div style={headerStyle.container}>
        {getSettingsBtnJsx()}
        {catalogListSettings.map((key, i) => getColumnJsx(key, i, catalogListSettings.length))}
      </div>
    );
};