import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Layout from './components/layout';
import Modal from './lib/modal/components/modal';
import ModalContent from './components/modal-content';
import { setQtyPagesGoods, setSearchText } from './actions/goods';
import { setQtyPagesOrders } from './actions/orders';
import { setCurrentContent } from './actions/current-content';
import { search, moveGoodsBack, moveGoodsForward } from './actions/goods';
// eslint-disable-next-line
import rtep from './rtep';

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setQtyPagesGoods());
    dispatch(setQtyPagesOrders());
    document.addEventListener('keyup', this.handleKeyUp, false);
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp, false);
    document.removeEventListener('click', this.handleClick, false);
  }

  handleKeyUp = (e) => {
    const { dispatch } = this.props;
    if (e.key === '/' || e.which === 111) {
      document.querySelector('#search').focus();
    }
    if (e.which === 13 && document.activeElement.id === 'search') {
      const text = document.querySelector('#search').value;
      dispatch(search(text));
      dispatch(setSearchText(text));
    }

    if(e.which === 13 && document.activeElement.className === "catalogQtyInput") {
      let id = parseInt(document.activeElement.id, 10);
      let newId = id < 9 ? id + 1 : 0;
      document.getElementById(newId).focus();
    }
    if (e.which === 40 && document.activeElement.className === "catalogQtyInput") {
      let id = parseInt(document.activeElement.id, 10);
      let newId = id < 9 ? id + 1 : 0;
      document.getElementById(newId).focus();
    }
    if (e.which === 38 && document.activeElement.className === "catalogQtyInput") {
      let id = parseInt(document.activeElement.id, 10);
      let newId = id > 0 ? id - 1 : 9;
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

  handleClick = e => {
    const { dispatch } = this.props;
    let className = '';
    try {
      className = e.target.className;
    } catch (e) {}
    className = typeof className === 'string' ? className : '';
    // console.log('e.srcElement', e);
    className !== 'catalogQtyInput' &&
    !className.includes('row-cell') &&
    !className.includes('pagination') &&
    e.srcElement.tagName !== 'path' &&
    e.srcElement.tagName !== 'svg' &&
    dispatch({ type: 'RESET_FOCUSED' });
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

App = connect()(App);

export default App;
