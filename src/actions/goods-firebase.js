import { database } from '../firebase/firebase-app';
import { setQtyPagesGoods, generateCodes, generateDescriptions, generateOrderIndexCodes, generateOrderIndexDescriptions } from './goods';

import { injectReducer } from './../store/';
import createIndex from './../store/create-index';
import store from './../store/';
import { buildIndex } from './../actions/indexes';

export const listenToGoods = () => {
	return (dispatch, getState) => {
		try {
			const goodsRef = database.ref('goods');
			goodsRef.off();
			goodsRef.on('value', (snapshot) => {
				dispatch({
					type: 'RECEIVE_GOODS',
					payload: snapshot.val()
				});
				dispatch(setQtyPagesGoods());
	    	dispatch(generateCodes());
	    	dispatch(generateDescriptions());
        dispatch(generateOrderIndexCodes());
        dispatch(generateOrderIndexDescriptions());
        
        // inject index reducers
        const catalogListColumnsKeys = Object.keys(getState().options.catalogListColumns);
				catalogListColumnsKeys.forEach(key => {
					injectReducer(store, key, createIndex(key));
        	dispatch(buildIndex(key));
				}); 
        
        
			}, (error) => {
				dispatch({
					type: 'RECEIVE_GOODS_ERROR',
					message: error.message
				});
			});
		} catch (e) {}
	};
};
