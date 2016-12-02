import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGoodsVisibleIds } from './../../../store/reducers/goods';
import * as cartActions from './../../../actions/cart';
import * as goodsActions from './../../../actions/goods';
import * as modalActions from './../../../lib/modal/actions/modal';
import * as catalogQtyActions from './../../../actions/catalog-qty';
import { format1 } from './../../../utils/format';
import IconButton from 'material-ui/IconButton';
import IconAddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import IconRemoveShoppingCart from 'material-ui/svg-icons/action/remove-shopping-cart';
import { ListItem } from 'material-ui/List';

const List = ({
  items,
  itemsIds,
  handleAssignQty,
  handleRemoveAssignQty,
  qtyAssigned,
  cartItems,
  prices,
  catalogQty,
  // actions
  addToCart,
  removeFromCart,
  setModal,
  setCurentGuid,
  addCatalogQty, 
  removeCatalogQty,
  changeCatalogQty
}) => {
  const style = {
    display: 'flex',
    flexDirection: 'column'
  };
  const zebraStyle = {
    background: 'rgba(238, 238, 238, 0.7)'
  };
  const rowStyle = {
    container: {
      display: 'flex',
      alignItems: 'center',
      height: '40px',
      flex: '0 0 auto'
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
      display: 'flex',
      height: '40px',
      flex: '0 0 auto',
      background: '#eee',
      alignItems: 'center'

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
  };
  const getItemsJsx = () => {
    return itemsIds.map( (key, i) => {
      return (
        <div className='row' key={key} style={i % 2 === 0 ? rowStyle.container: { ...rowStyle.container, ...zebraStyle }}>
          <div style={rowStyle.code}>{items[key].code}</div>
          <div style={rowStyle.description} tabIndex={-1}>
            <a
              tabIndex={-1}
              href="#"
              style={{textDecoration: 'none'}}
              onClick={
                () => {
                  setCurentGuid(key);
                  setModal({ content: 'goodsCard', fullScreen: true, style: {display: 'initial'} });
                }
              }
            >
              <ListItem
                tabIndex={-1}
                innerDivStyle={{padding: '10px'}}
              >
                {items[key].description}
              </ListItem>
            </a>
          </div>
          <div style={rowStyle.price}>{format1(prices[key], '')}</div>
          <div style={rowStyle.qty}>
            <input
              type="text"
              style={{width: '50px', textAlign: 'right', padding: '3px', fontSize: '16px'}}
              value={catalogQty[key] || ''}
              onChange={
                (e) => {
                  const val = parseInt(e.target.value, 10) ? parseInt(e.target.value, 10) : '';
                    addCatalogQty(key, val);
                    cartItems[key] && addToCart(key, val, prices[key]);
                    if (val === '') {
                      removeFromCart(key);
                      removeCatalogQty(key);
                    }
                }
              }
            >
            </input>
          </div>
          <div style={rowStyle.add} >
            {!cartItems[key] && //if not inside cart - show Add to cart
              <IconButton
                disabled={!catalogQty[key]}
                onClick={
                  () => {
                    addToCart(key, catalogQty[key] || 0, prices[key]);
                  }
                }
              >
                <IconAddShoppingCart />
              </IconButton>
            }
            {cartItems[key] && //if inside cart - show Remove from cart
              <IconButton
                disabled={!catalogQty[key]}
                onClick={
                  () => {
                    removeFromCart(key);
                    removeCatalogQty(key);
                  }
                }
              >
                <IconRemoveShoppingCart />
              </IconButton>
            }
          </div>
        </div>
      );
    });
  };
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
  };
  return (
    <div style={style}>
      {getHeaderJsx()}
      <div className='items'>
        {getItemsJsx()}
      </div>
    </div>
  );
};

class ListContainer extends Component {

  constructor(props){
    super(props);
    this.state = { qtyAssigned: {}};
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

  handleRemoveAssignQty(guid, qty) {
    const newQtyAssigned = { ...this.state.qtyAssigned };
    delete newQtyAssigned[guid];
    this.setState({qtyAssigned: newQtyAssigned});
  }

  render() {
    return <List {...this.props} handleAssignQty={this.handleAssignQty.bind(this)} handleRemoveAssignQty={this.handleRemoveAssignQty.bind(this)} qtyAssigned={this.state.qtyAssigned} />;
  }

}

export default connect(
  state => ({ items: state.goods.items, itemsIds: getGoodsVisibleIds(state.goods), cartItems: state.cart.items, prices: state.prices , catalogQty: state.catalogQty }),
  { ...cartActions, ...modalActions, ...goodsActions, ...catalogQtyActions }
)(ListContainer);
