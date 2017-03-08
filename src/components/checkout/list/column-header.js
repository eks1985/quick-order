import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './styles';

import IconButton       from 'material-ui/IconButton';
import IconArrowBack    from 'material-ui/svg-icons/navigation/arrow-back';
import IconArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import IconArrowDown    from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import IconArrowUp      from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import IconFilter       from 'material-ui/svg-icons/content/filter-list';
import { getIndexByColName } from './../../../actions/indexes';

const HeaderCheckout = props => {

  const { arrowStyle, arrowSortStyle }  = styles;

  const { headerSettingsMode, columnsKeys, columnKey, columnsQty, i, moveHeaderColumnCheckout, sortDirection, setModal, catalogListColumns, hasFilter, defaultColumn } = props;

  const sortable = sortDirection[columnKey] !== undefined;

  // const defaultColumn = ['code', 'description', 'price', 'qty', 'amount', 'delete'].includes(columnKey);

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
    const iconStyle = direction === '' ? { ...arrowSortStyle.icon, fill: '#aaa' } : arrowSortStyle.icon;
    return (
        <div
          onClick={
            (e)=>{
              let data = {columnKey, sort: true, filter: false};
              if (columnKey === 'qty' || columnKey === 'price' || columnKey === 'amount' || columnKey === 'delete') {
                data = false;
              }
              if (!defaultColumn) {
                if (catalogListColumns[columnKey]) {
                  data.sort = catalogListColumns[columnKey][2];
                  data.filter = catalogListColumns[columnKey][1];
                }
              }
              (data.sort || data.filter) && setModal({}) && setModal({content: 'column-settings-checkout', x: e.pageX, y: e.pageY, style: {background: '#fff'}, data });
            }
          }
        >
          { (direction === 'forward' || direction === '') && <IconArrowDown style={iconStyle} /> }
          { direction === 'reverse' && <IconArrowUp style={iconStyle} /> }
          { hasFilter &&<IconFilter style={iconStyle} /> }
        </div>
    );

  };

  const getSortArrowJsx = () => {
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
                if (!defaultColumn) {
                  if (catalogListColumns[columnKey]) {
                    data.sort = catalogListColumns[columnKey][2];
                    data.filter = catalogListColumns[columnKey][1];
                  }
                }
                (data.sort || data.filter) && setModal({}) && setModal({content: 'column-settings-checkout', x: e.pageX, y: e.pageY, style: {background: '#fff'}, data });
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

HeaderCheckout.propTypes = {
  headerSettingsMode: PropTypes.bool.isRequired,
  columnsKeys: PropTypes.array.isRequired,
  columnKey: PropTypes.string.isRequired,
  columnsQty: PropTypes.number.isRequired,
  i: PropTypes.number.isRequired,
  moveHeaderColumnCheckout: PropTypes.func.isRequired
};

export default connect(
  (state, ownProps) => {
    let hasFilter = false;
    const { filtersAppliedCheckout } = state;
    const { columnKey } = ownProps;
    const defaultColumn = ['code', 'description', 'price', 'qty', 'amount', 'delete'].includes(columnKey);
    if (defaultColumn) {
      hasFilter = false;
    } else {
      const indexSort = getIndexByColName(state, ownProps.columnKey);
      hasFilter = filtersAppliedCheckout[columnKey] && filtersAppliedCheckout[columnKey].length !== indexSort.length;
    }
    return { defaultColumn, hasFilter };
  }
)(HeaderCheckout);
