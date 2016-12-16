import { database } from './../firebase/firebase-app';

export const listenToUsers = () => {
  return dispatch => {
    try {
      const usersRef = database.ref('users');
      usersRef.on('value', snapshot => {
        dispatch({
          type: 'RECEIVE_USERS',
          payload: snapshot.val()
        });
      });
    } catch (e) {}
  };
};

export const blockUser = (id) => {
  return dispatch => {
    try {
      const usersRef = database.ref('users').child(id);
      usersRef.update({ disabled: true });
    } catch (e) {}
  };
};

export const unblockUser = (id) => {
  return dispatch => {
    try {
      const usersRef = database.ref('users').child(id);
      usersRef.update({ disabled: false });
    } catch (e) {}
  };
};

export const assignCustomer = (userKey, customerKey) => {
  return dispatch => {
    try {
      const usersRef = database.ref('users').child(userKey);
      usersRef.update({ customerRef: customerKey }); 
    } catch (e) {}
  };
};

