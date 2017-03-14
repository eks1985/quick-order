/* global localStorage */
import { database, databaseCreateUsers } from '../firebase/firebase-app';
import { auth, authCreateUsers } from '../firebase/firebase-app';
import { listenToGoodsGroups } from './api/goods-groups-firebase';
import { listenToGoods } from './goods-firebase';
import { listenToPrices } from './prices-firebase';
import { listenToOptions } from './options-firebase';
import { listenToOrdersHeaders, listenToOrdersItems } from './orders-firebase';
import { setModal } from './../lib/modal/actions/modal';
import { setCustomer } from './customer';
import { setCurrentContent } from './current-content';
import { listenToUsers } from './users-firebase';
import { receiveCustomers } from './customer';

export const openAuth = (credentials = '') => {
	return (dispatch) => {
		try {
			dispatch({ type: 'AUTH_OPEN' });
			const { email, password } = credentials;
			if (credentials) {
				auth.signInWithEmailAndPassword(email, password)
				.catch(function(error) {
		    		dispatch({
							type: 'AUTH_ERROR',
							error: error.message
						});
						dispatch({ type: 'AUTH_LOGOUT' });
				});
			} else {
    		dispatch({
					type: 'AUTH_ERROR',
					error: 'Не заданы данные пользователя'
				});
				dispatch({ type: 'AUTH_LOGOUT' });
			}
		} catch (e) {}
	};
};

export const listenToAuth = () => {
	return (dispatch, getState) => {
		try {
			dispatch(setModal({ content: 'login', fullScreen: true, center: true, showClose: false }));
			if (localStorage.getItem('quickOrderDemo')) {
				dispatch(openAuth({email: 'alfa1@alfa.com', password: '123456'}));
			}
			auth.onAuthStateChanged(authData => {
				dispatch({type: 'RESET_ORDERS_HEADERS'});
				dispatch({type: 'RESET_ORDERS_ITEMS'});
				dispatch({type: 'RESET_CUSTOMER'});
				dispatch({type: 'RESET_QTY_PAGES_ORDERS'});
				dispatch(setCurrentContent('goods'));
				dispatch(listenToOptions());
				if (authData && !authData.isAnonymous) {
					const { uid, displayName, email } = authData;
					dispatch(setModal());
					dispatch({
						type: 'AUTH_LOGIN',
						uid,
						displayName,
						email
					});
					//here listen to some data from firebase
					dispatch(listenToGoodsGroups());
					dispatch(listenToGoods());
					// dispatch(listenToPrices());
	    		if (authData.email) {
	    			//get customer guid
	    			const userUID = authData.uid;
	  				let usersRef  = database.ref(`users/${userUID}`);
	  				usersRef.once('value', snapshot => {
	  					const userData = snapshot.val();
	  					let customerGuid = userData.customerRef;
	  					if (customerGuid) {
	  						let customerRef = database.ref(`customers/${customerGuid}`);
		  					customerRef.once('value', snapshot => {
		  						const customerData = snapshot.val();
		  						const { guid, description, address, phone, email, inn, priceType } = customerData;
		  						dispatch(setCustomer(guid, description, address, phone, email, inn, priceType));
		  						dispatch(listenToOrdersHeaders());
		  						dispatch(listenToOrdersItems());
                  dispatch(listenToPrices());
		  					});
		  					let customerOptionsRef = database.ref(`options/${customerGuid}`);
		  					customerOptionsRef.once('value', snapshot => {
		  						dispatch({
		  							type: 'RECEIVE_OPTIONS',
		  							payload: snapshot.val()
		  						});
		  					});
	  					}

	  					//admin
	  					if (userData.admin) {
	  						const customersRef = database.ref('customers');
	  						customersRef.on('value', snapshot => {
	  							dispatch(receiveCustomers(snapshot.val()));
	  						});
	  					}
	  				});
	    		}
				} else {
					if (!localStorage.getItem('quickOrderDemo')) {
						dispatch(setModal({ content: 'login', fullScreen: true, center: true, showClose: false }));
						if (getState().auth.status !== 'AUTH_ANONYMOUS') {
							dispatch({ type: 'AUTH_LOGOUT' });
						}
					}
				}
			});
		} catch (e) {}
	};
};

export const openAuthAnonimously = ( credentials = '') => {
	return (dispatch) => {
		try {
			dispatch({ type: 'AUTH_OPEN' });
				auth.signInAnonymously()
					.catch(function(error) {
			    		dispatch({
								type: 'AUTH_ERROR',
								error: error.message
							});
							dispatch({ type: 'AUTH_LOGOUT' });
					});
		} catch (e) {}
	};
};

export const logoutUser = () => {
	return (dispatch) => {
		try {
			dispatch({ type: 'AUTH_LOGOUT' });
			auth.signOut();
			dispatch(setModal({ content: 'login', fullScreen: true, center: true, showClose: false }));
		} catch (e) {}
	};
};

export const createUser = (email, password, admin = false) => {
	return dispatch => {
		try {
			let usersRef;
			if (admin) {
				auth.createUserWithEmailAndPassword(email, password)
				.then(user => {
					usersRef = database.ref('users/' + user.uid);
					return usersRef.update({email, admin, disabled: false});
				})
        .then( () => {
          dispatch(listenToUsers());
        })
		    .catch(function(error) {
				  var errorCode = error.code;
				  var errorMessage = error.message;
				  if (errorCode === 'auth/weak-password') {
				    alert('The password is too weak.');
				  } else {
				    alert(errorMessage);
				  }
				  console.log(error);
				});
			} else {
				authCreateUsers.createUserWithEmailAndPassword(email, password)
				.then(user => {
					usersRef = databaseCreateUsers.ref('users/' + user.uid);
					usersRef.update({email, admin});
					authCreateUsers.signOut();
				})
		    .catch(function(error) {
				  var errorCode = error.code;
				  var errorMessage = error.message;
				  if (errorCode === 'auth/weak-password') {
				    alert('The password is too weak.');
				  } else {
				    alert(errorMessage);
				  }
				  console.log('user creation error', error);
				});
			}
		} catch (e) {}
	};
};

export const checkAppHasUsers = () => {
	return dispatch => {
		return authCreateUsers.signInAnonymously().then(
			user => {
				const allUsersRef = databaseCreateUsers.ref('users');
				allUsersRef.once('value').then(snapshot => {
					if (snapshot.val() !== null) {
						dispatch({
							type: 'AUTH_RESET_FIRST_ACCESS'
						});
					}
					dispatch({
						type: 'AUTH_USERS_CHECK_COMPLETE'
					});
				});
			}
		);
	};
};
