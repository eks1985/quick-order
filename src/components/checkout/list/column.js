import React from 'react';
// import IconButton       from 'material-ui/IconButton';
// import IconArrowBack    from 'material-ui/svg-icons/navigation/arrow-back';
// import IconArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
// import IconArrowDown    from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
// import IconArrowUp      from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import styles from './styles';
import { format1 } from './../../../utils/format';

import ColumnHeader from './column-header';
import Code from './custom-columns/code';
import Description from './custom-columns/code';
import Price from './custom-columns/code';
import Qty from './custom-columns/code';
import Delete from './custom-columns/delete';

// export default ({
//   columnsKeys,
//   columnKey, //name of column
//   i, //number of column 
//   items,
//   catalogListSettings,
//   headerSettingsMode,
//   sortDirection,
//   //actions
//   moveHeaderColumn,
//   addCatalogQty,
//   setCurentGuid,
//   setModal,
//   removeFromCart,
//   removeCatalogQty,
//   addToCart,
//   setFocused,
//   sortGoods
// }) => {

export default (props) => {
  
  const { columnKey, columnsKeys, columnsQty, items, i, moveHeaderColumn, headerSettingsMode } = props;
  
  const itemsIds = Object.keys(items);
  
  const sortable = false;

  const customColumn = ['code', 'description', 'price', 'qty'].indexOf(columnKey) > - 1;

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
  
  const getCustomItemJsx = (key, i) => {
    const p = { key, i, items, columnKey, applyVertBorder, applyZebra };
    const pCode = { ...p, rowStyle };
    const pDescription = { ...p };
    const pPrice = { ...p };
    const pQty = { ...p};
    switch (columnKey) {
      case 'code':
        return <div>Code is here</div>;
        // return <Code {...pCode} /> ;
      case 'description':
        return <div>Description is here</div>;
        // return <Description {...pDescription} /> ;
      case 'price':
        return <div>Price is here</div>;
        // return <Price {...pPrice} /> ;
      case 'qty':
        return <div>Qty is here</div>;
        // return <Qty {...pQty} /> ;
      default:
         return <div>Delete is here</div>;
        // return <Delete {...p} /> ;
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

  const headerProps = { headerSettingsMode, columnsKeys, columnKey, columnsQty, i, moveHeaderColumn };

  return (
    <div style={prepareStyle()}>
      <div style={sortable ? { ...headerStyle.container, cursor: 'pointer' } : headerStyle.container }>
        <ColumnHeader {...headerProps} />
      </div>
      {/*{getItemsJsx()} */}
    </div>
  );

};
