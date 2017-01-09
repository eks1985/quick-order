import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as modalActions from './../lib/modal/actions/modal';
import * as goodsActions from './../actions/goods';
// import { getIndexByColName, getFilterStatusByColName, getFilterItemsByColName } from './../actions/indexes';
import { getIndexByColName } from './../actions/indexes';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import IconSort from 'material-ui/svg-icons/av//sort-by-alpha';
import IconFilter from 'material-ui/svg-icons/content/filter-list';
import IconClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconImage from 'material-ui/svg-icons/image/adjust';
import CheckboxOutline from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import CheckboxChecked from 'material-ui/svg-icons/toggle/check-box';
// import { sortGoods }

const ColumnSettings =  ({
  modal,
  indexSort,
  filterStatus,
  filterItems,
  sortDirection,
  filterText,
  filterApplied,
  //actions
  setModal,
  setFilterText,
  toggleCheckedAll,
  toggleChecked,
  toggleSortDirection,
  switchSortDirection,
  sortGoods,
  applyGoodsFilterByProp,
  clearGoodsFilterByProp,
  toggleCheckedAllAndClose,
  search
}) => {

  const filterKeys = filterText === '' ? indexSort :
    indexSort.reduce((res, key) => key.toLowerCase().includes(filterText.toLowerCase()) ? res.concat(key) : res , []);

  const { sort, filter, columnKey } = modal.data;

  const getSortJsx = () => {
    return (
      <List style={{marginTop: '5px'}}>
        <ListItem
          primaryText="Сортировка"
          leftIcon={<IconSort />}
          style={{height: '42px'}}
          // rightToggle={
          //   <Toggle
          //     toggled={sortDirection !== ''}
          //     onToggle={toggleSortDirection}
          //   />
          // }
        />
        <ListItem
          primaryText='Сортировать A - Я'
          style={sortDirection === 'forward' ? {fontWeight: 'bold'} : {}}
          onClick={
            () => {
              switchSortDirection('forward');
            }
          }
        >
        </ListItem>
        <ListItem
          primaryText='Сортировать Я - А'
          style={sortDirection === 'reverse' ? {marginBottom: '10px', fontWeight: 'bold'} : {marginBottom: '10px'}}
          onClick={
            () => {
              switchSortDirection('reverse');
            }
          }
        >
        </ListItem>
      </List>
    );
  };

  const getFilterJsx = () => {
    return (
      <List className='filter-list'>
        <Divider />
        <ListItem
          primaryText="Фильтр"
          leftIcon={<IconFilter />}
          rightToggle={
            <Toggle
              toggled={filterStatus !== 'checked'}
              onToggle={
                () => {
                  if (filterStatus !== 'checked') {
                    toggleCheckedAllAndClose();
                    // toggleCheckedAll(true);
                    // clearGoodsFilterByProp(columnKey);
                    // applyGoodsFilterByProp(filterItems, columnKey);
                    // search();
                    // setModal();
                  }
                }
              }
            />
          }
        />
        <TextField
          placeholder='поиск' id='columnFilterSearch'
          style={{width: '100%', height: '32px'}}
          underlineShow={false} inputStyle={{border: '1px solid #ddd', padding: '5px', height: '32px'}}
          value={filterText}
          onChange={
            (e) => {
              setFilterText(e.target.value);
            }
          }
        />
        <div className='filter-items-list' style={{maxHeight: '200px', overflowY: 'scroll'}}>
          <ListItem
            primaryText="Все"
            leftCheckbox={
              <Checkbox
                checkedIcon={filterStatus ? <CheckboxChecked /> : <IconImage /> }
                uncheckedIcon={filterStatus ? <CheckboxOutline /> : <IconImage />}
                checked={filterStatus === 'checked'}
                onCheck={toggleCheckedAll}
            />}
            style={{height: '32px', fontWeight: 'bold'}}
          />
          {
            filterKeys.map(key => {
              return (
                <ListItem
                  key={key}
                  primaryText={key}
                  style={{height: '32px'}}
                  leftCheckbox={
                    <Checkbox
                      checked={filterItems.includes(key)}
                      onCheck={
                        () => {
                          toggleChecked(key);
                        }
                      }
                    />
                  }
                />
              );
            })
          }
        </div>
        <FlatButton
          label='Применить'
          style={{marginTop: '12px'}}
          labelStyle={{fontWeight: 'normal'}}
          onClick={
            () => {
              applyGoodsFilterByProp(filterItems, columnKey);
              search();
              setModal();
            }
          }
        />
      </List>
    );
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', position: 'relative'}}>
      <div style={{position: 'absolute', top: '-20px', right: '-20px'}}>
        <IconButton
          iconStyle={{fill: '#999'}}
          onClick={
            () => {
              setModal();
            }
          }
        >
          <IconClose />
        </IconButton>
      </div>
      {sort && getSortJsx()}
      {filter && getFilterJsx()}
    </div>
  );
};

