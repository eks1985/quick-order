import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { getGoodsVisibleIds } from './../../../../store/reducers/goods';
import * as cartActions from './../../../../actions/cart';
import * as goodsActions from './../../../../actions/goods';
import * as modalActions from './../../../../lib/modal/actions/modal';
import * as catalogQtyActions from './../../../../actions/catalog-qty';
import * as optionsActions from './../../../../actions/options';
import Header from './header';
import Items from './items';
import styles from './styles';

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
    // const current = this.state.current;
    if(e.which === 13 && document.activeElement.className === "catalogQtyInput") {
      const index = $('.catalogQtyInput').index(document.activeElement) + 1;
      $('.catalogQtyInput').eq(index).focus();
    }
    if (e.which === 40 && document.activeElement.className === "catalogQtyInput") {
      // e.preventDefault();
      // current && this.props.increaseCart(current);
      // current && this.props.increaseCatalogQty(current);
      const index = $('.catalogQtyInput').index(document.activeElement) + 1;
      $('.catalogQtyInput').eq(index).focus();
    }
    if (e.which === 38 && document.activeElement.className === "catalogQtyInput") {
      // e.preventDefault();
      // current && this.props.decreaseCart(current);
      // current && this.props.decreaseCatalogQty(current); 
      const index = $('.catalogQtyInput').index(document.activeElement) - 1;
      $('.catalogQtyInput').eq(index).focus();
    }
    if (e.which === 34) {
      this.props.moveGoodsForward();
    }
    if (e.which === 33) {
      this.props.moveGoodsBack();
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
        {/*
        <button
          onClick={
            ()=>{
              this.props.sortGoods('code');
            }
          }
        >
          Сортировать по коду
        </button>
        <button
          onClick={
            ()=>{
              this.props.sortGoods('description');
            }
          }
        >
          Сортировать по наименованию
        </button>
        */}
      </div>
    );
    
  }
}

export default connect(
  state => ({ 
    items: state.goods.items, 
    itemsIds: getGoodsVisibleIds(state.goods), 
    cartItems: state.cart.items, 
    prices: state.prices , 
    catalogQty: state.catalogQty,
    catalogListSettings: state.options.catalogListSettings
  }),
  { ...cartActions, ...modalActions, ...goodsActions, ...catalogQtyActions, ...optionsActions }
)(ListContainer); 