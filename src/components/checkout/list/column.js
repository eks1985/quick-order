import React, { PropTypes } from 'react';
import styles from './styles';
import { format1 } from './../../../utils/format';

import ColumnHeader from './column-header';
import Code from './custom-columns/code';
import Description from './custom-columns/description';
import Price from './custom-columns/price';
import Amount from './custom-columns/amount';
import Qty from './custom-columns/qty';
import Delete from './custom-columns/delete';

const CheckoutListColumn = props => {

  const {
    columnKey,
    columnsKeys,
    columnsQty,
    items,
    goodsItems,
    visibleItemsIds,
    i,
    headerSettingsMode,
    catalogQty,
    currentCheckout,
    sortDirection,
    catalogListColumns,
    // actions
    moveHeaderColumnCheckout,
    addCatalogQty,
    removeCatalogQty,
    addToCart,
    removeFromCart,
    setCurentGuidCheckout,
    setModal,
    setFocusedCheckout,
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
    let style;
    if (styles.columnStyle[columnKey]) {
      style = { ...styles.columnStyle.common, ...styles.columnStyle[columnKey], borderLeft: '2px solid #eee', borderBottom: '2px solid #eee' };
    } else {
      style = { ...styles.columnStyle.common, borderLeft: '2px solid #eee',  borderBottom: '2px solid #eee' };
    }
    if (i === columnsQty - 1) {
      style = { ...style, borderRight: '2px solid #eee'};
    }
    return style;
  };

  // Work with styles <

  const getCustomItemJsx = (key, rowIndex) => {
    const p            = { rowStyle, keyProp: key, rowIndex, items, goodsItems, columnKey, applyVertBorder, applyZebra, setCurentGuidCheckout, currentCheckout };
    const pCode        = { ...p  };
    const pDescription = { ...p, setModal };
    const pPrice       = { ...p, format1 };
    const pQty         = { ...p, catalogQty, styles, addCatalogQty, addToCart, removeCatalogQty, removeFromCart, setFocusedCheckout, setModal };
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
    const applyCurrentRowBorder = style => {
      let extendedStyle = { ...style, background: 'rgba(255, 215, 0, 0.2)' };
      return currentCheckout === rowIndex ? { ...style, ...extendedStyle }: style;
    }
    let style = applyCurrentRowBorder(applyZebra(rowStyle.common, rowIndex));
    return (
      <div key={`${key}${columnKey}`} style={style}>
        {goodsItems[key][columnKey]}
      </div>
    );
  };

  const getItemsJsx = () => itemsIds.map( (key, rowIndex) => customColumn ?  getCustomItemJsx(key, rowIndex) : getItemJsx(key, rowIndex));

  const headerProps = { headerSettingsMode, columnsKeys, columnKey, columnsQty, i, moveHeaderColumnCheckout, sortDirection, catalogListColumns, setModal };

  return (
    <div style={prepareStyle()}>
      <div style={sortable ? { ...headerStyle.container, cursor: 'pointer' } : headerStyle.container }>
        <ColumnHeader {...headerProps} />
      </div>
      {getItemsJsx()}
    </div>
  );

};

CheckoutListColumn.propTypes = {
  catalogListColumns: PropTypes.object
}

export default CheckoutListColumn;
