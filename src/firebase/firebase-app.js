/*global localStorage  */
import * as firebase from 'firebase';
let hasConfig = false;
if (localStorage.getItem('firebaseConfig')) {
  hasConfig = true;
  const config = JSON.parse(localStorage.getItem('firebaseConfig'));
  firebase.initializeApp(config);
  firebase.initializeApp(config, 'appForCreateUsers');
}

console.log('firebase', firebase);

export const auth = hasConfig ? firebase.auth() : {};
export const database = hasConfig ? firebase.database() : {};

// export const authCreateUsers = hasConfig ? firebase.auth() : {};
// export const database = hasConfig ? firebase.database() : {};
