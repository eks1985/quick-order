import { database } from '../firebase/firebase-app';

const goodsGroupsRef = database.ref('goods-groups');
export const listenToGoodsGroups = () => {
	return (dispatch) => {
		goodsGroupsRef.off();
		goodsGroupsRef.on('value', (snapshot) => {
			dispatch({
				type: 'RECEIVE_GOODS_GROUPS',
				payload: snapshot.val()
			});
		}, (error) => {
			dispatch({
				type: 'RECEIVE_GOODS_GROUPS_ERROR',
				message: error.message
			});
		});
	};
};
