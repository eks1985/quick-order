import React from 'react';
import { connect } from 'react-redux';
import { format1 } from './../../utils/format';
import { getOrdersVisibleIds } from './../../store/reducers/orders';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { deleteOrder } from './../../actions/orders';

const List = ({
  orders,
  headersIds,
  allowDeleteOrders,
  // actions
  deleteOrder
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
            <div className='orderItemCode' style={{flex: '0 0 10%'}}>
              {orderItems[key].code}
            </div>
            <div className='orderItemDescription' style={{flex: '0 0 60%'}}>
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
      <div className='orderItemsHeader' style={{display: 'flex', position: 'relative', fontSize: '12px', padding: '3px', background: 'rgba(238, 238, 238, 0.5)'}}>
        <div style={{flex: '0 0 10%'}}>Код</div>
        <div style={{flex: '0 0 60%'}}>Наименование</div>
        <div style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>Количество</div>
        <div style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>Цена</div>
        <div style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>Сумма</div>
      </div>
    );
  };

  const calculateStatus = status => {
    switch (status) {
      case 'new':
        return 'Новый';
      case 'draft':
        return 'Черновик';
      default:
        return '';
    }
  }

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
        const { nr, date, amount, ref, comment, status } = headerCurrent;
        console.log(status);
        const statusRu = calculateStatus(status);
        // const statusRu = 'Новый';
        const com  = ref ? ref + ' # ' + comment || '': comment || '';
        // const dateFormatted = new Date(date).toISOString().slice(0,10);
        const dataDate = new Date(date).toISOString().slice(0,10);
        const dataTime = new Date(date).toString().slice(17,21);
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
              <div style={{flex: '0 0 250px', display: 'flex'}}>
                <div>
                  {`Дата:`}
                </div>
                <div style={{fontWeight: 'bold', marginLeft: '5px'}}>
                  {`${dataDate} ${dataTime}`}
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
              <div style={{flex: '1 0 250px', display: 'flex'}}>
                <div style={{marginLeft: '5px'}}>
                  {`${com}`}
                </div>
              </div>
              <div style={{flex: '1 0 100px', display: 'flex'}}>
                <div style={{marginLeft: '5px', padding: '5px', color: 'white', background: '#ddd'}}>
                  {`${statusRu}`}
                </div>
              </div>
              {allowDeleteOrders &&
                <div>
                  <FlatButton
                    label='Удалить'
                    onClick={
                      () => {
                        deleteOrder(key);
                      }
                    }
                  ></FlatButton>
                </div>
              }
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
  state => ({orders: state.orders, headersIds: getOrdersVisibleIds(state.orders), allowDeleteOrders: state.options.allowDeleteOrders }),
  { deleteOrder }
)(List);
