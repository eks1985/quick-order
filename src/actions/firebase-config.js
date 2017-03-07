import { setModal } from './../lib/modal/actions/modal';
import * as firebase from 'firebase';

export const loadFirebaseConfig = () => {
  return dispatch => {
    const firebaseConfig = localStorage.getItem('firebaseConfig');
    if (firebaseConfig) {
      if (firebaseConfig.apiKey && firebaseConfig.databaseURL) {
        dispatch({
          type: 'RECEIVE_FIREBASE_CONFIG',
          payload: {apiKey: firebaseConfig.apiKey, databaseURL: firebaseConfig.databaseURL}
        });
      } else {
        dispatch(setModal({ content: 'firebase-config', fullScreen: true, center: true, showClose: false }));
      }
    } else {
      dispatch(setModal({ content: 'firebase-config', fullScreen: true, center: true, showClose: false }));
    }
  };
};

export const setFirebaseConfig = config => {
  return dispatch => {
    localStorage.setItem('firebaseConfig', config);
    const { apiKey, databaseURL } = config;
    dispatch({
      type: 'RECEIVE_FIREBASE_CONFIG',
      payload: { apiKey, databaseURL }
    });
    firebase.initializeApp(config);
  };
};

export const resetFirebaseConfig = () => {
  return dispatch => {
    dispatch({
      type: 'RECEIVE_FIREBASE_CONFIG',
      payload: { apiKey: '', databaseURL: '' }
    });
  };
};
