import { database } from '../../firebase/firebase-app';

export const listenToGoodsGroups = () => {
	return dispatch => {
		try {
			const goodsGroupsRef = database.ref('goods-groups');
			goodsGroupsRef.off();
			var ref = database.ref("goods-groups");
			ref.orderByValue().on("value", snapshot => {
				const payload = {};
			  snapshot.forEach( data => {
			  	payload[data.key] = data.val();
			  });
			  dispatch({
					type: 'RECEIVE_GOODS_GROUPS',
					payload
				});
			}, error => {
				dispatch({
					type: 'RECEIVE_GOODS_GROUPS_ERROR',
					message: error.message
				});
			});
		} catch (e) {}
	};
};
