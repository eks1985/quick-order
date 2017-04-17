import React, { Component } from 'react';
import { connect } from 'react-redux';
import { format1 } from './../../utils/format';
import { getOrdersVisibleIds } from './../../store/reducers/orders';
import Paper from 'material-ui/Paper';
import { deleteOrder, restoreOrder } from './../../actions/orders';
import IconRestore from 'material-ui/svg-icons/content/reply';
import IconDelete from 'material-ui/svg-icons/content/clear';
import IconDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import IconUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import IconPrint from 'material-ui/svg-icons/action/print';
import { setModal } from './../../lib/modal/actions/modal';
import { setOrderCurrentId } from './../../actions/orders';
import { setCurrentContent } from './../../actions/current-content';

const OrdersList = ({
  orders,
  headersIds,
  allowDeleteOrders,
  cartIsEmpty,
  ordersState,
  ordersRowsSeparator,
  managePrices,
  // listCollapsedAll,
  // actions
  deleteOrder,
  restoreOrder,
  toggleOrder,
  setModal,
  setOrderCurrentId,
  setCurrentContent
}) => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
    paddingTop: '0px'
  };
  const rowTopBorder = ordersRowsSeparator ? '1px solid #eee' : 'none';
  const rowStyle = {
    display:'flex',
    padding: '3px',
    borderBottom: rowTopBorder
  }
  const { headers, items } = orders;

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

  const getOrderItemsHeader = () => {
    return (
      <div className='orderItemsHeader' style={{display: 'flex', position: 'relative', fontSize: '12px', padding: '3px', background: 'rgba(238, 238, 238, 0.5)'}}>
        <div style={{flex: '0 0 10%'}}>Код</div>
        <div style={{flex: '0 0 60%'}}>Наименование</div>
        <div style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>Количество</div>
        { managePrices !== 'dontUse' &&
          <div style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>Цена</div>
        }
        { managePrices !== 'dontUse' &&
          <div style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>Сумма</div>
        }
        </div>
    );
  };

  const getOrderItemsJsx = guid => {
    const orderItems = items[guid] || {};
    const keys = Object.keys(orderItems);
    return (
      keys.map(key => {
        return (
          <div style={rowStyle} key={key}>
            <div className='orderItemCode' style={{flex: '0 0 10%'}}>
              {orderItems[key].code}
            </div>
            <div className='orderItemDescription' style={{flex: '0 0 60%'}}>
              {orderItems[key].description}
            </div>
            <div className='orderItemQty' style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>
              {orderItems[key].qty}
            </div>
            { managePrices !== 'dontUse' &&
              <div className='orderItemPrice' style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>
                {format1(orderItems[key].price, "")}
              </div>
            }
            { managePrices !== 'dontUse' &&
              <div className='orderItemAmount' style={{flex: '0 0 10%', display: 'flex', justifyContent: 'flex-end'}}>
                {format1(orderItems[key].amount, "")}
              </div>
            }
          </div>
        );
      })
    );
  };

  const getOrderHeaderJsx = key => {

    const rows = items[key] || {};
    const rowsQty = Object.keys(rows).length;

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
          flex: '0 0 200px',
          display: 'flex',
          color: 'rgba(0,0,0,0.70)',
          fontSize: '14px'
        },
        date: {
          flex: '0 0 180px',
          display: 'flex',
          color: 'rgba(0,0,0,0.70)',
          fontSize: '14px'
        },
        rows: {
          flex: '0 0 130px',
          display: 'flex',
          color: 'rgba(0,0,0,0.70)'
        },
        amount: {
          flex: '1 0 120px',
          display: 'flex',
          color: 'rgba(0,0,0,0.70)',
          fontSize: '14px'
        },
        comment: {
          flex: '1 1 200px',
          display: 'flex',
          fontSize: '14px'
        },
        status: {
          flex: '0 0 160px',
          display: 'flex',
          justifyContent: 'flex-end',
          // fontSize: '14px',
        },
        expand: {
          flex: '0 0 340px',
          display: 'flex',
          justifyContent: 'flex-end',
          fontSize: '14px',
          alignItems: 'center'
        }
      },
      field: {
        number: {
          fontWeight: 'bold',
          marginLeft: '5px',
          cursor: 'pointer'
        },
        rows: {
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
        expand: {
          display: 'flex',
          marginLeft: '5px',
          cursor: 'pointer',
          alignItems: 'center'
        },
        status: {
          marginRight: '5px',
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
      marginRight: '6px',
      fill: 'white',
      height: '20px',
      width: '20px'
    };
    const iconPrintStyle = {
      cursor: 'pointer',
      marginRight: '6px',
      fill: 'white',
      height: '20px',
      width: '20px'
    };
    const iconDeleteStyle = {
      cursor: 'pointer',
      marginLeft: '6px',
      fill: 'white',
      height: '20px',
      width: '20px'
    };

    const headerCurrent = headers[key];
    const { nr, date, amount, ref, comment, status } = headerCurrent;
    const statusRu = calculateStatus(status);
    // const com  = ref ? ref + ' # ' + comment || '': comment || '';
    let dataDate = '';
    let dataTime = '';
    try {
      dataDate = new Date(date).toISOString().slice(0,10);
    } catch (e) {};
    try {
      dataTime = new Date(date).toString().slice(17,21);
    } catch (e) {};
    return (
      <div
        className='orderHeader'
        style={headerStyle}
        onClick={
          () => {
            toggleOrder(key);
          }
        }
      >
        <div style={columnsStyle.container.status}>
          <div
            style={columnsStyle.field.status}
            onClick={
              e => {
                e.stopPropagation();
              }
            }
          >
            {status !== 'blocked' &&
              <IconPrint
                style={iconPrintStyle}
                onClick={
                  () => {
                    setOrderCurrentId(key);
                    setCurrentContent('print-order');
                    //setModal({ content: 'order-print', fullScreen: true, style: {background: '#fff', padding: '0px'} });
                  }
                }
              />
            }

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
            {`${statusRu}`}
            {allowDeleteOrders && status !== 'blocked' &&
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
        <div
          style={columnsStyle.container.number}
          onClick={
            e => {
              e.stopPropagation();
            }
          }
        >
          <div>{`Номер:`}</div>
          <div style={columnsStyle.field.number}
            onClick={
              () => {
                toggleOrder(key);
              }
            }
          >{`${ref}`}</div>
        </div>
        <div
          style={columnsStyle.container.date}
          onClick={
            e => {
              e.stopPropagation();
            }
          }
        >
          <div style={{fontWeight: 'bold', marginLeft: '5px'}}>
            {`${dataDate} ${dataTime}`}
          </div>
        </div>
        <div
          style={columnsStyle.container.rows}
          onClick={
            e => {
              e.stopPropagation();
            }
          }
        >
          <div>
            {`Позиций:`}
          </div>
          <div style={columnsStyle.field.amount}>
            {rowsQty}
          </div>
        </div>
        { managePrices !== 'dontUse' &&
          <div
            style={columnsStyle.container.amount}
            onClick={
              e => {
                e.stopPropagation();
              }
            }
          >
            <div>
              {`Сумма:`}
            </div>
            <div style={columnsStyle.field.amount}>
              {`${format1(amount, "руб.")}`}
            </div>
          </div>
        }
        <div
          style={columnsStyle.container.comment}
          onClick={
            e => {
              e.stopPropagation();
            }
          }
        >
          <div style={columnsStyle.field.comment}>
            {`${comment}`}
          </div>
        </div>
        <div style={columnsStyle.container.expand}>
          <div style={columnsStyle.field.expand}>
            {nr}
            {
              ordersState[key]
              ?
                <IconUp
                  onClick={
                    () => {
                      toggleOrder(key);
                    }
                  }
                />
              :
              <IconDown
                onClick={
                  () => {
                    toggleOrder(key);
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
          <div key={key} className='orderContainer' style={{borderTop: '3px solid white'}}>
            {getOrderHeaderJsx(key)}
            {ordersState[key] &&
              <div className='orderItems'>
                {getOrderItemsHeader()}
                {getOrderItemsJsx(key)}
              </div>
            }
          </div>
        );
      })
    );
  };

  return (
    <Paper
      id='orderListContainer'
      style={style}
      zDepth={0}
    >
      <div style={{padding: '10px', paddingTop: '0px'}}>
        {getOrdersJsx()}
      </div>
    </Paper>
  );
};

class OrdersListContainer extends Component {
  constructor() {
    super();
    this.state = { ordersState: {}};
  }
  componentDidMount(){
    const ordersState = this.props.headersIds.reduce((res, id) => {
      return { ...res, [id]: !this.props.listCollapsedAll };
    }, {});
    this.setState({ ordersState });
  }
  componentWillReceiveProps(nextProps){
    // console.log(nextProps);
    const ordersState = nextProps.headersIds.reduce((res, id) => {
      return { ...res, [id]: !nextProps.listCollapsedAll };
    }, {});
    this.setState({ ordersState });
  }
  toggleOrder = id => {
    const currentState = this.state.ordersState;
    const ordersState = { ...currentState, [id]: currentState[id] ? false : true };
    this.setState({ ordersState})
  }
  render(){
    return <OrdersList {...this.props} ordersState={this.state.ordersState}  toggleOrder={this.toggleOrder} />
  }
}

export default connect(
  state => {
    return {
      orders: state.orders,
      headersIds: getOrdersVisibleIds(state.orders),
      allowDeleteOrders: state.options.allowDeleteOrders,
      cartIsEmpty: state.cart.totalItems === 0,
      ordersRowsSeparator: state.options.ordersRowsSeparator,
      listCollapsedAll: state.orders.listCollapsedAll,
      managePrices: state.options.managePrices
    }
  },
  { deleteOrder, restoreOrder, setOrderCurrentId, setModal, setCurrentContent }
)(OrdersListContainer);
