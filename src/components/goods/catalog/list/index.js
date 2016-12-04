import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { getGoodsVisibleIds } from './../../../store/reducers/goods';
import * as cartActions from './../../../actions/cart';
import * as goodsActions from './../../../actions/goods';
import * as modalActions from './../../../lib/modal/actions/modal';
import * as catalogQtyActions from './../../../actions/catalog-qty';
import Header from './header';
import Items from './items';
import styles from '.styles';

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
    const props = {
      ...this.props, 
      setFocused: this.setFocused, 
      headerSettingsMode: this.state.headerSettingsMode, 
      setHeaderSettingsMode: this.setHeaderSettingsMode, 
      removeHeaderSettingsMode: this.removeHeaderSettingsMode 
    }; 
    return (
      <div style={styles.style}>
        <Header {...props} />
        <Items {...props} />
      </div>
    );
    
  }
}

export default connect(
  state => ({ items: state.goods.items, itemsIds: getGoodsVisibleIds(state.goods), cartItems: state.cart.items, prices: state.prices , catalogQty: state.catalogQty }),
  { ...cartActions, ...modalActions, ...goodsActions, ...catalogQtyActions }
)(ListContainer); 