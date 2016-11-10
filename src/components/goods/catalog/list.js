import React from 'react';
import { connect } from 'react-redux';
import { getGoodsVisible } from './../../../store/reducers/goods';

const List = ({
  items
}) => {
  const style = {
    overflowY: 'scroll',
    maxHeight: '70vh',
    paddingTop: '10px'
  }
  const getItemsJsx = () => {
    const keys = Object.keys(items);
    return keys.map( key => {
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
  state => ({items: getGoodsVisible(state.goods)})
)(List);
