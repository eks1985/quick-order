import { database } from '../firebase/firebase-app';

export const listenToPrices = () => {
	return (dispatch, getState) => {
		try {
      const  { managePrices } = getState().options;
      const { guid: customerGuid, priceType: cutomerPriceType} = getState().customer;
			let pricesRef;
			if (managePrices === 'common') {
				pricesRef = database.ref('prices/common');
				pricesRef.off();
				pricesRef.on('value', snapshot => {
					const payload = snapshot.val();
					if (payload) {
						dispatch({
							type: 'RECEIVE_PRICES',
							payload
						});
					} else {
						pricesRef = database.ref('prices');
						pricesRef.on('value', snapshot => {
							dispatch({
								type: 'RECEIVE_PRICES',
								payload: snapshot.val()
							});
						});
					}
				}, (error) => {
					dispatch({
						type: 'RECEIVE_PRICES_ERROR',
						message: error.message
					});
				});
			} else if (managePrices === 'byPriceTypes') {
        const path = cutomerPriceType ? 'prices/' + cutomerPriceType : 'prices/' + customerGuid;
        console.log('path');
				pricesRef = database.ref(path);
        pricesRef.off();
				pricesRef.on('value', snapshot => {
					const payload = snapshot.val();
					dispatch({
						type: 'RECEIVE_PRICES',
						payload
					});
				}, (error) => {
					dispatch({
						type: 'RECEIVE_PRICES_ERROR',
						message: error.message
					});
				});
			}
		} catch (e) {}
	};
};
