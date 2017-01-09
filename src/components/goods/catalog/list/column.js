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
  catalogListColumns,
  headerSettingsMode,
  sortDirection,
  currentId,
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

  const lastColumn = catalogListSettings.indexOf(columnKey) === columnsQty - 1;

  const sortable = sortDirection[columnKey] !== undefined;

  const customColumn = ['code', 'description', 'price', 'qty'].indexOf(columnKey) > - 1;

  const { arrowStyle, arrowSortStyle, incDecSmallQtyPane, qtyInputStyle, zebraStyle, headerStyle, rowStyle, vertBorderLeft, vertBorderRight } = styles;

  const columnNames = {
    code: 'Код',
    description: 'Наименование',
    price: 'Цена',
    qty: 'Количество',
    brand: 'Бренд',
    add: '',
  };

  const applyZebra = (style, rowIndex) => rowIndex % 2 === 0 ? { ...style, border: '1px solid transparent'} : { ...style, ...zebraStyle, border: '1px solid transparent' };

  const applyCurrentRowBorder = (style, rowIndex) => {
    // let extendedStyle = { ...style, borderTop: '1px solid gold', borderBottom: '1px solid gold' };
    let extendedStyle = { ...style, background: 'rgba(255, 215, 0, 0.2)' };
    // extendedStyle = firstColumn ? { ...extendedStyle, borderLeft: '1px solid gold'} : extendedStyle;
    // extendedStyle = lastColumn ? { ...extendedStyle, borderRight: '1px solid gold'} : extendedStyle;
    return currentId === rowIndex ? { ...style, ...extendedStyle }: style;
  }

  const getCodeJsx = (key, rowIndex) => {
    let style = applyCurrentRowBorder(applyZebra(rowStyle.code, rowIndex), rowIndex);
    return (
      <div
        key={`${key}${columnKey}`}
        style={style}
        onClick={
          () => {
            setFocused(rowIndex);
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
        key={`${key}${columnKey}`}
        tabIndex={-1}
        style={style}
        onClick={
          () => {
            setFocused(rowIndex);
            document.getElementById(rowIndex).focus();
          }
        }
      >
        <a
          tabIndex={-1}
          href="#"
          style={{textDecoration: 'none'}}
          onClick={
            () => {
              setCurentGuid(key);
              setModal({ content: 'goodsCard', fullScreen: true, showClose: false });
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
  const getPriceJsx = (key, rowIndex) => {
    let style = applyCurrentRowBorder(applyZebra(rowStyle.price, rowIndex), rowIndex);
    return (
      <div
        key={`${key}${columnKey}`}
        style={style}
        onClick={
          () => {
            setFocused(rowIndex);
            document.getElementById(rowIndex).focus();
          }
        }
      >
        {format1(prices[key] || 100, '')}
      </div>
    );
  };
  const getQtyJsx = (key, rowIndex) => {
    let style = applyCurrentRowBorder(applyZebra(rowStyle.qty, rowIndex), rowIndex);
    return (
      <div
        key={`${key}${columnKey}`}
        style={style}
        onClick={
          () => {
            setFocused(rowIndex);
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

  const getItemsJsx = () => itemsIds.map( (key, rowIndex) => customColumn ?  getCustomItemJsx(key, rowIndex) : getItemJsx(key, rowIndex));

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
    // return (
    //   <IconButton
    //     style={arrowSortStyle.button}
    //     iconStyle={direction === '' ? { ...arrowSortStyle.icon, fill: '#aaa' } : arrowSortStyle.icon}
    //     id='sortIcon'
    //     onClick={
    //       ()=>{
    //         sortable && sortGoods(columnKey);
    //       }
    //     }
    //   >
    //     { (direction === 'forward' || direction === '') && <IconArrowDown /> }
    //     { direction === 'reverse' && <IconArrowUp /> }
    // </IconButton>
    // );
    const iconStyle = direction === '' ? { ...arrowSortStyle.icon, fill: '#aaa' } : arrowSortStyle.icon;
    return (
        // style={arrowSortStyle.button}
        // iconStyle={direction === '' ? { ...arrowSortStyle.icon, fill: '#aaa' } : arrowSortStyle.icon}
        // id='sortIcon'
        // onClick={
        //   ()=>{
        //     sortable && sortGoods(columnKey);
        //   }
        // }
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
              data && setModal({content: 'column-settings', x: e.pageX, y: e.pageY, style: {background: '#fff'}, data });
            }
          }
        >
          { (direction === 'forward' || direction === '') && <IconArrowDown style={iconStyle} /> }
          { direction === 'reverse' && <IconArrowUp style={iconStyle} /> }
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
                // sortable && sortGoods(columnKey);
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
                data && setModal({content: 'column-settings', x: e.pageX, y: e.pageY, style: {background: '#fff'}, data });
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
