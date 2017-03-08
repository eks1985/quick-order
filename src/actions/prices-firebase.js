import { database } from '../firebase/firebase-app';

export const listenToPrices = () => {
	return (dispatch, getState) => {
		try {
      const  { managePrices } = getState().options;
      const { guid: customerGuid} = getState().customer;
			const pricesRef = database.ref(managePrices === 'common' ? 'prices/common' : `prices/${customerGuid}`);
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
