import React from 'react';
import { connect } from 'react-redux';
import { setModal } from './../../lib/modal/actions/modal';
import RaisedButton from 'material-ui/RaisedButton';
import { format1 } from './../../utils/format'
// import { List, ListItem } from 'material-ui/List';

const OrderPrint = props => {
  const { setModal, orderCurrentId, header, items, managePrices } = props;

  let dataDate = '';
  let dataTime = '';
  try {
    dataDate = new Date(header.date).toISOString().slice(0,10);
  } catch (e) {};
  try {
    dataTime = new Date(header.date).toString().slice(17,21);
  } catch (e) {};

  const calculateStatus = status => {
    switch (status) {
      case 'new':
        return 'Новый';
      case 'draft':
        return 'Черновик';
      case 'blocked':
          return 'Заблокирован';
      default:
        return '';
    }
  }

  const rowStyle = {
    display:'flex',
    padding: '3px',
  }

  const getOrderItemsHeader = () => {
    return (
      <div className='orderItemsHeader' style={{display: 'flex', position: 'relative', fontSize: '12px', padding: '3px', background: 'rgba(238, 238, 238, 0.5)'}}>
        <div style={{flex: '0 0 10%', paddingLeft: '12px'}}>Код</div>
        <div style={{flex: '0 0 60%'}}>Наименование</div>
        <div style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>Количество</div>
        { managePrices !== 'dontUse' &&
          <div style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>Цена</div>
        }
        { managePrices !== 'dontUse' &&
          <div style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end', paddingRight: '12px'}}>Сумма</div>
        }
      </div>
    );
  };

  const getOrderItemsJsx = () => {
    const keys = Object.keys(items);
    return (
      keys.map(key => {
        return (
          <div style={rowStyle} key={key}>
            <div className='orderItemCode' style={{flex: '0 0 10%', paddingLeft: '12px'}}>
              {items[key].code}
            </div>
            <div className='orderItemDescription' style={{flex: '0 0 60%'}}>
              {items[key].description}
            </div>
            <div className='orderItemQty' style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>
              {items[key].qty}
            </div>
            { managePrices !== 'dontUse' &&
              <div className='orderItemPrice' style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>
                {format1(items[key].price, "")}
              </div>
            }
            { managePrices !== 'dontUse' &&
              <div className='orderItemAmount' style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end', paddingRight: '12px'}}>
                {format1(items[key].amount, "")}
              </div>
            }
          </div>
        );
      })
    );
  };

  return (
    <div style={{display: 'flex', flex: '1 0 auto', flexDirection: 'column'}}>
      <div style={{display: 'flex'}} id='printOrder'>
        <RaisedButton
          label='Закрыть'
          onClick={
            () => {
              setModal();
            }
          }
        />
        <RaisedButton
          label='Распечатать'
          style={{marginLeft: '10px'}}
          onClick={
            () => {
              document.getElementById('printOrder').style.display = 'none';
              window.print();
            }
          }
        />
      </div>
      <div style={{display: 'flex', flex: '1', flexDirection: 'column', background: '#eee', justifyContent: 'center', marginTop: '30px', padding: '10px'}}>
        <div style={{display: 'flex'}}>
          <div>Заказ:</div>
          <div style={{marginLeft: '6px', fontWeight: 'bold', width: '300px'}}>{orderCurrentId}</div>
          <div style={{marginLeft: '6px'}}>Номер:</div>
          <div style={{width: '100px', marginLeft: '6px', fontWeight: 'bold'}}>{header.ref}</div>
          <div style={{marginLeft: '6px'}}>Дата:</div>
          <div style={{marginLeft: '6px', width: '200px', fontWeight: 'bold'}}>{`${dataDate} ${dataTime}`}</div>
          { managePrices !== 'dontUse' &&
            <div style={{marginLeft: '6px'}}>Сумма:</div>
          }
          { managePrices !== 'dontUse' &&
            <div style={{marginLeft: '6px', width: '200px', fontWeight: 'bold'}}>{format1(header.amount, '') + 'руб.'}</div>
          }
          <div style={{marginLeft: '6px'}}>Статус:</div>
          <div style={{marginLeft: '6px', width: '200px', fontWeight: 'bold'}}>{calculateStatus(header.status)}</div>
        </div>
        {
          header.comment &&
            <div style={{marginTop: '12px'}}>{header.comment}</div>
        }
      </div>
      {getOrderItemsHeader()}
      {getOrderItemsJsx()}
    </div>
  );

}

export default connect(
  state => ({
    orderCurrentId: state.ui.orderCurrentId,
    header: state.orders.headers[state.ui.orderCurrentId],
    items: state.orders.items[state.ui.orderCurrentId],
    managePrices: state.options.managePrices
   }),
  { setModal }
)(OrderPrint);
