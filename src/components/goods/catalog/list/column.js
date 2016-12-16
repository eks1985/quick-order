import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconDone from 'material-ui/svg-icons/action/done';
import IconArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import styles from './styles1';

export default ({
  columnKey,
  i,
  columnsQty,
  items,
  itemsIds,
  cartItems,
  prices,
  catalogQty,
  catalogListSettings,
  headerSettingsMode,
  moveHeaderColumn,
  setHeaderSettingsMode,
  removeHeaderSettingsMode
}) => {
  
  const getItemsJsx = () => {
    return (
      <div>{getItemJsx()}</div>
    );
  };
  
  const getItemJsx = () => {
    return (
      <div></div>
    );
  };
  
  const { headerStyle, arrowStyle, headerSettingsIBStyle, headerSettingsIconStyle } = styles;
  const columnNames = {
    code: 'Код',
    description: 'Наименование',
    price: 'Цена',
    qty: 'Количество',
    add: '',
  };
  
  const getHeaderColumnJsx = (columnName, i, length) => {
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
  
  
  const getHeaderJsx = () => {
    return (
      <div style={headerStyle.container}>
        {getHeaderColumnJsx(columnKey, i, columnsQty)}
      </div>
    );
  };
  
  return (
    <div>
      {getHeaderJsx()}
      {false && getItemsJsx()}
    </div>  
  );
  
};