import { database } from '../firebase/firebase-app';

export const listenToOptions = () => {
	return (dispatch) => {
		try {
			const optionsRef = database.ref('options/common');
			optionsRef.off();
			optionsRef.on('value', (snapshot) => {
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
	return (dispatch, getState) => {
		try {
		 	const commonOptionsRef = database.ref('options/common' );	
		 	commonOptionsRef.update({[option]: value});
		} catch (e) {}
	};
};

export const setCommonOptionCatalogListColumnsFirebase = (option, index, value) => {
	return (dispatch, getState) => {
		try {
		 	const commonOptionsRef = database.ref('options/common/catalogListColumns/' + option);	
		 	commonOptionsRef.update({[index]: value});
		} catch (e) {}
	};
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
