import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Layout from './components/layout';
import Modal from './lib/modal/components/modal';
import ModalContent from './components/modal-content';
import { setQtyPagesGoods, setSearchText } from './actions/goods';
import { setQtyPagesOrders } from './actions/orders';
import { setCurrentContent } from './actions/current-content';
import { search } from './actions/goods';
// import { loadFirebaseConfig } from './actions/firebase-config';
// eslint-disable-next-line
import rtep from './rtep';

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setQtyPagesGoods());
    dispatch(setQtyPagesOrders());
    document.addEventListener('keyup', this.handleKeyUp.bind(this), false);
    // dispatch(loadFirebaseConfig());
  }

  handleKeyUp(e) {
    if (e.key === '/' || e.which === 111) {
      document.querySelector('#search').focus();
    // } else if ( (e.key === 'Enter' || e.keyIdentifier === "Enter") && document.activeElement.id === 'search') {
    //   this.props.dispatch(search(document.querySelector('#search').value));
    }
    if (e.which === 13 && document.activeElement.id === 'search') {
      const text = document.querySelector('#search').value;
      this.props.dispatch(search(text));
      this.props.dispatch(setSearchText(text));
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

App = connect()(App);

export default App;
