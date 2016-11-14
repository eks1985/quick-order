import React from 'react';
import { connect } from 'react-redux';
import { format1 } from './../../utils/format';
import { getOrdersVisibleIds } from './../../store/reducers/orders';

const List = ({
  orders,
  headersIds,
}) => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto'
  }
  const { headers, items } = orders;
  const getOrderItemsJsx = (guid) => {
    const orderItems = items[guid];
    const keys = Object.keys(orderItems);
    return (
      keys.map(key => {
        return (
          <div style={{display:'flex', padding: '3px'}} key={key}>
            <div className='orderItemCode' style={{flex: '0 0 20%'}}>
              {orderItems[key].code}
            </div>
            <div className='orderItemDescription' style={{flex: '0 0 50%'}}>
              {orderItems[key].description}
            </div>
            <div className='orderItemQty' style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>
              {orderItems[key].qty}
            </div>
            <div className='orderItemPrice' style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>
              {format1(orderItems[key].price, "")}
            </div>
            <div className='orderItemAmount' style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>
              {format1(orderItems[key].amount, "")}
            </div>
          </div>
        )
      })
    )
  }

  const getOrderItemsHeader = () => {
    return (
      <div className='orderItemsHeader' style={{display: 'flex', fontStyle: 'italic', padding: '3px', background: '#eee'}}>
        <div style={{flex: '0 0 20%'}}>Код</div>
        <div style={{flex: '0 0 50%'}}>Наименование</div>
        <div style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>Количество</div>
        <div style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>Цена</div>
        <div style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>Сумма</div>
      </div>
    );
  }

  const getOrdersJsx = () => {
    const style = {
      display: 'flex',
      height: '50px',
      background: '#ddd',
      padding: '5px',
      fontWeight: 'bold'
    };
    return (
      headersIds.map(key => {
        const headerCurrent = headers[key];
        const { enterpriseNr, date, amount } = headerCurrent;
        return (
          <div key={key} className='orderContainer'>
            <div  className='orderHeader' style={style}>
              <div style={{flex: '0 0 40%'}}>
              {`Номер: ${enterpriseNr}`}
              </div>
              <div style={{flex: '0 0 20%'}}>
              {`Дата: ${date.toISOString().slice(0,10)}`}
              </div>
              <div style={{flex: '0 0 20%'}}>
              {`Сумма: ${format1(amount, "руб.")}`}
              </div>
            </div>
            <div className='orderItems'>
              {getOrderItemsHeader()}
              {getOrderItemsJsx(key)}
            </div>
          </div>
        );
      })
    );
  }

  return (
    <div style={style}>
        {getOrdersJsx()}
    </div>
  );
};

export default connect(
  state => ({orders: state.orders, headersIds: getOrdersVisibleIds(state.orders)})
)(List);
