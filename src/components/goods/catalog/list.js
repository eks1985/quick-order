import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGoodsVisibleIds } from './../../../store/reducers/goods';
import * as cartActions from './../../../actions/cart';
import * as goodsActions from './../../../actions/goods';
import * as modalActions from './../../../lib/modal/actions/modal';

const List = ({
  items,
  itemsIds,
  handleAssignQty,
  qtyAssigned,
  cartItems,
  prices,
  // actions
  addToCart,
  removeFromCart,
  setModal,
  setCurentGuid
}) => {
  const style = {
    overflowY: 'scroll',
    maxHeight: '70vh',
    paddingTop: '10px',
    display: 'flex',
    flexDirection: 'column'
  }
  const rowStyle = {
    container: {
      display: 'flex'
    },
    code: {
      display: 'flex',
      flex: '0 0 20%',
      padding: '3px',
      justifyContent: 'flex-start'
    },
    description: {
      display: 'flex',
      flex: '0 0 50%',
      padding: '3px',
      justifyContent: 'flex-start'
    },
    price: {
      display: 'flex',
      flex: '0 0 10%',
      padding: '3px',
      justifyContent: 'flex-end'
    },
    qty: {
      display: 'flex',
      flex: '0 0 10%',
      padding: '3px',
      justifyContent: 'center',
    },
    add: {
      display: 'flex',
      flex: '0 0 10%',
      padding: '3px'
    }
  };
  const headerStyle = {
    container: {
      display: 'flex'
    },
    code: {
      display: 'flex',
      flex: '0 0 20%',
      padding: '3px',
      justifyContent: 'center'
    },
    description: {
      display: 'flex',
      flex: '0 0 50%',
      padding: '3px',
      justifyContent: 'center'
    },
    price: {
      display: 'flex',
      flex: '0 0 10%',
      padding: '3px',
      justifyContent: 'flex-end'
    },
    qty: {
      display: 'flex',
      flex: '0 0 10%',
      padding: '3px',
      justifyContent: 'flex-end'
    },
    add: {
      display: 'flex',
      flex: '0 0 10%',
      padding: '3px'
    }
  }
  const getItemsJsx = () => {
    return itemsIds.map( key => {
      return (
        <div key={key} style={rowStyle.container}>
          <div style={rowStyle.code}>{items[key].code}</div>
          <div style={rowStyle.description}>
            <a
              href="#"
              onClick={
                () => {
                  setCurentGuid(key);
                  setModal({ content: 'goodsCard', fullScreen: true});
                }
              }
            >
              {items[key].description}
            </a>
          </div>
          <div style={rowStyle.price}>{prices[key]}</div>
          <div style={rowStyle.qty}>
            <input
              type="text"
              style={{width: '50px', textAlign: 'right'}}
              value={qtyAssigned[key] || ''}
              onChange={
                (e) => {
                  const val = parseInt(e.target.value, 10) ? parseInt(e.target.value, 10) : '';
                  handleAssignQty(key, val);
                }
              }
            >
            </input>
          </div>
          <div style={rowStyle.add}>
            {!cartItems[key] && //if not inside cart - show Add to cart
              <button
                onClick={
                  () => {
                    addToCart(key, qtyAssigned[key] || 0, prices[key]);
                  }
                }
              >
                В корзину
              </button>
            }
            {cartItems[key] && //if inside cart - show Remove from cart
              <span>
                <span style={{fontSize: '10px', marginRight: '3px'}}>
                  В корзине
                </span>
                <button
                  onClick={
                    () => {
                      removeFromCart(key);
                    }
                  }
                >
                  X
                </button>
              </span>
            }
          </div>
        </div>
      );
    });
  }
  const getHeaderJsx = () => {
    return (
      <div style={headerStyle.container}>
        <div style={headerStyle.code}>Код</div>
        <div style={headerStyle.description}>Наименование</div>
        <div style={headerStyle.price}>Цена</div>
        <div style={headerStyle.qty}>Количество</div>
        <div style={headerStyle.add}></div>
      </div>
    );
  }
  return (
    <div style={style}>
      {getHeaderJsx()}
      {getItemsJsx()}
    </div>
  );
}

class ListContainer extends Component {

  constructor(props){
    super(props);
    this.state = { qtyAssigned: {}}
  }

  componentDidMount() {
    const qtyAssigned = {};
    this.props.itemsIds.forEach(itemId => {
      qtyAssigned[itemId] = '';
    });
    this.setState({qtyAssigned: qtyAssigned});
  }

  handleAssignQty(guid, qty) {
    const newQtyAssigned = { ...this.state.qtyAssigned, [guid]: qty };
    this.setState({qtyAssigned: newQtyAssigned});
  }

  render() {
    return <List {...this.props} handleAssignQty={this.handleAssignQty.bind(this)} qtyAssigned={this.state.qtyAssigned} />;
  }

}

export default connect(
  state => ({items: state.goods.items, itemsIds: getGoodsVisibleIds(state.goods), cartItems: state.cart.items, prices: state.prices}),
  { ...cartActions, ...modalActions, ...goodsActions }
)(ListContainer);
