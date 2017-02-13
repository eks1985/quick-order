import React from 'react';
import { connect } from 'react-redux';
// import IconButton from 'material-ui/IconButton';
import IconFilters from 'material-ui/svg-icons/content/filter-list';
// import IconClearFilters from 'material-ui/svg-icons/communication/clear-all';
import RaisedButton from 'material-ui/RaisedButton';
import { resetOrdersFilters, toggleFiltersExpandedOrders, setFiltersStatusOrders, setFiltersDateOrders, setFiltersNumberOrders, setFiltersCommentOrders, setFiltersAmountOrders } from './../../actions/orders';
import TextField  from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

const Filters = props => {
  // setFiltersDateOrders, setFiltersNumberOrders, setFiltersCommentOrders, setFiltersAmountOrders
  const { resetOrdersFilters, filtersExpanded, toggleFiltersExpandedOrders, filters, setFiltersStatusOrders, setFiltersDateOrders } = props;
  const haveAppliedFilters = filters.status !== 'Все' || filters.dateRange !== 'Все' || filters.text !== '';
  const paddingBottom = filtersExpanded ? '0px' : '6px';
  const style = {
    display: 'flex',
    flexDirection: 'row',
    padding: '6px',
    paddingBottom
  };
  let inputTextFilter;
  return (
    <div style={style}>
      {/* <RaisedButton
        style={{width: '150px'}}
        label={haveAppliedFilters ? 'Отбор (*)' : 'Отбор'}
        icon={<IconFilters />}
        onClick={toggleFiltersExpandedOrders}
      ></RaisedButton> */}
      <IconButton
        onClick={toggleFiltersExpandedOrders}
      >
        <IconFilters />
      </IconButton>
      {filtersExpanded &&
        <div style={{ marginTop: '-20px', display: 'flex', flexWrap: 'wrap', paddingLeft: '10px' }}>
          <div>
            <SelectField
              style={{ marginRight: '20px', width: '160px', height: '66px'}}
              floatingLabelText="Статус"
              value={filters.status}
              onChange={
                (e, index, value) => {
                  setFiltersStatusOrders(value);
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
              value={filters.dateRange}
              onChange={
                (e, index, value) => {
                  setFiltersDateOrders(value);
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
              defaultValue={filters.text}
              style={{ marginRight: '20px', marginTop: '18px', width: '200px'}}
              // floatingLabelText="Номер"
              id='orderFilterText'
              placeholder="Любая колонка"
              ref={
                node => {
                  inputTextFilter = node;
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
            label='Применить'
            // icon={<IconFilters />}
            // onClick={toggleFiltersExpandedOrders}
            // onClick={}
          ></RaisedButton>
          { haveAppliedFilters &&
            <RaisedButton
              style={{width: '120px', marginLeft: '10px'}}
              label='Отменить'
              // icon={<IconFilters />}
              onClick={
                () => {
                  resetOrdersFilters();
                  inputTextFilter.input.value = '';
                }
              }
            ></RaisedButton>
          }
      </div>
      }
    </div>
  );
}

export default connect(
  state => ({ filtersExpanded: state.orders.filtersExpanded, filters: state.orders.filters }),
  { resetOrdersFilters, toggleFiltersExpandedOrders, setFiltersStatusOrders, setFiltersDateOrders, setFiltersNumberOrders, setFiltersCommentOrders, setFiltersAmountOrders }
)(Filters);
