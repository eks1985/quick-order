import { database } from '../firebase/firebase-app';

const pricesRef = database.ref('prices');
export const listenToPrices = () => {
	return (dispatch) => {
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
	};
};
