import config from './config';
import * as firebase from 'firebase';

firebase.initializeApp(config.firebaseConfig);
export const auth = firebase.auth();
export const database = firebase.database();
