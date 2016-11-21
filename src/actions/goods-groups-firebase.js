import { database } from '../firebase/firebase-app';

const goodsGroupsRef = database.ref('goods-groups');
export const listenToGoodsGroups = () => {
	return (dispatch) => {
		goodsGroupsRef.off();
		goodsGroupsRef.on('value', (snapshot) => {
			dispatch({
				type: 'GOODS_GROUPS_RECEIVE_DATA',
				payload: snapshot.val()
			});
		}, (error) => {
			dispatch({
				type: 'GOODS_GROUPS_RECEIVE_DATA_ERROR',
				message: error.message
			});
		});
	};
};
