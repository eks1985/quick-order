import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetFiltersOrders, setFiltersOrders } from './../../actions/orders';
import RaisedButton from 'material-ui/RaisedButton';
import TextField  from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconFilters from 'material-ui/svg-icons/content/filter-list';
import IconButton from 'material-ui/IconButton';
import IconClear from 'material-ui/svg-icons/content/clear';

const Filters = props => {
  const {
    filtersExpanded,
    toggleFiltersExpanded,
    statusFilter,
    dateFilter,
    textFilter,
    //actions
    setStatusFilter,
    setDateFilter,
    setTextFilter,
    resetFilters,
    applyFilters
  } = props;
  const haveAppliedFilters = statusFilter !== 'Все' || dateFilter !== 'Все' || textFilter !== '';
  const paddingBottom = filtersExpanded ? '0px' : '6px';
  const style = {
    display: 'flex',
    flexDirection: 'row',
    padding: '6px',
    paddingBottom
  };
  return (
    <div style={style}>
      <IconButton
        onClick={toggleFiltersExpanded}
      >
        <IconFilters />
      </IconButton>
      {filtersExpanded &&
        <div style={{ marginTop: '-20px', display: 'flex', flexWrap: 'wrap', paddingLeft: '10px' }}>
          <div>
            <SelectField
              style={{ marginRight: '20px', width: '160px', height: '66px'}}
              floatingLabelText="Статус"
              value={statusFilter}
              onChange={
                (e, index, value) => {
                  setStatusFilter(value);
                }
              }
              >
                <MenuItem value='Все' label='Все' primaryText="Все" />
                <MenuItem value='Черновик' label='Черновик' primaryText="Черновик" />
                <MenuItem value='Новый' label='Новый' primaryText="Новый" />
                <MenuItem value='Обработан' label='Обработан' primaryText="Обработан" />
                <MenuItem value='Исполнен' label='Исполнен' primaryText="Исполнен" />
              </SelectField>
          </div>
          <div>
            <SelectField
              style={{ marginRight: '20px', width: '160px', height: '66px'}}
              floatingLabelText="Дата"
              value={dateFilter}
              onChange={
                (e, index, value) => {
                  setDateFilter(value);
                }
              }
              >
                <MenuItem value='Все' label='Все' primaryText="Все" />
                <MenuItem value='Сегодня' label='Сегодня' primaryText="Сегодня" />
                <MenuItem value='Неделя' label='Неделя' primaryText="Неделя" />
                <MenuItem value='Месяц' label='Месяц' primaryText="Месяц" />
                <MenuItem value='Год' label='Год' primaryText="Год" />
              </SelectField>
          </div>
          <div>
            <TextField
              value={textFilter}
              style={{ marginRight: '20px', marginTop: '18px', width: '200px'}}
              id='orderFilterText'
              placeholder="Любая колонка"
              onChange={
                (e, text) => {
                  setTextFilter(text);
                }
              }
            />
          </div>
        </div>
      }
      { filtersExpanded &&
        <div>
          <RaisedButton
            style={{width: '120px'}}
            labelStyle={{fontWeight: 'normal'}}
            label='Применить'
            onClick={applyFilters}
          ></RaisedButton>
          { haveAppliedFilters &&
            <RaisedButton
              style={{width: '140px', marginLeft: '10px'}}
              label='Очистить'
              icon={<IconClear />}
              labelStyle={{fontWeight: 'normal'}}
              onClick={resetFilters}
            ></RaisedButton>
          }
      </div>
      }
    </div>
  );
}

class FiltersContainer extends Component {

  constructor (props) {
    super(props);
    const { filters } = props;
    this.state = { filtersExpanded: false, statusFilter: filters.status, dateFilter: filters.dateRange, textFilter:  filters.text }
  }

  componentWillReceiveProps(nextProps) {
    const { filters } = nextProps;
    this.setState({ statusFilter: filters.status, dateFilter: filters.dateRange, textFilter:  filters.text });
  }

  toggleFiltersExpanded = () => {
    this.setState({ filtersExpanded: !this.state.filtersExpanded });
  }

  setStatusFilter = statusFilter => {
    this.setState({ statusFilter });
  }

  setDateFilter = dateFilter => {
    this.setState({ dateFilter });
  }

  setTextFilter = textFilter => {
    this.setState({ textFilter });
  }

  //reducer action call
  applyFilters = () => {
    this.props.setFiltersOrders(this.state.statusFilter, this.state.dateFilter, this.state.textFilter);
  }

  //reducer action call
  resetFilters = () => {
    this.props.resetFiltersOrders();
  }

  render() {
    return (
      <Filters
        {...this.props}
        toggleFiltersExpanded={this.toggleFiltersExpanded}
        applyFilters={this.applyFilters}
        resetFilters={this.resetFilters}
        setStatusFilter={this.setStatusFilter}
        setDateFilter={this.setDateFilter}
        setTextFilter={this.setTextFilter}
        statusFilter={this.state.statusFilter}
        filtersExpanded={this.state.filtersExpanded}
        dateFilter={this.state.dateFilter}
        textFilter={this.state.textFilter}
      />)
  }

}

export default connect(
  state => ({ filters: state.orders.filters }),
  { setFiltersOrders, resetFiltersOrders }
)(FiltersContainer);
