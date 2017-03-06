import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetFiltersOrders, setFiltersOrders, setListCollapsedAll } from './../../actions/orders';
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
    listCollapsedAll,
    //actions
    setStatusFilter,
    setDateFilter,
    setTextFilter,
    resetFilters,
    setListCollapsedAll
  } = props;
  const haveAppliedFilters = statusFilter !== 'Все' || dateFilter !== 'Все' || textFilter !== '';
  const paddingBottom = filtersExpanded ? '0px' : '0px';
  const style = {
    display: 'flex',
    flexDirection: 'row',
    padding: '6px',
    paddingBottom
  };

  const dateTodayRaw = new Date();
  const dateToday = dateTodayRaw.toLocaleDateString();
  let dateYesterdayRaw = new Date();
  dateYesterdayRaw.setDate(dateTodayRaw.getDate() - 1);
  const dateYesterday = dateYesterdayRaw.toLocaleDateString();
  const dateThisMonth = new Date(dateTodayRaw.getFullYear(), dateTodayRaw.getMonth(), 1).toLocaleDateString() + ' - ' + dateToday;
  const datePrevMonth = new Date(dateTodayRaw.getFullYear(), dateTodayRaw.getMonth() - 1, 1).toLocaleDateString() + ' - ' + new Date(dateTodayRaw.getFullYear(), dateTodayRaw.getMonth(), 0).toLocaleDateString();
  const labelDateToday =
    (<div style={{display: 'flex', justifyContent: 'space-between'}}>
      <span>Сегодня</span>
      <span style={{marginLeft: '3px', fontSize: '10px', color: '#555'}}>{dateToday}</span>
    </div>);
    const labelDateYesterday =
      (<div style={{display: 'flex', justifyContent: 'space-between'}}>
        <span>Вчера</span>
        <span style={{marginLeft: '3px', fontSize: '10px', color: '#555'}}>{dateYesterday}</span>
      </div>);
    const labelDateThisMonth =
      (<div style={{display: 'flex', justifyContent: 'space-between'}}>
        <span>Этот месяц</span>
        <span style={{marginLeft: '3px', fontSize: '10px', color: '#555'}}>{dateThisMonth}</span>
      </div>);
    const labelDatePrevMonth =
      (<div style={{display: 'flex', justifyContent: 'space-between'}}>
        <span>Прошлый месяц</span>
        <span style={{marginLeft: '3px', fontSize: '10px', color: '#555'}}>{datePrevMonth}</span>
      </div>);
  return (
    <div style={style}>
      <div>
        <RaisedButton
          label={listCollapsedAll ? 'Развернуть все' : 'Свернуть все'}
          labelStyle={{fontWeight: 'normal'}}
          style={{width: '160px'}}
          onClick={setListCollapsedAll}
        />
      </div>
      <IconButton
        onClick={toggleFiltersExpanded}
      >
        <IconFilters />
      </IconButton>
      {filtersExpanded &&
        <div style={{ marginTop: '-20px', display: 'flex', flexWrap: 'wrap', paddingLeft: '10px' }}>
          <div>
            <SelectField
              labelStyle={{height: '45px'}}
              style={{ marginRight: '20px', width: '160px', height: '66px'}}
              floatingLabelText="Статус"
              value={statusFilter}
              onChange={
                (e, index, value) => {
                  setStatusFilter(value);
                  // applyFilters();
                }
              }
              >
                <MenuItem value='Все' label='Все' primaryText="Все" />
                <MenuItem value='draft' label='Черновик' primaryText="Черновик" />
                <MenuItem value='new' label='Новый' primaryText="Новый" />
                <MenuItem value='processed' label='Обработан' primaryText="Обработан" />
                <MenuItem value='complete' label='Исполнен' primaryText="Исполнен" />
              </SelectField>
          </div>
          <div>
            <SelectField
              labelStyle={{height: '45px'}}
              style={{ marginRight: '20px', width: '260px', height: '66px'}}
              floatingLabelText="Дата"
              value={dateFilter}
              onChange={
                (e, index, value) => {
                  setDateFilter(value);
                }
              }
              >
                <MenuItem value='Все' label='Все' primaryText='Все' />
                <MenuItem value='Сегодня' label='Сегодня' primaryText={labelDateToday} />
                <MenuItem value='Вчера' label='Вчера' primaryText={labelDateYesterday}/>
                <MenuItem value='ЭтотМесяц' label='Этот месяц' primaryText={labelDateThisMonth} />
                <MenuItem value='ПрошлыйМесяц' label='Прошлый месяц' primaryText={labelDatePrevMonth} />
                <MenuItem value='БолееРанние' label='Более ранние' primaryText="Более ранние" />
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
    this.state = { filtersExpanded: false, statusFilter: filters.status, dateFilter: filters.dateRange, textFilter:  filters.text, collapsedAll: true }
  }

  componentWillReceiveProps(nextProps) {
    const { filters } = nextProps;
    this.setState({ statusFilter: filters.status, dateFilter: filters.dateRange, textFilter:  filters.text });
  }

  toggleFiltersExpanded = () => {
    this.setState({ filtersExpanded: !this.state.filtersExpanded });
  }

  setStatusFilter = statusFilter => {
    this.setState({ statusFilter }, () => { this.applyFilters() });
  }

  setDateFilter = dateFilter => {
    this.setState({ dateFilter }, () => { this.applyFilters() });
  }

  setTextFilter = textFilter => {
    this.setState({ textFilter }, () => { this.applyFilters() });
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
        collapsedAll={this.state.collapsedAll}
        // toggleCollapsedAll={this.toggleCollapsedAll}
      />)
  }

}

export default connect(
  state => ({ filters: state.orders.filters, listCollapsedAll: state.orders.listCollapsedAll }),
  { setFiltersOrders, resetFiltersOrders, setListCollapsedAll }
)(FiltersContainer);
