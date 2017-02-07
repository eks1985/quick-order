import React from 'react';
import { connect } from 'react-redux';
import { format1 } from './../../utils/format';
import { getOrdersVisibleIds } from './../../store/reducers/orders';
import Paper from 'material-ui/Paper';
import { deleteOrder, restoreOrder } from './../../actions/orders';
import IconRestore from 'material-ui/svg-icons/content/reply';
import IconDelete from 'material-ui/svg-icons/action/delete-forever';

const List = ({
  orders,
  headersIds,
  allowDeleteOrders,
  cartIsEmpty,
  // actions
  deleteOrder,
  restoreOrder
}) => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto'
  };
  const { headers, items } = orders;

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

  const getOrderItemsJsx = guid => {
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

  const getOrderHeaderJsx = key => {
    const headerStyle = {
      display: 'flex',
      height: '40px',
      background: '#eee',
      padding: '5px',
      alignItems: 'center',
      flex: '1'
    };
    const columnsStyle = {
      container: {
        number: {
          flex: '0 0 300px',
          display: 'flex',
          color: 'rgba(0,0,0,0.70)'
        },
        date: {
          flex: '0 0 200px',
          display: 'flex',
          color: 'rgba(0,0,0,0.70)'
        },
        amount: {
          flex: '1 0 250px',
          display: 'flex',
          color: 'rgba(0,0,0,0.70)'
        },
        comment: {
          flex: '1 0 250px',
          display: 'flex'
        },
        status: {
          flex: '0 0 200px',
          display: 'flex',
          justifyContent: 'flex-end'
        }
      },
      field: {
        number: {
          fontWeight: 'bold',
          marginLeft: '5px'
        },
        amount: {
          fontWeight: 'bold',
          marginLeft: '5px'
        },
        comment: {
          marginLeft: '5px'
        },
        status: {
          marginLeft: '5px',
          flex: '1',
          justifyContent: 'center',
          padding: '5px',
          color: 'white',
          background: '#aaa',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '14px'
        }
      }
    }
    const iconRestoreStyle = {
      cursor: 'pointer',
      marginLeft: '6px',
      fill: 'white',
      height: '20px',
      width: '20px'
    }
    const iconDeleteStyle = {
      cursor: 'pointer',
      marginLeft: '6px',
      fill: 'white',
      height: '20px',
      width: '20px'
    }

    const headerCurrent = headers[key];
    const { nr, date, amount, ref, comment, status } = headerCurrent;
    const statusRu = calculateStatus(status);
    const com  = ref ? ref + ' # ' + comment || '': comment || '';
    let dataDate = '';
    let dataTime = '';
    try {
      dataDate = new Date(date).toISOString().slice(0,10);
    } catch (e) {};
    try {
      dataTime = new Date(date).toString().slice(17,21);
    } catch (e) {};
    return (
      <div  className='orderHeader' style={headerStyle}>
        <div style={columnsStyle.container.number}>
          <div>{`Номер:`}</div>
          <div style={columnsStyle.field.number}>{`${nr}`}</div>
        </div>
        <div style={columnsStyle.container.date}>
          <div>{`Дата:`}</div>
          <div style={{fontWeight: 'bold', marginLeft: '5px'}}>
            {`${dataDate} ${dataTime}`}
          </div>
        </div>
        <div style={columnsStyle.container.amount}>
          <div>
            {`Сумма:`}
          </div>
          <div style={columnsStyle.field.amount}>
            {`${format1(amount, "руб.")}`}
          </div>
        </div>
        <div style={columnsStyle.container.comment}>
          <div style={columnsStyle.field.comment}>
            {`${com}`}
          </div>
        </div>
        <div style={columnsStyle.container.status}>
          <div style={columnsStyle.field.status}>
            {`${statusRu}`}
            {status === 'draft' &&
              <IconRestore
                style={iconRestoreStyle}
                onClick={
                  () => {
                    if (!cartIsEmpty) {
                      alert('Восстановление заказа возможно только при пустой корзине');
                    } else {
                      const yes = confirm('Заказ будет помещен в корзину. Продолжить?');
                      if (yes) {
                        restoreOrder(key);
                      }
                    }
                  }
                }
              />
            }
            {allowDeleteOrders &&
              <IconDelete
                style={iconDeleteStyle}
                onClick={
                  () => {
                    const yes = confirm('Заказ будет удален. Продолжить?');
                    if (yes) {
                      deleteOrder(key);
                    }
                  }
                }
              />
            }
          </div>
        </div>
      </div>
    );
  }

  const getOrdersJsx = () => {
    return (
      headersIds.map(key => {

        return (
          <div key={key} className='orderContainer'>
            {getOrderHeaderJsx(key)}
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
  state => {
    return {
      orders: state.orders,
      headersIds: getOrdersVisibleIds(state.orders),
      allowDeleteOrders: state.options.allowDeleteOrders,
      cartIsEmpty: state.cart.totalItems === 0
    }
  },
  { deleteOrder, restoreOrder }
)(List);
