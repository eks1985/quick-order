import { database } from '../firebase/firebase-app';

const pricesRef = database.ref('prices');
export const listenToPrices = () => {
	return (dispatch) => {
		pricesRef.off();
		pricesRef.on('value', (snapshot) => {
			dispatch({
				type: 'PRICES_RECEIVE_DATA',
				payload: snapshot.val()
			});
		}, (error) => {
			dispatch({
				type: 'PRICES_RECEIVE_DATA_ERROR',
				message: error.message
			});
		});
	};
};
