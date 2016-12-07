import { database } from '../firebase/firebase-app';

const goodsGroupsRef = database.ref('goods-groups');
// export const listenToGoodsGroups = () => {
// 	return (dispatch) => {
// 		goodsGroupsRef.off();
// 		goodsGroupsRef.on('value', (snapshot) => {
// 			dispatch({
// 				type: 'RECEIVE_GOODS_GROUPS',
// 				payload: snapshot.val()
// 			});
// 		}, (error) => {
// 			dispatch({
// 				type: 'RECEIVE_GOODS_GROUPS_ERROR',
// 				message: error.message
// 			});
// 		});
// 	};
// };

export const listenToGoodsGroups = () => {
	return (dispatch) => {
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
	};
};
