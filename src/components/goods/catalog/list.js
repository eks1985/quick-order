import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGoodsVisibleIds } from './../../../store/reducers/goods';
import * as cartActions from './../../../actions/cart';
import * as goodsActions from './../../../actions/goods';
import * as modalActions from './../../../lib/modal/actions/modal';
import * as catalogQtyActions from './../../../actions/catalog-qty';
import { format1 } from './../../../utils/format';
import IconButton from 'material-ui/IconButton';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconDone from 'material-ui/svg-icons/action/done';
import IconArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
// import IconAddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
// import IconRemoveShoppingCart from 'material-ui/svg-icons/action/remove-shopping-cart';
import { ListItem } from 'material-ui/List';
import $ from 'jquery';

const List = ({
  items,
  itemsIds,
  cartItems,
  prices,
  catalogQty,
  setFocused,
  headerSettingsMode,
  // actions
  addToCart,
  removeFromCart,
  setModal,
  setCurentGuid,
  addCatalogQty, 
  removeCatalogQty,
  setHeaderSettingsMode,
  removeHeaderSettingsMode
}) => {
  const style = {
    display: 'flex',
    flexDirection: 'column'
  };
  const arrowStyle = {
    button: {
      width: '28px',
      height: '28px',
      padding: '3px'
    },
    icon: {
      height: 16,
      width: 16
    }
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
      // alignItems: 'center',
      position: 'relative',
      fontSize: '14px'
    },
    code: {
      display: 'flex',
      flex: '0 0 20%',
      padding: '3px',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '14px',
      position: 'relative'
    },
    description: {
      display: 'flex',
      flex: '0 0 50%',
      padding: '3px',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '14px'
    },
    price: {
      display: 'flex',
      flex: '0 0 90px',
      padding: '3px',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '14px'
    },
    qty: {
      display: 'flex',
      flex: '0 0 90px',
      padding: '3px',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '14px'
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
                  setModal({ content: 'goodsCard', fullScreen: true });
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
            <div 
              style={{width: '12px', cursor: 'pointer', background: 'rgba(238, 238, 238, 0.5)'}}
              onClick={
                () => {
                  if (catalogQty[key]) {
                    const v = catalogQty[key] - 1;
                    if (v === 0) {
                      removeFromCart(key);
                      removeCatalogQty(key);
                    } else {
                      addCatalogQty(key, v);
                      addToCart(key, v, prices[key]);                      
                    }
                  }
                }
              }
            ></div>
            <input
              type="text"
              className='catalogQtyInput'
              style={{width: '50px', textAlign: 'right', padding: '3px', fontSize: '16px'}}
              value={catalogQty[key] || ''}
              onFocus={
                () => {
                setFocused(key);
                  //console.log('focused: ' + key);
                }
              }
              onChange={
                (e) => {
                  const val = parseInt(e.target.value, 10) ? parseInt(e.target.value, 10) : '';
                    addCatalogQty(key, val);
                    addToCart(key, val, prices[key]);
                    if (val === '') {
                      removeFromCart(key);
                      removeCatalogQty(key);
                    }
                    // addCatalogQty(key, val);
                    // cartItems[key] && addToCart(key, val, prices[key]);
                    // if (val === '') {
                    //   removeFromCart(key);
                    //   removeCatalogQty(key);
                    // }
                }
              }
            >
            </input>
            <div 
              style={{width: '12px', cursor: 'pointer', background: 'rgba(238, 238, 238, 0.5)'}}
              onClick={
                () => {
                  const v = catalogQty[key] ? catalogQty[key] + 1 :  1;
                  addCatalogQty(key, v);
                  addToCart(key, v, prices[key]);                  
                }
              }
            >
            </div>
          </div>
          <div style={rowStyle.add} >
            {/* {!cartItems[key] && //if not inside cart - show Add to cart
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
            } */}
          </div>
        </div>
      );
    });
  };
  const getHeaderJsx = () => {
    return (
      <div style={headerStyle.container}>
        <div style={{position: 'absolute', top: '0px', right: '5px'}}>
          {!headerSettingsMode &&
            <IconButton 
              style={{height: '24px', width:'24px', padding: '2px'}}
              onClick={setHeaderSettingsMode}
            >
              <IconSettings color='#ccc' viewBox='0 0 24 24' />
            </IconButton>
          }
          {headerSettingsMode &&
            <IconButton 
              style={{height: '24px', width:'24px', padding: '2px'}}
              onClick={removeHeaderSettingsMode}
            >
              <IconDone viewBox='0 0 24 24' />
            </IconButton>
          }
        </div>
        <div style={headerStyle.code}>
          {headerSettingsMode && <IconButton style={arrowStyle.button} iconStyle={arrowStyle.icon}><IconArrowBack /></IconButton>}
          <div>Код</div>
          {headerSettingsMode && <IconButton style={arrowStyle.button} iconStyle={arrowStyle.icon}><IconArrowForward /></IconButton>}
        </div>
        <div style={headerStyle.description}>
          {headerSettingsMode && <IconButton style={arrowStyle.button} iconStyle={arrowStyle.icon}><IconArrowBack /></IconButton>}
          <div>Наименование</div>
          {headerSettingsMode && <IconButton style={arrowStyle.button} iconStyle={arrowStyle.icon}><IconArrowForward /></IconButton>}
        </div>
        <div style={headerStyle.price}>
          {headerSettingsMode && <IconButton style={arrowStyle.button} iconStyle={arrowStyle.icon}><IconArrowBack /></IconButton>}
          <div>Цена</div>
          {headerSettingsMode && <IconButton style={arrowStyle.button} iconStyle={arrowStyle.icon}><IconArrowForward /></IconButton>}
        </div>
        <div style={headerStyle.qty}>
          {headerSettingsMode && <IconButton style={arrowStyle.button} iconStyle={arrowStyle.icon}><IconArrowBack /></IconButton>}
          <div>Кол</div>
          {headerSettingsMode && <IconButton style={arrowStyle.button} iconStyle={arrowStyle.icon}><IconArrowForward /></IconButton>}
        </div>
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
  
  constructor() {
    super();
    this.state = {current: '', headerSettingsMode: false};
    this.setFocused = this.setFocused.bind(this);
    this.setHeaderSettingsMode = this.setHeaderSettingsMode.bind(this);
    this.removeHeaderSettingsMode= this.removeHeaderSettingsMode.bind(this);
  }
  
  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp.bind(this), false);
  }

  handleKeyUp(e) {
    const current = this.state.current;
    if(e.which === 13 && document.activeElement.className === "catalogQtyInput") {
      const index = $('.catalogQtyInput').index(document.activeElement) + 1;
      $('.catalogQtyInput').eq(index).focus();
    }
    if (e.which === 38) {
      e.preventDefault();
      current && this.props.increaseCart(current);
      current && this.props.increaseCatalogQty(current);
    }
    if (e.which === 40) {
      e.preventDefault();
      current && this.props.decreaseCart(current);
      current && this.props.decreaseCatalogQty(current);    
    }
  }
  
  setFocused(key) {
    this.setState({current: key});
  }
  
  setHeaderSettingsMode() {
    this.setState({headerSettingsMode: true});
  }
  
  removeHeaderSettingsMode() {
    this.setState({headerSettingsMode: false});
  }
  
  render() {
    const props = {...this.props, setFocused: this.setFocused, headerSettingsMode: this.state.headerSettingsMode, setHeaderSettingsMode: this.setHeaderSettingsMode, removeHeaderSettingsMode: this.removeHeaderSettingsMode }; 
    return <List {...props} />;  
  }
}

export default connect(
  state => ({ items: state.goods.items, itemsIds: getGoodsVisibleIds(state.goods), cartItems: state.cart.items, prices: state.prices , catalogQty: state.catalogQty }),
  { ...cartActions, ...modalActions, ...goodsActions, ...catalogQtyActions }
)(ListContainer);
