import { database } from '../firebase/firebase-app';

export const optionsRef = database.ref('options');
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

export const setOptionFirebase = (option, value) => {
  
};
