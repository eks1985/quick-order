import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { listenToGoodsGroups } from './actions/goods-groups-firebase';
import { listenToGoods } from './actions/goods-firebase';
import { listenToPrices } from './actions/prices-firebase';
import { listenToAuth } from './actions/auth';

export default class root extends Component {

  componentWillMount()  {
		store.dispatch(listenToAuth());
    store.dispatch(listenToGoodsGroups());
    store.dispatch(listenToGoods());
    store.dispatch(listenToPrices());
	}

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }

}
