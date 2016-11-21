import React from 'react';
import { connect } from 'react-redux';
import * as goodsGroupsActions from './../../../actions/goods-groups';
import Paper from 'material-ui/Paper';

const GoodsGroups =  ({
  items,
  // actions
  filterGoodsByGroup
}) => {
  const style = {
    // border: '1px solid gray',
    flex: '1 0 auto',
    padding: '10px'
  };

  const getItemsJsx = () => {
    const keys = Object.keys(items);
    return keys.map( key => {
        return (
          <div key={key}>
            <a
              href="#"
              onClick={
                () => {
                  filterGoodsByGroup(key);
                }
              }
            >
              {items[key]}
            </a>
          </div>
        )
    });
  }

  return (
    <Paper className='goodsCategories' style={style} rounded={false} zDepth={2}>
      {getItemsJsx()}
    </Paper>
  );
};

export default connect(
  state => ({items: state.goodsGroups}),
  goodsGroupsActions
)(GoodsGroups);