class ColumnSettingsContainer extends Component {

  constructor (props) {
    super(props);
    const filterItems = props.filterApplied === undefined ? [ ...props.indexSort ] : props.filterApplied;
    const filterStatus = props.indexSort.length === filterItems.length ? 'checked' : 'unchecked';
    this.state = { filterStatus, filterItems, sortDirection: this.props.sortDirection, filterText: '' };
  }

  setFilterText = filterText => {
    this.setState({ filterText });
  }

  toggleSortDirection = () => {
    // const sortDirection = this.state.sortDirection !== '' ? '' : this.state.sortDirection;
    // this.setState({ sortDirection });
  }

  switchSortDirection = (sortDirection) => {
    this.setState({ sortDirection });
    this.props.setModal({});
    this.props.sortGoods(this.props.columnKey);
  }

  toggleCheckedAll = () => {
    const filterStatus = this.state.filterStatus === 'checked' ? 'unchecked' : 'checked';
    const filterItems = filterStatus === 'checked' ? [ ...this.props.indexSort ] : [];
    this.setState({ filterStatus, filterItems });
  }

  toggleCheckedAllAndClose = () => {
    const filterStatus = this.state.filterStatus === 'checked' ? 'unchecked' : 'checked';
    const filterItems = filterStatus === 'checked' ? [ ...this.props.indexSort ] : [];
    this.setState({ filterStatus, filterItems },
      () => {
        this.props.applyGoodsFilterByProp(this.state.filterItems, this.props.columnKey);
        this.props.search();
        this.props.setModal();
      }
    );
  }

  toggleChecked = key => {
    let filterItems = '', filterStatus;
    const currentFilterItems = this.state.filterItems;
    const pos = currentFilterItems.indexOf(key);
    if (pos > -1) {
      filterItems = [ ...currentFilterItems.slice(0, pos), ...currentFilterItems.slice(pos + 1) ];
    } else {
      filterItems = [ ...currentFilterItems, key ];
    }
    if (filterItems.length === this.props.indexSort.length) {
      filterStatus = 'checked';
    }
    if (filterItems.length === 0) {
      filterStatus = 'unchecked';
    }
    this.setState({ filterStatus, filterItems });
  }

  render() {
    const { filterStatus, filterItems, sortDirection, filterText } = this.state;
    // console.log('filterStatus', filterStatus);
    // console.log('filterItems', filterItems);
    const { toggleCheckedAll, toggleCheckedAllAndClose, toggleChecked, toggleSortDirection, switchSortDirection, setFilterText } = this;
    const newProps = { ...this.props, filterStatus, filterItems, toggleCheckedAll, toggleCheckedAllAndClose, toggleChecked, sortDirection, toggleSortDirection, switchSortDirection, filterText, setFilterText };
    return <ColumnSettings {...newProps} />;
  }

}

const mapStateToProps = state => {
  const { columnKey } = state.modal.data;
  return {
    columnKey,
    modal: state.modal,
    sortDirection: state.sortDirection[columnKey],
    filterApplied: state.filtersApplied[columnKey],
    indexSort: getIndexByColName(state, columnKey),
  };
};

export default connect(
  mapStateToProps,
  { ...modalActions, ...goodsActions }
)(ColumnSettingsContainer);
