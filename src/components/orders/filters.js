import React from 'react';
import { connect } from 'react-redux';
// import IconButton from 'material-ui/IconButton';
import IconFilters from 'material-ui/svg-icons/content/filter-list';
import RaisedButton from 'material-ui/RaisedButton';
import { resetOrdersFilters, toggleFiltersExpandedOrders, setFiltersStatusOrders, setFiltersDateOrders, setFiltersNumberOrders, setFiltersCommentOrders, setFiltersAmountOrders } from './../../actions/orders';
import TextField  from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const Filters = props => {
  // setFiltersDateOrders, setFiltersNumberOrders, setFiltersCommentOrders, setFiltersAmountOrders
  const { resetOrdersFilters, filtersExpanded, toggleFiltersExpandedOrders, filters, setFiltersStatusOrders, setFiltersDateOrders } = props;
  const haveAppliedFilters = filters.status !== 'Все' || filters.dateRange !== 'Все' || filters.dateStart !== '' || filters.dateEnd !== '' || filters.amount !== '' || filters.guid !== '';
  const style = {
    display: 'flex',
    flexDirection: 'column',
    padding: '6px'
  };
  return (
    <div style={style}>
      <RaisedButton
        style={{width: '150px'}}
        label={haveAppliedFilters ? 'Отбор (*)' : 'Отбор'}
        icon={<IconFilters />}
        onClick={toggleFiltersExpandedOrders}
      ></RaisedButton>
      {filtersExpanded &&
        <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', paddingLeft: '10px' }}>
          <div>
            <SelectField
              style={{ marginRight: '20px', width: '200px'}}
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
              style={{ marginRight: '20px', width: '200px'}}
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
              style={{ marginRight: '20px', width: '200px'}}
              floatingLabelText="Номер"
              id='orderFilterNumber'
              placeholder="Номер"
            />
          </div>
          <div>
            <TextField
              style={{ marginRight: '20px', width: '200px'}}
              floatingLabelText="Комментарий"
              id='orderFilterComment'
              placeholder="Комментарий"
            />
          </div>
          <div>
            <TextField
              style={{ marginRight: '20px', width: '200px'}}
              floatingLabelText="Сумма"
              id='orderFilterAmount'
              placeholder="Сумма"
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
          ></RaisedButton>
          <RaisedButton
            style={{width: '120px', marginLeft: '10px'}}
            label='Отменить'
            // icon={<IconFilters />}
            onClick={resetOrdersFilters}
          ></RaisedButton>
      </div>
      }
    </div>
  );
}

export default connect(
  state => ({ filtersExpanded: state.orders.filtersExpanded, filters: state.orders.filters }),
  { resetOrdersFilters, toggleFiltersExpandedOrders, setFiltersStatusOrders, setFiltersDateOrders, setFiltersNumberOrders, setFiltersCommentOrders, setFiltersAmountOrders }
)(Filters);
