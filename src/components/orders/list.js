import React from 'react';
import { connect } from 'react-redux';
import { format1 } from './../../utils/format';
import { getOrdersVisibleIds } from './../../store/reducers/orders';
import Paper from 'material-ui/Paper';

const List = ({
  orders,
  headersIds,
}) => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto'
  };
  const { headers, items } = orders;
  const getOrderItemsJsx = (guid) => {
    const orderItems = items[guid] || {};
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
        );
      })
    );
  };

  const getOrderItemsHeader = () => {
    return (
      <div className='orderItemsHeader' style={{display: 'flex', fontSize: '12px', padding: '3px', background: 'rgba(238, 238, 238, 0.5)'}}>
        <div style={{flex: '0 0 20%'}}>Код</div>
        <div style={{flex: '0 0 50%'}}>Наименование</div>
        <div style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>Количество</div>
        <div style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>Цена</div>
        <div style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>Сумма</div>
      </div>
    );
  };

  const getOrdersJsx = () => {
    const headerStyle = {
      display: 'flex',
      height: '40px',
      background: '#eee',
      padding: '5px',
      alignItems: 'center',
      flex: '1'
      // fontWeight: 'bold'
    };
    return (
      headersIds.map(key => {
        const headerCurrent = headers[key];
        const { nr, date, amount } = headerCurrent;
        const dateFormatted = new Date(date).toISOString().slice(0,10);
        return (
          <div key={key} className='orderContainer'>
            <div  className='orderHeader' style={headerStyle}>
              <div style={{flex: '0 0 420px', display: 'flex'}}>
                <div>
                  {`Номер:`}
                </div>
                <div style={{fontWeight: 'bold', marginLeft: '5px'}}>
                  {`${nr}`}
                </div>
              </div>
              <div style={{flex: '0 0 150px', display: 'flex'}}>
                <div>
                  {`Дата:`}
                </div>
                <div style={{fontWeight: 'bold', marginLeft: '5px'}}>
                  {`${dateFormatted}`}
                </div>
              </div>
              <div style={{flex: '1 0 250px', display: 'flex'}}>
                <div>
                  {`Сумма:`}
                </div>
                <div style={{fontWeight: 'bold', marginLeft: '5px'}}>
                  {`${format1(amount, "руб.")}`}
                </div>
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
  };

  return (
    <Paper style={style}>
      <div style={{padding: '10px'}}>
        {getOrdersJsx()}  
      </div>
    </Paper>
  );
};

export default connect(
  state => ({orders: state.orders, headersIds: getOrdersVisibleIds(state.orders)})
)(List);
