import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
// import { listenToGoods } from './actions/goods-firebase';
import { listenToAuth } from './actions/auth';

export default class root extends Component {

  componentWillMount()  {
		store.dispatch(listenToAuth());
    // store.dispatch(listenToGoods());
	}

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }

}
