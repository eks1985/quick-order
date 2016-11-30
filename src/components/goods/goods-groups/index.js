import React from 'react';
import { connect } from 'react-redux';
import * as goodsGroupsActions from './../../../actions/goods-groups';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

const GoodsGroups =  ({
  items,
  // actions
  filterGoodsByGroup
}) => {
  const style = {
    flex: '1 0 auto',
    padding: '10px',
    height: '60vh',
    overflowY: 'scroll'
  };

  const getItemsStyledJsx = () => {
    const keys = Object.keys(items);
    return keys.map( key => {
        return (
          <ListItem
            // style={{minHeight: '30px'}}
            innerDivStyle={{padding: '10px'}}
            style={{fontSize: '12px', fontWeight: 'bold'}}
            key={key}
            primaryText={items[key]}
            onClick={
              () => {
                filterGoodsByGroup(key);
              }
            }
          />
        )
    });
  }

  return (
    <Paper className='goodsCategories' style={style} rounded={false} zDepth={2}>
      <List>
        <Subheader>Категории</Subheader>
        <ListItem
          innerDivStyle={{padding: '10px'}}
          style={{fontSize: '12px', fontWeight: 'bold'}}
          key={9999}
          primaryText='Все'
          onClick={
            () => {
              filterGoodsByGroup('');
            }
          }
        />
        {getItemsStyledJsx()}
      </List>
    </Paper>
  );
};

export default connect(
  state => ({items: state.goodsGroups}),
  goodsGroupsActions
)(GoodsGroups);
