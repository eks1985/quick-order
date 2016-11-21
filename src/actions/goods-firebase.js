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
      // console.log(getState().goods.items);
      // TODO generateCodes, generateDescriptions
		}, (error) => {
			dispatch({
				type: 'RECEIVE_GOODS_ERROR',
				message: error.message
			});
		});
	};
};

//
// const generateDescrGuids = (descr) => {
//   const goodsKeys = Object.keys(goods);
//   return goodsKeys.reduce((res, key) => {
//     return goods[key].description === descr ? res.concat(key) : res;
//   }, []);
// }
//
// export const generateDescriptions = () => {
//   const keys = Object.keys(goods);
//   const descrArr = keys.reduce((res, key) => {
//     res.push(goods[key].description);
//     return res;
//   }, []);
//   return descrArr.reduce((res, descr) => {
//     const guids = generateDescrGuids(descr);
//     res[descr.toLowerCase()] = guids;
//     return res;
//   }, {});
// };
