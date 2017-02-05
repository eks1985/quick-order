// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Layout from './components/layout';
import Modal from './lib/modal/components/modal';
import ModalContent from './components/modal-content';
import { setQtyPagesGoods, setSearchText } from './actions/goods';
import { setQtyPagesOrders } from './actions/orders';
import { setCurrentContent } from './actions/current-content';
import { setFilterTextCart } from './actions/cart';
import { search, moveGoodsBack, moveGoodsForward } from './actions/goods';
import { filterCartItems } from './actions/cart';
import { setUi } from './actions/ui';
import { removeFromCart, addToCart } from './actions/cart';
import { removeCatalogQty, addCatalogQty } from './actions/catalog-qty';
import { setModal } from './lib/modal/actions/modal';

// eslint-disable-next-line
import rtep from './rtep';

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setQtyPagesGoods());
    dispatch(setQtyPagesOrders());
    document.addEventListener('keyup', this.handleKeyUp, false);
    document.addEventListener('click', this.handleClick, false);
    dispatch(setUi(document.body.clientHeight));
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp, false);
    document.removeEventListener('click', this.handleClick, false);
  }

  handleKeyUp = (e) => {
    const { rowsPerPage, dispatch } = this.props;
    if (e.key === '/' || e.which === 111) {
      document.querySelector('#search').focus();
    }
    if (e.which === 13 && document.activeElement.id === 'search') {
      const text = document.querySelector('#search').value;
      dispatch(search(text));
      dispatch(setSearchText(text));
    }
    if (e.which === 13 && document.activeElement.id === 'editQtyRowCheckout') {
      //Press Enter while inside edit cart row qty modal dialog
      const rawVal = document.getElementById('editQtyRowCheckout').value;
      const guid = this.props.modal.data.keyProp;
      const val = parseInt(rawVal, 10) || rawVal;
      if (val === '' || val === 0) {
        dispatch(removeFromCart(guid));
        dispatch(removeCatalogQty(guid));
        dispatch(setModal());
      }
      if (parseInt(val, 10) === val) {
        dispatch(addCatalogQty(guid, val));
        dispatch(addToCart(guid, val, this.props.prices[guid]));
        dispatch(setModal());
      } else {
      }
    }
    if (e.which === 13 && document.activeElement.id === 'searchCart') {
      const text = document.querySelector('#searchCart').value;
      dispatch(setFilterTextCart(text));
      dispatch(filterCartItems());
    }

    if(e.which === 13 && document.activeElement.className === "catalogQtyInput") {
      let id = parseInt(document.activeElement.id, 10);
      let newId = id < rowsPerPage - 1 ? id + 1 : 0;
      document.getElementById(newId).focus();
    }
    // down
    if (e.which === 40 && document.activeElement.className === "catalogQtyInput") {
      let id = parseInt(document.activeElement.id, 10);
      let newId = id < rowsPerPage - 1 ? id + 1 : 0;
      document.getElementById(newId).focus();
    }
    // up
    if (e.which === 38 && document.activeElement.className === "catalogQtyInput") {
      let id = parseInt(document.activeElement.id, 10);
      let newId = id > 0 ? id - 1 : rowsPerPage - 1;
      document.getElementById(newId).focus();
    }
    if (e.which === 34) {
      dispatch(moveGoodsForward());
      document.getElementById(0).focus();
    }
    if (e.which === 33) {
      dispatch(moveGoodsBack());
      document.getElementById(0).focus();
    }

  }

  //возвращает фокус назад на поле ввода
  handleClick = e => {
    const { current, currentCheckout, dispatch, currentContent } = this.props;
    let className = '';
    try {
      className = e.target.className;
    } catch (e) {}
    if (currentContent === 'goods') {
      className = typeof className === 'string' ? className : '';
      className !== 'catalogQtyInput' &&
      !className.includes('row-cell') &&
      !className.includes('pagination') &&
      !className.includes('side-picture') &&
      !className.includes('modal-close') &&
      e.srcElement.tagName !== 'path' &&
      e.srcElement.tagName !== 'svg' &&
      dispatch({ type: 'RESET_FOCUSED' });
      try {
        current !== '' && e.target.nodeName !== 'INPUT' && document.getElementById(current).focus();
      } catch (e) {}
      current !== '' && e.target.nodeName !== 'INPUT' && dispatch({ type: 'SET_FOCUSED', payload: current});
    } else if (currentContent === 'checkout') {
      className = typeof className === 'string' ? className : '';
      className !== 'catalogQtyInput' &&
      !className.includes('row-cell') &&
      !className.includes('pagination') &&
      !className.includes('side-picture') &&
      !className.includes('modal-close') &&
      e.srcElement.tagName !== 'path' &&
      e.srcElement.tagName !== 'svg' &&
      dispatch({ type: 'RESET_FOCUSED_CHECKOUT' });
      try {
        currentCheckout !== '' && e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TEXTAREA' && document.getElementById(currentCheckout).focus();
      } catch (e) {}
      currentCheckout !== '' && e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TEXTAREA' && dispatch({ type: 'SET_FOCUSED_CHECKOUT', payload: currentCheckout});
    }
  }

  render() {
    const style = {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    };
    return (
      <div className="App" style={style}>
        <Layout />
        <Modal
          handlerClose={
            () => {
              setCurrentContent('goods')(this.props.dispatch);
            }
          }
        >
          <ModalContent />
        </Modal>
      </div>
    );
  }
}

App = connect(
  state => ({
    current: state.current,
    currentCheckout: state.currentCheckout,
    rowsPerPage: state.goods.rowsPerPage,
    currentContent: state.currentContent,
    modal: state.modal,
    prices: state.prices
  })
)(App);

export default App;
