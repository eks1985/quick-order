import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Auth from './components/auth';
import Layout from './components/layout';
import Modal from './lib/modal/components/modal';
import ModalContent from './components/modal-content';
import { setQtyPagesGoods } from './actions/goods';
import { setQtyPagesOrders } from './actions/orders';
import { setCurrentContent } from './actions/current-content';
import { setModal } from './lib/modal/actions/modal';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(setModal({ fullScreen: true, content: 'login', style: {display: 'flex', justifyContent: 'center', alignItems: 'center'}, showClose: false }));
    this.props.dispatch(setQtyPagesGoods());
    this.props.dispatch(setQtyPagesOrders());
  }

  render() {
    const style = {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    }
    return (
      <div className="App" style={style}>
        <Auth />
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
