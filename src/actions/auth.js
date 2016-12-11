import { database, databaseCreateUsers } from '../firebase/firebase-app';
import { auth, authCreateUsers } from '../firebase/firebase-app';
import { listenToGoodsGroups } from './goods-groups-firebase';
import { listenToGoods } from './goods-firebase';
import { listenToPrices } from './prices-firebase';
import { listenToOptions } from './options-firebase';
import { listenToOrdersHeaders, listenToOrdersItems } from './orders-firebase';
import { setModal } from './../lib/modal/actions/modal';
import { setCustomer } from './customer';
import { setCurrentContent } from './current-content';

export const listenToAuth = () => {
	return (dispatch, getState) => {
		try {
			auth.onAuthStateChanged((authData) => {
				dispatch({type: 'RESET_ORDERS_HEADERS'});
				dispatch({type: 'RESET_ORDERS_ITEMS'});
				dispatch({type: 'RESET_CUSTOMER'});
				dispatch({type: 'RESET_QTY_PAGES_ORDERS'});
				dispatch(setCurrentContent('goods'));
				dispatch(listenToOptions());
				if (authData) {
					dispatch(setModal({ content: ''}));
					dispatch({
						type: 'AUTH_LOGIN',
						uid: authData.uid,
						username: authData.displayName,
						email: authData.email
					});
					//here listen to some data from firebase
					dispatch(listenToGoodsGroups());
					dispatch(listenToGoods());
					dispatch(listenToPrices());
	    		if (authData.email) {
	    			//get customer guid
	    			const email = authData.email.replace('.', '%2E');
	  				let usersRef  = database.ref(`users/${email}`);
	  				usersRef.once('value', snapshot => {
	  					let customerGuid = snapshot.val();
	  					if (customerGuid) {
	  						let customerRef = database.ref(`customers/${customerGuid}`);
		  					customerRef.once('value', snapshot => {
		  						const customerData = snapshot.val();
		  						const { guid, description, address, phone, email, inn } = customerData;
		  						dispatch(setCustomer(guid, description, address, phone, email, inn));
		  						dispatch(listenToOrdersHeaders());
		  						dispatch(listenToOrdersItems());
		  					});	
		  					let customerOptionsRef = database.ref(`options/${customerGuid}`);
		  					customerOptionsRef.once('value', snapshot => {
		  						dispatch({
		  							type: 'RECEIVE_OPTIONS',
		  							payload: snapshot.val()
		  						});
		  					});
	  					}
	  				});
	    		}
				} else {
					// if (getState().firebaseConfig.apiKey && getState().firebaseConfig.databaseURL) { //if not set api key, don't open login screen
						dispatch(setModal({ content: 'login', fullScreen: true, center: true, showClose: false }));
						if (getState().auth.status !== 'AUTH_ANONYMOUS') {
							dispatch({ type: 'AUTH_LOGOUT' });
						}
					// }
				}
			});
		} catch (e) {}
	};
};

export const openAuth = ( credentials = '') => {
	return (dispatch) => {
		try {
			dispatch({ type: 'AUTH_OPEN' });
			if (credentials) {
				auth.signInWithEmailAndPassword(credentials.email, credentials.password)
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

export const createUser = (email, password) => {
	return dispatch => {
		try {
			authCreateUsers.createUserWithEmailAndPassword(email, password)
			.then(user => {
				// console.log(user);
				// user.sendEmailVerification();
				const usersRef = databaseCreateUsers.ref('users/' + user.uid);
				usersRef.update({email: user.email});
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
			  console.log(error);
			});
		} catch (e) {}
	};
};