import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import styles from './styles';
import { ListItem } from 'material-ui/List';
import { format1 } from './../../../../utils/format';

export default ({
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

  const customColumn = ['code', 'description', 'price', 'qty'].indexOf(columnKey) > - 1;

  const { arrowStyle,  incDecSmallQtyPane, qtyInputStyle, zebraStyle, headerStyle } = styles;
  
  const columnNames = {
    code: 'Код',
    description: 'Наименование',
    price: 'Цена',
    qty: 'Количество',
    brand: 'Бренд',
    add: '',
  };

  const getCodeJsx = (key, i) => {
    let style = {display: 'flex', height: '40px', alignItems: 'center', padding: '6px'};
    style = i % 2 === 0 ? style : { ...style, ...zebraStyle };
    return (
      <div key={`${key}${columnKey}`} style={style}>
        {items[key].code}
      </div>
    );
  };
  const getDescriptionJsx = (key, i) => {
    let style = {display: 'flex', height: '40px', alignItems: 'center', padding: '3px'};
    style = i % 2 === 0 ? style : { ...style, ...zebraStyle };
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
    let style = {display: 'flex', height: '40px', alignItems: 'center', padding: '3px', justifyContent: 'flex-end'};
    style = i % 2 === 0 ? style : { ...style, ...zebraStyle };
    return (
      <div key={`${key}${columnKey}`} style={style}>
        {format1(prices[key] || 100, '')}
      </div>
    );
  };
  const getQtyJsx = (key, i) => {
    let style = {display: 'flex', height: '40px', alignItems: 'center', padding: '3px', justifyContent: 'center'};
    style = i % 2 === 0 ? style : { ...style, ...zebraStyle };
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
    let style = {display: 'flex', height: '40px', alignItems: 'center', padding: '3px', justifyContent: 'flex-start'};
    style = i % 2 === 0 ? style : { ...style, ...zebraStyle };
    return (
      <div key={`${key}${columnKey}`} style={style}>
        {items[key][columnKey]}
      </div>
    );
  };

  const getItemsJsx = () => {
    return itemsIds.map( (key, i) => customColumn ?  getCustomItemJsx(key, i) : getItemJsx(key, i));
  };

  const getHeaderColumnJsx = (columnName, i, length) => {
    return (
      <div key={columnName} style={{display: 'flex', alignItems: 'center'}} >
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
        <div>
          {columnNames[columnName]}
        </div>
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
      <div style={{display: 'flex'}}>
        {getHeaderColumnJsx(columnKey, i, columnsQty)}
      </div>
    );
  };

  const prepareStyle = () => {
    if (styles.columnStyle[columnKey]) {
      return { ...styles.columnStyle.common, ...styles.columnStyle[columnKey] };
    } else {
      return styles.columnStyle.common;
    }
  };

  return (
    <div style={prepareStyle()}>
      <div style={columnKey === 'code' || columnKey === 'description' ? { ...headerStyle.container, cursor: 'pointer' } : headerStyle.container }
        onClick={
          ()=>{
            sortGoods(columnKey);
          }
        }
      >
        {getHeaderJsx()}
      </div>
      {getItemsJsx()}
    </div>
  );

};
