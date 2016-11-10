import React from 'react';
import { connect } from 'react-redux';

const GoodsGroups =  ({
  items
}) => {
  const style = {
    border: '1px solid gray',
    flex: '1 0 auto',
    padding: '10px'
  };

  const getItemsJsx = () => {
    const keys = Object.keys(items);
    return keys.map( key => {
        return (
          <div key={key}>
            <a href="#" >{items[key]}</a>
          </div>
        )
    });
  }

  return (
    <div className='goodsCategories' style={style}>
      {getItemsJsx()}
    </div>
  );
};

export default connect(
  state => ({items: state.goodsGroups})
)(GoodsGroups);
