import { database } from '../firebase/firebase-app';

export const listenToOptions = () => {
	return (dispatch) => {
		try {
			const optionsRef = database.ref('options/common');
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
		} catch (e) {}
	};
};

export const setCommonOptionFirebase = (option, value) => {
};

export const setCustomerOptionFirebase = (option, value) => {
	return (dispatch, getState) => {
		try {
			const customerGuid = getState().customer.guid;
		  if (customerGuid) {
		  	const customerOptionsRef = database.ref('options/' + customerGuid);	
		  	customerOptionsRef.update({[option]: value});
		  }
		} catch (e) {}
	};
};
