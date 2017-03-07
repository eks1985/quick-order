import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Layout from './components/layout';
import Modal from './lib/modal/components/modal';
import ModalContent from './components/modal-content';
import { setModal } from './lib/modal/actions/modal';
import { setQtyPagesGoods, setSearchText, search, moveGoodsBack, moveGoodsForward } from './actions/goods';
import { setQtyPagesOrders } from './actions/orders';
import { setCurrentContent } from './actions/current-content';
import { setFilterTextCart, filterCartItems, removeFromCart, addToCart } from './actions/cart';
import { removeCatalogQty, addCatalogQty } from './actions/catalog-qty';
import { setUi } from './actions/ui';
import { keyboardKeyUpHandler, clickHandler } from './keyboard-mouse-handlers';

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

  handleKeyUp = e => {
    const { rowsPerPage, dispatch, prices } = this.props;
    keyboardKeyUpHandler(e, rowsPerPage, prices, dispatch, moveGoodsForward, moveGoodsBack, search, setSearchText, setFilterTextCart, filterCartItems, addToCart, removeFromCart, addCatalogQty, removeCatalogQty, setModal);
  }

  //возвращает фокус назад в поле ввода количества активной строки
  handleClick = e => {
    const { current, currentCheckout, dispatch, currentContent } = this.props;
    clickHandler(e, dispatch, current, currentCheckout, currentContent)
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
              this.props.dispatch(setCurrentContent('goods'));
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
