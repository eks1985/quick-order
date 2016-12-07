import React from 'react';
import { connect } from 'react-redux';
import * as goodsGroupsActions from './../../../actions/goods-groups';
import { getFiltersByIds } from './../../../store/reducers/goods-groups';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
// import throttle from 'lodash/throttle';
import './style.css';

const GoodsGroups =  ({
  items,
  filters,
  // actions
  filterGoodsByGroup,
  filterGoodsGroupsByText,
  addFilter,
  removeFilter,
  resetFilters
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
              () => {
                // filterGoodsByGroup(key);
                addFilter(key);
              }
            }
          />
        );
    });
  };

  const getFilterJsx = (filterKey, filterDescr) => {
    return (
      <Chip
        className='goodsGroupChip'
        key={filterKey}
        onRequestDelete={
          () => {
            removeFilter(filterKey);
          }
        }
        style={{margin: 2, height: '24px', justifyContent: 'space-between', maxWidth: '100%', whiteSpace: 'initial'}}
        labelStyle={{fontSize: '12px', lineHeight: '24px', maxWidth: '90%', overflow: 'hidden',  whiteSpace: 'initial'}}
      >
        {filterDescr}
      </Chip>
    );
  };

  const getFiltersJsx = () => {
    return Object.keys(filters).map(filterKey => getFilterJsx(filterKey, filters[filterKey]));
  };

  return (
    <Paper className='goodsCategories' style={style} rounded={false} zDepth={2}>
      <List>
        <div style={{paddingLeft: '10px'}}>
          <TextField
            placeholder='фильтр категорий'
            className='search'
            id='searchGoodsGroups'
            autoFocus
            type="text"
            onChange={
              (e) => {
                filterGoodsGroupsByText(e.target.value);
              }
            }
          />
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {getFiltersJsx()}
          </div>
        </div>
        <ListItem
          innerDivStyle={{padding: '5px 10px 5px 10px'}}
          style={{fontSize: '13px', fontWeight: 'bold', marginTop: '4px'}}
          key={9999}
          primaryText='Все категории'
          onClick={
            () => {
              // filterGoodsByGroup('');
              resetFilters();
            }
          }
        />
        {getItemsStyledJsx()}
      </List>
    </Paper>
  );
};

export default connect(
  state => ({ items: state.goodsGroups.items, filters: getFiltersByIds(state.goodsGroups.itemsInitial, state.goodsGroups.filtersIds) }),
  goodsGroupsActions
)(GoodsGroups);
