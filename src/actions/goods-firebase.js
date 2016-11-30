import { database } from '../firebase/firebase-app';
import { setQtyPagesGoods, generateCodes, generateDescriptions } from './goods';


const goodsRef = database.ref('goods');
export const listenToGoods = () => {
	return (dispatch) => {
		goodsRef.off();
		goodsRef.on('value', (snapshot) => {
			dispatch({
				type: 'RECEIVE_GOODS',
				payload: snapshot.val()
			});
			dispatch(setQtyPagesGoods());
    	dispatch(generateCodes());
    	dispatch(generateDescriptions());
		}, (error) => {
			dispatch({
				type: 'RECEIVE_GOODS_ERROR',
				message: error.message
			});
		});
	};
};

