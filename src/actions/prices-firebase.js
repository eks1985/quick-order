import { database } from '../firebase/firebase-app';

export const listenToPrices = () => {
	return (dispatch) => {
		try {
			const pricesRef = database.ref('prices');
			pricesRef.off();
			pricesRef.on('value', (snapshot) => {
				dispatch({
					type: 'RECEIVE_PRICES',
					payload: snapshot.val()
				});
			}, (error) => {
				dispatch({
					type: 'RECEIVE_PRICES_ERROR',
					message: error.message
				});
			});
		} catch (e) {}
	};
};
