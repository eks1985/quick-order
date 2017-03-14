import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as modalActions from './../lib/modal/actions/modal';
import * as goodsActions from './../actions/goods';
import { getIndexByColName } from './../actions/indexes';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import IconSort from 'material-ui/svg-icons/av//sort-by-alpha';
import IconFilter from 'material-ui/svg-icons/content/filter-list';
import IconClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconImage from 'material-ui/svg-icons/image/adjust';
import CheckboxOutline from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import CheckboxChecked from 'material-ui/svg-icons/toggle/check-box';
import './column-settings.css';

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
      <List style={{marginTop: '0px'}}>
        <ListItem
          primaryText="Сортировка"
          leftIcon={<IconSort />}
          style={{height: '42px', fontSize: '16px'}}
          hoverColor='transparent'
        />
        <ListItem
          primaryText='Сортировать A - Я'
          innerDivStyle={{padding: '5px 10px 5px 10px'}}
          style={sortDirection === 'forward' ? {fontWeight: 'bold', fontSize: '13px'} : {fontSize: '13px'}}
          onClick={
            () => {
              switchSortDirection('forward');
            }
          }
        >
        </ListItem>
        <ListItem
          primaryText='Сортировать Я - А'
          innerDivStyle={{padding: '5px 10px 5px 10px'}}
          style={sortDirection === 'reverse' ? {marginBottom: '10px', fontWeight: 'bold', fontSize: '13px'} : {marginBottom: '0px', fontSize: '13px'}}
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
          style={{height: '42px', fontSize: '16px'}}
          hoverColor='transparent'
          primaryText="Фильтр"
          leftIcon={<IconFilter />}
        />
        <TextField
          placeholder='поиск' id='columnFilterSearch'
          style={{width: '100%', height: '30px', marginBottom: '6px', fontSize: '13px'}}
          underlineShow={false} inputStyle={{border: '1px solid #ddd', padding: '5px', height: '30px'}}
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
                style={{top: '6px'}}
                checkedIcon={filterStatus ? <CheckboxChecked /> : <IconImage /> }
                uncheckedIcon={filterStatus ? <CheckboxOutline /> : <IconImage />}
                checked={filterStatus === 'checked'}
                onCheck={toggleCheckedAll}
            />}
            style={{height: '28px', fontSize: '13px', paddingTop: '10px', fontWeight: 'bold'}}
          />
          {
            filterKeys.map(key => {
              return (
                <ListItem
                  key={key}
                  primaryText={key}
                  style={{height: '28px', fontSize: '13px', paddingTop: '10px'}}
                  leftCheckbox={
                    <Checkbox
                      style={{top: '6px'}}
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

        <div style={{display: 'flex', justifyContent: 'space-around'}}>
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
          {
            filterStatus !== 'checked' &&
            <FlatButton
              label='Отменить'
              style={{marginTop: '12px'}}
              labelStyle={{fontWeight: 'normal'}}
              onClick={
                () => {
                  if (filterStatus !== 'checked') {
                    toggleCheckedAllAndClose();
                  }
                }
              }
            />
          }
        </div>

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

  calculate = props => {
    const filterItems = props.filterApplied === undefined ? [ ...props.indexSort ] : props.filterApplied;
    const filterStatus = props.indexSort.length === filterItems.length ? 'checked' : 'unchecked';
    this.state = { filterStatus, filterItems, sortDirection: this.props.sortDirection, filterText: '' };
  }

  constructor (props) {
    super(props);
    this.calculate(props);
  }

  componentWillReceiveProps (nextProps) {
    this.calculate(nextProps);
  }

  setFilterText = filterText => {
    this.setState({ filterText });
  }

  switchSortDirection = sortDirection => {
    this.setState({ sortDirection });
    this.props.setModal({});
    this.props.sortGoods(this.props.columnKey, sortDirection);
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
    const { toggleCheckedAll, toggleCheckedAllAndClose, toggleChecked, switchSortDirection, setFilterText } = this;
    const newProps = { ...this.props, filterStatus, filterItems, toggleCheckedAll, toggleCheckedAllAndClose, toggleChecked, sortDirection, switchSortDirection, filterText, setFilterText };
    return <ColumnSettings {...newProps} />;
  }

}

const mapStateToProps = state => {
  const { modal, modal: { data: { columnKey }}} = state;
  return {
    columnKey,
    modal,
    sortDirection: state.ui.sortDirection[columnKey],
    filterApplied: state.filtersApplied[columnKey],
    indexSort: getIndexByColName(state, columnKey),
  };
};

export default connect(
  mapStateToProps,
  { ...modalActions, ...goodsActions }
)(ColumnSettingsContainer);
