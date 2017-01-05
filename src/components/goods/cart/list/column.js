import React from 'react';
import IconButton       from 'material-ui/IconButton';
import IconArrowBack    from 'material-ui/svg-icons/navigation/arrow-back';
import IconArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import IconArrowDown    from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import IconArrowUp      from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import { ListItem }     from 'material-ui/List';
import styles from './styles';
import { format1 } from './../../../../utils/format';

export default ({
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
  headerSettingsMode,
  sortDirection,
  //actions
  moveHeaderColumn,
  addCatalogQty,
  setCurentGuid,
  setModal,
  removeFromCart,
  removeCatalogQty,
  addToCart,
  setFocused,
  sortGoods
}) => {
  
  const sortable = sortDirection[columnKey] !== undefined;

  const customColumn = ['code', 'description', 'price', 'qty'].indexOf(columnKey) > - 1;

  const { arrowStyle, arrowSortStyle, incDecSmallQtyPane, qtyInputStyle, zebraStyle, headerStyle, rowStyle } = styles;
  
  const columnNames = {
    code: 'Код',
    description: 'Наименование',
    price: 'Цена',
    qty: 'Количество',
    brand: 'Бренд',
    add: '',
  };
  
  const applyZebra = (style, i) => i % 2 === 0 ? style : { ...style, ...zebraStyle };
  const applyVertBorder = (style) => {
    switch (i) {
      case 1:
        return { ...style, border: '1px solid #eee'};
      default: 
        return style;
    }
  };
  
  const getCodeJsx = (key, i) => {
    let style = applyVertBorder(applyZebra(rowStyle.code, i));
    return (
      <div key={`${key}${columnKey}`} style={style}>
        {items[key].code}
      </div>
    );
  };
  const getDescriptionJsx = (key, i) => {
    let style = applyZebra(rowStyle.description, i);
    return (
      <div key={`${key}${columnKey}`} tabIndex={-1} style={style}>
        <a
          tabIndex={-1}
          href="#"
          style={{textDecoration: 'none'}}
          onClick={
            () => {
              setCurentGuid(key);
              setModal({ content: 'goodsCard', fullScreen: true });
            }
          }
        >
          <ListItem
            tabIndex={-1}
            innerDivStyle={{padding: '10px'}}
          >
            {items[key].description}
          </ListItem>
        </a>
      </div>
    );
  };
  const getPriceJsx = (key, i) => {
    let style = applyZebra(rowStyle.price, i);
    return (
      <div key={`${key}${columnKey}`} style={style}>
        {format1(prices[key] || 100, '')}
      </div>
    );
  };
  const getQtyJsx = (key, i) => {
    let style = applyZebra(rowStyle.qty, i);
    return (
      <div key={`${key}${columnKey}`} style={style}>
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
          id={i}
          className='catalogQtyInput'
          style={qtyInputStyle}
          value={catalogQty[key] || ''}
          onFocus={
            () => {
              setFocused(key);
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
  const getCustomItemJsx = (key, i) => {
    switch (columnKey) {
      case 'code':
        return getCodeJsx(key, i);
      case 'description':
        return getDescriptionJsx(key, i);
      case 'price':
        return getPriceJsx(key, i);
      case 'qty':
        return getQtyJsx(key, i);
      default:
        return <div></div>;
    }
  };

  const getItemJsx = (key, i) => {
    let style = applyZebra(rowStyle.common, i);
    return (
      <div key={`${key}${columnKey}`} style={style}>
        {items[key][columnKey]}
      </div>
    );
  };

  const getItemsJsx = () => itemsIds.map( (key, i) => customColumn ?  getCustomItemJsx(key, i) : getItemJsx(key, i));
  
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
    return (
      <IconButton
        style={arrowSortStyle.button}
        iconStyle={direction === '' ? { ...arrowSortStyle.icon, fill: '#aaa' } : arrowSortStyle.icon} 
        id='sortIcon'
        onClick={
          ()=>{
            sortable && sortGoods(columnKey);
          }
        }
      >
        { (direction === 'forward' || direction === '') && <IconArrowDown /> }
        { direction === 'reverse' && <IconArrowUp /> }
    </IconButton>
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
              ()=>{
                sortable && sortGoods(columnKey);
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
    if (styles.columnStyle[columnKey]) {
      return { ...styles.columnStyle.common, ...styles.columnStyle[columnKey] };
    } else {
      return styles.columnStyle.common;
    }
  };

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
