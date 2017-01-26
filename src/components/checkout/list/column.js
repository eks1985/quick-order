import React from 'react';
import styles from './styles';
import { format1 } from './../../../utils/format';

import ColumnHeader from './column-header';
import Code from './custom-columns/code';
import Description from './custom-columns/description';
import Price from './custom-columns/price';
import Amount from './custom-columns/amount';
import Qty from './custom-columns/qty';
import Delete from './custom-columns/delete';

export default (props) => {

  const {
    columnKey,
    columnsKeys,
    columnsQty,
    items,
    visibleItemsIds,
    i,
    headerSettingsMode,
    catalogQty,
    currentCheckout,
    // actions
    moveHeaderColumnCheckout,
    addCatalogQty,
    removeCatalogQty,
    addToCart,
    removeFromCart,
    setCurentGuidCheckout,
    setModal,
    setFocusedCheckout
  } = props;

  const itemsIds = visibleItemsIds;

  const sortable = false;

  const customColumn = ['code', 'description', 'price', 'qty', 'amount', 'delete'].indexOf(columnKey) > - 1;

  // Work with styles >

  const { zebraStyle, headerStyle, rowStyle } = styles;

  const applyZebra = (style, i) => i % 2 === 0 ? style : { ...style, ...zebraStyle };

  const applyVertBorder = (style) => {
    switch (i) {
      case 1:
        return { ...style, border: '1px solid #eee'};
      default:
        return style;
    }
  };

  const prepareStyle = () => {
    if (styles.columnStyle[columnKey]) {
      return { ...styles.columnStyle.common, ...styles.columnStyle[columnKey] };
    } else {
      return styles.columnStyle.common;
    }
  };

  // Work with styles <

  const getCustomItemJsx = (key, rowIndex) => {
    const p            = { rowStyle, keyProp: key, rowIndex, items, columnKey, applyVertBorder, applyZebra, setCurentGuidCheckout, currentCheckout };
    const pCode        = { ...p  };
    const pDescription = { ...p, setModal };
    const pPrice       = { ...p, format1 };
    const pQty         = { ...p, catalogQty, styles, addCatalogQty, addToCart, removeCatalogQty, removeFromCart, setFocusedCheckout };
    const pDelete      = { ...p, removeFromCart, removeCatalogQty };
    switch (columnKey) {
      case 'code':
        return <Code key={key+columnKey} {...pCode} /> ;
      case 'description':
        return <Description key={key+columnKey} {...pDescription} /> ;
      case 'price':
        return <Price key={key+columnKey} {...pPrice} /> ;
      case 'amount':
        return <Amount key={key+columnKey} {...pPrice} /> ;
      case 'qty':
        return <Qty key={key+columnKey} {...pQty} /> ;
      case 'delete':
        return <Delete key={key+columnKey} {...pDelete} /> ;
      default:
        return <div></div> ;
    }
  };

  const getItemJsx = (key, rowIndex) => {
    let style = applyZebra(rowStyle.common, i);
    return (
      <div key={`${key}${columnKey}`} style={style}>
        {items[key][columnKey]}
      </div>
    );
  };

  const getItemsJsx = () => itemsIds.map( (key, rowIndex) => customColumn ?  getCustomItemJsx(key, rowIndex) : getItemJsx(key, rowIndex));

  const headerProps = { headerSettingsMode, columnsKeys, columnKey, columnsQty, i, moveHeaderColumnCheckout };

  return (
    <div style={prepareStyle()}>
      <div style={sortable ? { ...headerStyle.container, cursor: 'pointer' } : headerStyle.container }>
        <ColumnHeader {...headerProps} />
      </div>
      {getItemsJsx()}
    </div>
  );

};
