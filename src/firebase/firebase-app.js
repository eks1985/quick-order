/*global localStorage  */
import * as firebase from 'firebase';
let hasConfig, appForCreateUsers = false;
if (localStorage.getItem('firebaseConfig')) {
  hasConfig = true;
  const config = JSON.parse(localStorage.getItem('firebaseConfig'));
  firebase.initializeApp(config);
  appForCreateUsers  = firebase.initializeApp(config, 'appForCreateUsers');
}

export const auth = hasConfig ? firebase.auth() : {};
export const database = hasConfig ? firebase.database() : {};

export const authCreateUsers = hasConfig ? appForCreateUsers.auth(appForCreateUsers) : {};
export const databaseCreateUsers = hasConfig ? appForCreateUsers.database(appForCreateUsers) : {};
