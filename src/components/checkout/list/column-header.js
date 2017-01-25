import React, { PropTypes } from 'react';
import styles from './styles';

import IconButton       from 'material-ui/IconButton';
import IconArrowBack    from 'material-ui/svg-icons/navigation/arrow-back';
import IconArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import IconArrowDown    from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import IconArrowUp      from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

const Header = (props) => {

  const { arrowStyle, arrowSortStyle }  = styles;

  const { headerSettingsMode, columnsKeys, columnKey, columnsQty, i, moveHeaderColumnCheckout } = props;

  const columnNames = {
    code: 'Код',
    description: 'Наименование',
    price: 'Цена',
    qty: 'Количество',
    brand: 'Бренд',
    amount: 'Сумма',
  };

  const getArrowJsx = (direction) => {
    return (
      <IconButton
          style={arrowStyle.button}
          iconStyle={arrowStyle.icon}
          onClick={
            ()=>{
              moveHeaderColumnCheckout(columnsKeys, columnKey, direction);
            }
          }
        >
        {direction === 'back' ? <IconArrowBack /> : <IconArrowForward />}
      </IconButton>
    );
  };

  const getSortArrowIconJsx = (direction) => {
    return (
      <IconButton
        style={arrowSortStyle.button}
        iconStyle={direction === '' ? { ...arrowSortStyle.icon, fill: '#aaa' } : arrowSortStyle.icon}
        id='sortIcon'
        onClick={
          ()=>{
            // sortable && sortGoods(columnKey);
          }
        }
      >
        { (direction === 'forward' || direction === '') && <IconArrowDown /> }
        { direction === 'reverse' && <IconArrowUp /> }
    </IconButton>
    );
  };

  const getSortArrowJsx = () => {
    const sortDirection = { code: false, description: false, price: false, qty: false, delete: false};
    return (
      <div>
        { sortDirection[columnKey] === '' && getSortArrowIconJsx('') }
        { sortDirection[columnKey] && sortDirection[columnKey] === 'forward' && getSortArrowIconJsx('forward') }
        { sortDirection[columnKey] && sortDirection[columnKey] === 'reverse' && getSortArrowIconJsx('reverse') }
      </div>
    );
  };

  const getHeaderColumnJsx = () => {
    return (
      <div key={columnKey} style={{display: 'flex', alignItems: 'center'}} >
        {headerSettingsMode && i > 0 &&
          getArrowJsx('back')
        }
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div
            onClick={
              ()=>{
                // sortable && sortGoods(columnKey);
              }
            }
          >
            {columnNames[columnKey]}
          </div>
          {getSortArrowJsx()}
        </div>
        {headerSettingsMode && i + 1 < columnsQty &&
          getArrowJsx('forward')
        }
      </div>
    );
  };

  const getHeaderJsx = () => {
    return (
      <div style={{display: 'flex'}}>
        {getHeaderColumnJsx()}
      </div>
    );
  };

  return getHeaderJsx();

};

Header.propTypes = {
  headerSettingsMode: PropTypes.bool.isRequired,
  columnsKeys: PropTypes.array.isRequired,
  columnKey: PropTypes.string.isRequired,
  columnsQty: PropTypes.number.isRequired,
  i: PropTypes.number.isRequired,
  moveHeaderColumnCheckout: PropTypes.func.isRequired
};

export default Header;
