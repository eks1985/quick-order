import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { listenToGoodsGroups } from './actions/api/goods-groups-firebase';
import { listenToGoods } from './actions/goods-firebase';
import { listenToOptions } from './actions/options-firebase';
import { listenToAuth, checkAppHasUsers } from './actions/auth';
import { listenToUsers } from './actions/users-firebase';

import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class root extends Component {

  componentWillMount()  {
    store.dispatch(checkAppHasUsers());
		store.dispatch(listenToAuth());
    store.dispatch(listenToGoodsGroups());
    store.dispatch(listenToGoods());
    // store.dispatch(listenToPrices());
    store.dispatch(listenToOptions());
    store.dispatch(listenToUsers());
	}

  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <App />
        </MuiThemeProvider>
      </Provider>
    );
  }

}
