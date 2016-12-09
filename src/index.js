import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import './index.css';
import { AppContainer } from 'react-hot-loader';
import FirebaseConfig from './components/firebase-config';

const firebaseConfig = localStorage.getItem('firebaseConfig');

ReactDOM.render(
  <AppContainer>
    {firebaseConfig ? <Root /> : <FirebaseConfig /> }
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
