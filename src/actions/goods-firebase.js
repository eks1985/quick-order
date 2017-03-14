import { database } from '../firebase/firebase-app';
import { setQtyPagesGoods } from './goods';

import { injectReducer } from './../store/';
import createIndex from './../store/create-index';
import store from './../store/';
import { buildIndex } from './../actions/indexes';
import { detectIsLastPage } from './goods-navigation';

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
				dispatch(detectIsLastPage());
        //> inject index reducers
        // by code and description
        injectReducer(store, 'code', createIndex('code'));
        dispatch(buildIndex('code'));
        injectReducer(store, 'description', createIndex('description'));
        dispatch(buildIndex('description'));
        //by all addition props
        const catalogListColumnsKeys = Object.keys(getState().options.catalogListColumns);
				catalogListColumnsKeys.forEach(key => {
					injectReducer(store, key, createIndex(key));
        	dispatch(buildIndex(key));
				});
        //< inject index reducers
			}, (error) => {
				dispatch({
					type: 'RECEIVE_GOODS_ERROR',
					message: error.message
				});
			});
		} catch (e) {}
	};
};
