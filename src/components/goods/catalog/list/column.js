import React from 'react';
import { connect } from 'react-redux';
import IconButton       from 'material-ui/IconButton';
import IconArrowBack    from 'material-ui/svg-icons/navigation/arrow-back';
import IconArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import IconArrowDown    from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import IconArrowUp      from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import IconFilter       from 'material-ui/svg-icons/content/filter-list';
import { getIndexByColName } from './../../../../actions/indexes';
import styles from './styles';
import { format1 } from './../../../../utils/format';
import img1 from './../../../../image.jpg';
import './columns.css';

const CatalogColumn = ({
  columnsKeys,
  columnKey, //name of column
  i, //number of column
  columnsQty,
  items,
  itemsIds,
  cartItems,
  catalogQty,
  prices,
  catalogListSettings,
  catalogListColumns,
  headerSettingsMode,
  sortDirection,
  currentId,
  options,
  filtersApplied,
  customColumn,
  hasFilter,
  usePrices,
  //actions
  moveHeaderColumn,
  addCatalogQty,
  setCurentGuid,
  setModal,
  removeFromCart,
  removeCatalogQty,
  addToCart,
  sortGoods,
  setFocused
}) => {

  const lastColumn = catalogListSettings.indexOf(columnKey) === columnsQty - 1;

  const sortable = sortDirection[columnKey] !== undefined;

  // const customColumn = ['code', 'description', 'price', 'qty'].indexOf(columnKey) > - 1;

  const { arrowStyle, arrowSortStyle, incDecSmallQtyPane, qtyInputStyle, zebraStyle, headerStyle, rowStyle, vertBorderLeft, vertBorderRight } = styles;

  const columnNames = {
    code: 'Код',
    description: 'Наименование',
    price: 'Цена',
    qty: 'Количество',
    brand: 'Бренд',
    add: '',
  };

  const applyZebra = (style, rowIndex) => {
    let extStyle = style;
    extStyle = rowIndex % 2 === 0 ? extStyle : { ...extStyle, ...zebraStyle };
    extStyle = rowIndex === itemsIds.length - 1 ? { ...extStyle, borderBottom: '2px solid #eee' } : extStyle;
    return extStyle;
  }

  const applyCurrentRowBorder = (style, rowIndex) => {
    let extendedStyle = { ...style, background: 'rgba(255, 215, 0, 0.2)' };
    return currentId === rowIndex ? { ...style, ...extendedStyle }: style;
  }

  const getCodeJsx = (key, rowIndex) => {
    let style = applyCurrentRowBorder(applyZebra(rowStyle.code, rowIndex), rowIndex);
    return (
      <div
        className='row-cell'
        key={`${key}${columnKey}`}
        style={style}
        onClick={
          () => {
            document.getElementById(rowIndex).focus();
          }
        }
      >
        {items[key].code}
      </div>
    );
  };
  const getDescriptionJsx = (key, rowIndex) => {
    let style = applyCurrentRowBorder(applyZebra(rowStyle.description, rowIndex), rowIndex);
    return (
      <div
        className='row-cell'
        key={`${key}${columnKey}`}
        tabIndex={-1}
        style={style}
        onClick={
          () => {
            document.getElementById(rowIndex).focus();
          }
        }
      >
        {options.showPictures.row &&
          <div
            style={{
              height: '38px',
              width: '38px',
              marginLeft: '-3px',
              backgroundImage: `url(${img1})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          />
        }
        <a
          tabIndex={-1}
          href="#"
          style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.870588)'}}
          onDoubleClick={
            () => {
              setModal({ content: 'goodsCard', fullScreen: true, showClose: false, style: { background: '#fff' }, data: { source: 'catalog'} });
            }
          }
        >
          <div style={{padding: '5px'}} className='goodsDescr'>
            {items[key].description}
          </div>
        </a>
      </div>
    );
  };
  const getPriceJsx = (key, rowIndex) => {
    let style = applyCurrentRowBorder(applyZebra(rowStyle.price, rowIndex), rowIndex);
    return (
      <div
        className='row-cell'
        key={`${key}${columnKey}`}
        style={style}
        onClick={
          () => {
            document.getElementById(rowIndex).focus();
          }
        }
      >
        {format1(prices[key] || 0, '')}
      </div>
    );
  };
  const getQtyJsx = (key, rowIndex) => {
    let style = applyCurrentRowBorder(applyZebra(rowStyle.qty, rowIndex), rowIndex);
    return (
      <div
        className='row-cell'
        key={`${key}${columnKey}`}
        style={style}
        onClick={
          () => {
            document.getElementById(rowIndex).focus();
          }
        }
      >
        <div
          style={incDecSmallQtyPane}
          onClick={
            () => {
              if (catalogQty[key]) {
                const v = catalogQty[key] - 1;
                if (v === 0) {
                  removeFromCart(key);
                  removeCatalogQty(key);
                } else {
                  addCatalogQty(key, v);
                  addToCart(key, v, prices[key]);
                }
              }
            }
          }
        ></div>
        <input
          type='text'
          id={rowIndex}
          className='catalogQtyInput'
          style={qtyInputStyle}
          value={catalogQty[key] || ''}
          onFocus={
            () => {
              setCurentGuid(key, 'catalog row qty input on focus');
              setFocused(rowIndex);
            }
          }
          onChange={
            (e) => {
              const val = parseInt(e.target.value, 10) ? parseInt(e.target.value, 10) : '';
              addCatalogQty(key, val);
              addToCart(key, val, prices[key]);
              if (val === '') {
                removeFromCart(key);
                removeCatalogQty(key);
              }
            }
          }
        >
        </input>
        <div
          style={incDecSmallQtyPane}
          onClick={
            () => {
              const v = catalogQty[key] ? catalogQty[key] + 1 :  1;
              addCatalogQty(key, v);
              addToCart(key, v, prices[key]);
            }
          }
        >
        </div>
      </div>
    );
  };
  const getCustomItemJsx = (key, rowIndex) => {
    switch (columnKey) {
      case 'code':
        return getCodeJsx(key, rowIndex);
      case 'description':
        return getDescriptionJsx(key, rowIndex);
      case 'price':
        return getPriceJsx(key, rowIndex);
      case 'qty':
        return getQtyJsx(key, rowIndex);
      default:
        return <div></div>;
    }
  };

  const getItemJsx = (key, rowIndex) => {
    let style = applyCurrentRowBorder(applyZebra(rowStyle.common, rowIndex), rowIndex);
    return (
      <div
        className='row-cell and more'
        key={`${key}${columnKey}`}
        style={style}
        onClick={
          () => {
            document.getElementById(rowIndex).focus();
            setFocused(rowIndex);
          }
        }
      >
        {items[key][columnKey]}
      </div>
    );
  };

  const getItemsJsx = () => itemsIds.map( (key, rowIndex) => customColumn ?  getCustomItemJsx(key, rowIndex) : getItemJsx(key, rowIndex) );

  // Header >

  const getArrowJsx = (columnName, direction) => {
    return (
      <IconButton
          style={arrowStyle.button}
          iconStyle={arrowStyle.icon}
          onClick={
            ()=>{
              moveHeaderColumn(columnsKeys, columnName, direction);
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
            (e) => {
              let data = {columnKey, sort: true, filter: false};
              if (!customColumn) {
                if (catalogListColumns[columnKey]) {
                  data.sort = catalogListColumns[columnKey][2];
                  data.filter = catalogListColumns[columnKey][1];
                }
              }
              data && setModal({}) && setModal({content: 'column-settings', x: e.pageX, y: e.pageY, style: {background: '#fff'}, data });
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

  const getHeaderColumnJsx = (columnName, i, length) => {
    return (
      <div key={columnName} style={{display: 'flex', alignItems: 'center'}} >
        {headerSettingsMode && i > 0 &&
          getArrowJsx(columnName, 'back')
        }
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div
            onClick={
              (e)=>{
                let data = {columnKey, sort: true, filter: false};
                if (columnKey === 'qty' || columnKey === 'price') {
                  data = false;
                }
                if (!customColumn) {
                  if (catalogListColumns[columnKey]) {
                    data.sort = catalogListColumns[columnKey][2];
                    data.filter = catalogListColumns[columnKey][1];
                  }
                }
                data && setModal({}) && setModal({content: 'column-settings', x: e.pageX, y: e.pageY, style: {background: '#fff'}, data });
              }
            }
          >
            {columnNames[columnName]}
          </div>
          {getSortArrowJsx()}
        </div>
        {headerSettingsMode && i + 1 < length &&
          getArrowJsx(columnName, 'forward')
        }
      </div>
    );
  };

  const getHeaderJsx = () => {
    return (
      <div style={{display: 'flex'}}>
        {getHeaderColumnJsx(columnKey, i, columnsQty)}
      </div>
    );
  };

  // Header <

  const prepareStyle = () => {
    const extendRightBorder = lastColumn ? vertBorderRight : {};
    if (styles.columnStyle[columnKey]) {
      return { ...styles.columnStyle.common, ...styles.columnStyle[columnKey], ...vertBorderLeft, ...extendRightBorder };
    } else {
      return { ...styles.columnStyle.common, ...vertBorderLeft, ...extendRightBorder };
    }
  };

  // if (!usePrices && columnKey === 'price') {
  //   return null;
  // }

  return (
    <div style={prepareStyle()}>
      <div style={sortable ? { ...headerStyle.container, cursor: 'pointer' } : headerStyle.container }
      >
        {getHeaderJsx()}
      </div>
      {getItemsJsx()}
    </div>
  );

};

export default connect(
  (state, ownProps) => {
    let hasFilter = false;
    const { filtersApplied } = state;
    const { columnKey } = ownProps;
    const customColumn = ['code', 'description', 'price', 'qty'].indexOf(columnKey) > - 1;
    if (customColumn) {
      hasFilter = false;
    } else {
      const indexSort = getIndexByColName(state, ownProps.columnKey);
      hasFilter = filtersApplied[columnKey] && filtersApplied[columnKey].length !== indexSort.length;
    }
    const usePrices = state.options.managePrices !== 'dontUse';
    return { customColumn, hasFilter, usePrices };
  }
)(CatalogColumn);
