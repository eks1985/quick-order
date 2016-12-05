import { database } from '../firebase/firebase-app';

export const optionsRef = database.ref('options/common');
export const listenToOptions = () => {
	return (dispatch) => {
		optionsRef.off();
		optionsRef.once('value', (snapshot) => {
			dispatch({
				type: 'RECEIVE_OPTIONS',
				payload: snapshot.val()
			});
		}, (error) => {
			dispatch({
				type: 'RECEIVE_OPTIONS_ERROR',
				message: error.message
			});
		});
	};
};

export const setCommonOptionFirebase = (option, value) => {
};

export const setCustomerOptionFirebase = (option, value) => {
	return (dispatch, getState) => {
		const customerGuid = getState().customer.guid;
	  if (customerGuid) {
	  	const customerOptionsRef = database.ref('options/' + customerGuid);	
	  	customerOptionsRef.update({[option]: value});
	  }
	};
};
