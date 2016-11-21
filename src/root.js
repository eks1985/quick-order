import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { listenToGoodsGroups } from './actions/goods-groups-firebase';
import { listenToGoods } from './actions/goods-firebase';
// import { listenToPrices } from './actions/prices-firebase';
import { listenToAuth, logoutUser } from './actions/auth';

import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class root extends Component {

  componentWillMount()  {
		store.dispatch(listenToAuth());
    store.dispatch(listenToGoodsGroups());
    store.dispatch(listenToGoods());
    store.dispatch(logoutUser());
    // store.dispatch(listenToPrices());
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
