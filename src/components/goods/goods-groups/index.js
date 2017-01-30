import React from 'react';
import { connect } from 'react-redux';
import * as goodsGroupsActions from './../../../actions/goods-groups';
import * as goodsActions from './../../../actions/goods';
import { getGoodsGroupsByIds } from './../../../store/reducers/goods-groups';
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
  search,
  filterGoodsGroupsByText,
  addFilter,
  removeFilter,
  resetFilters,
  current,
  categoryLineSeparator
}) => {
  const style = {
    flex: '1 0 auto',
    padding: '10px',
    // height: '60vh',
    height: '30vh',
    overflowY: 'scroll',
    paddingTop: '3px'
  };

  let clearFilterStyle = {
    fontSize: '13px',
    fontWeight: 'bold',
    marginTop: '4px'
  }
  clearFilterStyle = categoryLineSeparator ? { ...clearFilterStyle, borderBottom: '1px solid #eee' } : clearFilterStyle;

  let categoryItemStyle = {
    fontSize: '13px'
  }
  categoryItemStyle = categoryLineSeparator ? { ...categoryItemStyle, borderBottom: '1px solid #eee' } : categoryItemStyle;

  const getItemsStyledJsx = () => {
    const keys = Object.keys(items);
    return keys.map( key => {
        return (
          <ListItem
            innerDivStyle={{padding: '5px 10px 5px 10px'}}
            style={categoryItemStyle}
            key={key}
            primaryText={items[key]}
            onClick={
              () => {
                addFilter(key);
                search();
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
            search();
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
            // autoFocus
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
          style={clearFilterStyle}
          key={9999}
          primaryText='Все категории'
          onClick={
            () => {
              resetFilters();
              search();
            }
          }
        />
        {getItemsStyledJsx()}
      </List>
    </Paper>
  );
};

export default connect(
  state => {
    const items = state.goodsGroups.items;
    const filters = getGoodsGroupsByIds(state.goodsGroups.itemsInitial, state.goodsGroups.filtersIds);
    const current = state.current;
    const categoryLineSeparator = state.options.categoryLineSeparator;
    return { items, filters, current, categoryLineSeparator };
  },
  { ...goodsGroupsActions, ...goodsActions }
)(GoodsGroups);
