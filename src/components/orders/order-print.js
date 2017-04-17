import React from 'react';
import { connect } from 'react-redux';
import { setCurrentContent } from './../../actions/current-content';
import RaisedButton from 'material-ui/RaisedButton';
import { format1 } from './../../utils/format'
// import { List, ListItem } from 'material-ui/List';

const OrderPrint = props => {
  const { orderCurrentId, header, items, managePrices, setCurrentContent } = props;

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
      <div className='orderItemsHeader' style={{display: 'flex', height: '35px', alignItems: 'center', position: 'relative', fontSize: '12px', padding: '3px', background: 'rgba(238, 238, 238, 0.5)'}}>
        <div style={{flex: '0 0 20%', paddingLeft: '12px', fontWeight: 'bold'}}>Код</div>
        <div style={{flex: '0 0 40%', fontWeight: 'bold'}}>Наименование</div>
        <div style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end', fontWeight: 'bold'}}>Количество</div>
        { managePrices !== 'dontUse' &&
          <div style={{flex: '0 0 15%', display: 'flex', justifyContent: 'flex-end', fontWeight: 'bold'}}>Цена</div>
        }
        { managePrices !== 'dontUse' &&
          <div style={{flex: '0 0 15%', display: 'flex', justifyContent: 'flex-end', paddingRight: '12px', fontWeight: 'bold'}}>Сумма</div>
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
            <div className='orderItemCode' style={{flex: '0 0 20%', paddingLeft: '12px'}}>
              {items[key].code}
            </div>
            <div className='orderItemDescription' style={{flex: '0 0 40%'}}>
              {items[key].description}
            </div>
            <div className='orderItemQty' style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>
              {items[key].qty}
            </div>
            { managePrices !== 'dontUse' &&
              <div className='orderItemPrice' style={{flex: '0 0 15%', display: 'flex', justifyContent: 'flex-end'}}>
                {format1(items[key].price, "")}
              </div>
            }
            { managePrices !== 'dontUse' &&
              <div className='orderItemAmount' style={{flex: '0 0 15%', display: 'flex', justifyContent: 'flex-end', paddingRight: '12px'}}>
                {format1(items[key].amount, "")}
              </div>
            }
          </div>
        );
      })
    );
  };

  const getOrderTotalJsx = () => {
    return (
      <div style={{display: 'flex', flex: '1', justifyContent: 'flex-end', padding: '10px'}}>
        {`Итого: ${format1(header.amount, '') + 'руб.'}`}
      </div>
    );
  }

  return (
    <div style={{display: 'flex', flex: '1 0 auto', flexDirection: 'column'}}>
      <div style={{display: 'flex'}} id='printOrder'>
        <RaisedButton
          style={{margin: '8px'}}
          label='Распечатать'
          onClick={
            () => {
              document.getElementById('printOrder').style.display = 'none';
              document.getElementById('header').style.display = 'none';
              document.getElementById('footer').style.display = 'none';
              window.print();
            }
          }
        />
        <RaisedButton
          style={{margin: '8px'}}
          label='Назад'
          onClick={
            () => {
              document.getElementById('header').style.display = 'initial';
              document.getElementById('footer').style.display = 'initial';
              setCurrentContent('orders');
            }
          }
        />
      </div>
      <div style={{display: 'flex', flexDirection: 'column', background: '#eee', marginTop: '30px', padding: '10px'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{display: 'flex', height: '30px'}}>
            <div style={{marginLeft: '6px', width: '150px'}}>Заказ:</div>
            <div style={{marginLeft: '6px', fontWeight: 'bold', width: '350px'}}>{orderCurrentId}</div>
          </div>
          <div style={{display: 'flex', height: '30px'}}>
            <div style={{marginLeft: '6px', width: '150px'}}>Номер:</div>
            <div style={{width: '100px', marginLeft: '6px', fontWeight: 'bold'}}>{header.ref}</div>
          </div>
          <div style={{display: 'flex', height: '30px'}}>
            <div style={{marginLeft: '6px', width: '150px'}}>Дата:</div>
            <div style={{marginLeft: '6px', width: '200px', fontWeight: 'bold'}}>{`${dataDate} ${dataTime}`}</div>
          </div>
          <div style={{display: 'flex', height: '30px'}}>
            { managePrices !== 'dontUse' &&
              <div style={{display: 'flex'}}>
                <div style={{marginLeft: '6px', width: '150px'}}>Сумма:</div>
              </div>
            }
            { managePrices !== 'dontUse' &&
              <div style={{marginLeft: '6px', width: '200px', fontWeight: 'bold'}}>{format1(header.amount, '') + 'руб.'}</div>
            }
          </div>
          <div style={{display: 'flex', height: '30px'}}>
            <div style={{marginLeft: '6px', width: '150px'}}>Статус:</div>
            <div style={{marginLeft: '6px', width: '200px', fontWeight: 'bold'}}>{calculateStatus(header.status)}</div>
          </div>
        </div>
        {
          header.comment &&
            <div style={{marginTop: '12px'}}>{header.comment}</div>
        }
        <div style={{display: 'flex', flex: 1, borderBottom: '2px solid black'}}></div>
      </div>
      {getOrderItemsHeader()}
      {getOrderItemsJsx()}
      { managePrices !== 'dontUse' &&
        <div style={{display: 'flex', flexDirection: 'column', background: '#eee', marginTop: '30px', padding: '10px'}}>
          <div style={{display: 'flex', flex: 1, borderBottom: '2px solid black'}}></div>
        </div>
      }
      { managePrices !== 'dontUse' &&getOrderTotalJsx() }
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
  { setCurrentContent }
)(OrderPrint);
