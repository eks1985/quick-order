import React, { Component }       from 'react';
import { connect } from 'react-redux';

import Paper              from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import TextField          from 'material-ui/TextField';
import Chip               from 'material-ui/Chip';

import IconButton from 'material-ui/IconButton';
import IconClear from 'material-ui/svg-icons/content/clear';

import { getGoodsGroupsByIds } from './../../../store/reducers/goods-groups';

import { filterCartItems, addFilterGoodsGroupsCart, removeFilterGoodsGroupsCart, resetFiltersGoodsGroupsCart, setTextFilterGoodsGroups } from './../../../actions/cart';

import { getVisibleGoodsGroups } from './../../../store/reducers/cart';

import './style.css';

const GoodsGroups =  ({
  items,
  filters,
  goodsGroupsSelected,
  // actions
  filterCartItems,
  categoryLineSeparator,
  addFilterGoodsGroupsCart,
  removeFilterGoodsGroupsCart,
  resetFiltersGoodsGroupsCart,
  setTextFilterGoodsGroups,
  handleClick
}) => {

  let searchRef;

  const style = {
    flex: '1 0 auto',
    padding: '10px',
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
      const qtySelected = goodsGroupsSelected[key] ? '( ' + goodsGroupsSelected[key] + ' ) ' : '';
      return (
        <ListItem
          innerDivStyle={{padding: '5px 10px 5px 10px'}}
          style={categoryItemStyle}
          key={key}
          primaryText={qtySelected + items[key]}
          onClick={
            () => {
              handleClick(key);
              // addFilterGoodsGroupsCart(key);
              // filterCartItems();
            }
          }
          // onDoubleClick={
          //   () => {
          //     resetFiltersGoodsGroupsCart();
          //     addFilterGoodsGroupsCart(key);
          //     filterCartItems();
          //   }
          // }
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
            removeFilterGoodsGroupsCart(filterKey);
            filterCartItems();
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
          <div style={{display: 'flex', alignItems: 'center'}}>
            <TextField
              placeholder='фильтр категорий'
              className='search'
              id='searchGoodsGroupsCart'
              // autoFocus
              type="text"
              ref={
                node => {
                  searchRef = node;
                }
              }
              onChange={
                e => {
                  setTextFilterGoodsGroups(e.target.value.trim());
                }
              }
            />
            <IconButton
              style={{height: '32px', width: '32px', padding: '2px'}}
              onClick={
                () => {
                  if (searchRef.input.value !== '') {
                    searchRef.input.value = '';
                    setTextFilterGoodsGroups('');
                  } else {
                    resetFiltersGoodsGroupsCart();
                    filterCartItems();
                  }
                }
              }
            >
              <IconClear />
            </IconButton>
          </div>
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
              resetFiltersGoodsGroupsCart();
              filterCartItems();
            }
          }
        />
        {getItemsStyledJsx()}
      </List>
    </Paper>
  );
};

class GoodsGroupsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { clickTime: 0 };
  }

  handleClick = key => {
    const newClickTime = new Date();
    if (newClickTime - this.state.clickTime > 500) {
      setTimeout( () => {
        const dateNew = new Date();
        const dateOld = this.state.clickTime;
        const clickType = dateNew - dateOld > 499 ? 'single' : 'double';
        if (clickType === 'double') {
          this.props.resetFiltersGoodsGroupsCart();
        }
        this.props.addFilterGoodsGroupsCart(key);
        this.props.filterCartItems();
        this.setState({ clickTime: dateNew });
      }, 500);
    }
    this.setState({ clickTime: newClickTime });
  }

  render() {
    return <GoodsGroups {...this.props} handleClick={this.handleClick} />
  }

}

export default connect(
  state => {
    const items = getGoodsGroupsByIds(state.goodsGroups.itemsInitial, getVisibleGoodsGroups(state));
    const filters = getGoodsGroupsByIds(state.goodsGroups.itemsInitial, state.cart.filtersGoodsGroupsCartIds);
    const categoryLineSeparator = state.options.categoryLineSeparator;
    const goodsGroupsSelected = state.goodsGroupsSelected;
    return { items, filters, categoryLineSeparator, goodsGroupsSelected };
  },
  { filterCartItems, addFilterGoodsGroupsCart, removeFilterGoodsGroupsCart, resetFiltersGoodsGroupsCart, setTextFilterGoodsGroups }
)(GoodsGroupsContainer);
