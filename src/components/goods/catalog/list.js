import React from 'react';
import { connect } from 'react-redux';
import { getGoodsVisibleIds } from './../../../store/reducers/goods';

const List = ({
  items,
  itemsIds
}) => {
  // console.log("render list");
  const style = {
    overflowY: 'scroll',
    maxHeight: '70vh',
    paddingTop: '10px'
  }
  const getItemsJsx = () => {
    // const keys = Object.keys(items);
    return itemsIds.map( key => {
      return (
        <div key={key}>{`${items[key].code}  ${items[key].description}`}</div>
      );
    });
  }
  return (
    <div style={style}>
      {getItemsJsx()}
    </div>
  );
}

export default connect(
  state => ({items: state.goods.items, itemsIds: getGoodsVisibleIds(state.goods)})
)(List);
