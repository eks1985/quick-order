import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import './index.css';
import { AppContainer } from 'react-hot-loader'

ReactDOM.render(
  <AppContainer>
    <Root />
  </AppContainer>,
  document.getElementById('root')
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./root', () => {
    const NextApp = require('./root').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
