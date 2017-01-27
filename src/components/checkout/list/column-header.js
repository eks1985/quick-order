import React, { PropTypes } from 'react';
import styles from './styles';

import IconButton       from 'material-ui/IconButton';
import IconArrowBack    from 'material-ui/svg-icons/navigation/arrow-back';
import IconArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import IconArrowDown    from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import IconArrowUp      from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

const Header = (props) => {

  const { arrowStyle, arrowSortStyle }  = styles;

  const { headerSettingsMode, columnsKeys, columnKey, columnsQty, i, moveHeaderColumnCheckout, sortDirection, setModal } = props;

  const sortable = sortDirection[columnKey] !== undefined;

  // const customColumn = ['code', 'description', 'price', 'qty', 'amount', 'delete'].indexOf(columnKey) > - 1;

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
    // return (
    //   <IconButton
    //     style={arrowSortStyle.button}
    //     iconStyle={direction === '' ? { ...arrowSortStyle.icon, fill: '#aaa' } : arrowSortStyle.icon}
    //     id='sortIcon'
    //     onClick={
    //       ()=>{
    //         // sortable && sortGoods(columnKey);
    //       }
    //     }
    //   >
    //     { (direction === 'forward' || direction === '') && <IconArrowDown /> }
    //     { direction === 'reverse' && <IconArrowUp /> }
    // </IconButton>
    // );

    const iconStyle = direction === '' ? { ...arrowSortStyle.icon, fill: '#aaa' } : arrowSortStyle.icon;
    return (
        <div
          onClick={
            (e)=>{
              let data = {columnKey, sort: true, filter: false};
              if (columnKey === 'qty' || columnKey === 'price' || columnKey === 'amount' || columnKey === 'delete') {
                data = false;
              }
              // if (!customColumn) {
              //   if (catalogListColumns[columnKey]) {
              //     data.sort = catalogListColumns[columnKey][2];
              //     data.filter = catalogListColumns[columnKey][1];
              //   }
              // }
              data && setModal({}) && setModal({content: 'column-settings-checkout', x: e.pageX, y: e.pageY, style: {background: '#fff'}, data });
            }
          }
        >
          { (direction === 'forward' || direction === '') && <IconArrowDown style={iconStyle} /> }
          { direction === 'reverse' && <IconArrowUp style={iconStyle} /> }
        </div>
    );

  };

  const getSortArrowJsx = () => {
    // const sortDirection = { code: false, description: false, price: false, qty: false, delete: false};
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
              (e)=>{
                let data = {columnKey, sort: true, filter: false};
                if (columnKey === 'qty' || columnKey === 'price' || columnKey === 'amount' || columnKey === 'delete') {
                  data = false;
                }
                // if (!customColumn) {
                //   if (catalogListColumns[columnKey]) {
                //     data.sort = catalogListColumns[columnKey][2];
                //     data.filter = catalogListColumns[columnKey][1];
                //   }
                // }
                data && setModal({}) && setModal({content: 'column-settings-checkout', x: e.pageX, y: e.pageY, style: {background: '#fff'}, data });
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
      <div style={sortable ? {display: 'flex', cursor: 'pointer'} :  {display: 'flex'}}>
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
