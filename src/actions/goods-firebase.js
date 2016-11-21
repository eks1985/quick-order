import { database } from '../firebase/firebase-app';

const goodsRef = database.ref('goods');
export const listenToGoods = () => {
	return (dispatch) => {
		goodsRef.off();
		goodsRef.on('value', (snapshot) => {
			dispatch({
				type: 'GOODS_RECEIVE_DATA',
				payload: snapshot.val()
			});
		}, (error) => {
			dispatch({
				type: 'GOODS_RECEIVE_DATA_ERROR',
				message: error.message
			});
		});
	};
};
