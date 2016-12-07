import React from 'react';
import { connect } from 'react-redux';
import * as goodsGroupsActions from './../../../actions/goods-groups';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import throttle from 'lodash/throttle';

const GoodsGroups =  ({
  items,
  // actions
  filterGoodsByGroup,
  filterGoodsGroups
}) => {
  const style = {
    flex: '1 0 auto',
    padding: '10px',
    height: '60vh',
    overflowY: 'scroll',
    paddingTop: '3px'
  };

  const getItemsStyledJsx = () => {
    const keys = Object.keys(items);
    return keys.map( key => {
        return (
          <ListItem
            // style={{minHeight: '30px'}}
            innerDivStyle={{padding: '5px 10px 5px 10px'}}
            style={{fontSize: '13px'}}
            key={key}
            primaryText={items[key]}
            onClick={
              throttle(() => {filterGoodsByGroup(key)}, 5000)
            }
          />
        );
    });
  };
  return (
    <Paper className='goodsCategories' style={style} rounded={false} zDepth={2}>
      <List>
        <Subheader style={{lineHeight: '40px'}}>
          <TextField 
            placeholder='фильтр категорий'
            className='search'
            id='searchGoodsGroups'
            autoFocus 
            type="text"
            onChange={
              (e) => {
                filterGoodsGroups(e.target.value);
              }
            }
          />
        </Subheader>
        <ListItem
          innerDivStyle={{padding: '5px 10px 5px 10px'}}
          style={{fontSize: '13px', fontWeight: 'bold'}}
          key={9999}
          primaryText='Все категории'
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
  state => ({items: state.goodsGroups.items}),
  goodsGroupsActions
)(GoodsGroups);
