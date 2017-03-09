import { database } from '../firebase/firebase-app';
import { setRowsPerPage } from './ui';

export const listenToCustomerOptions = () => {
  return (dispatch, getState) => {
    try {
      const customerGuid = getState().customer.guid;
      if (customerGuid) {
        let customerOptionsRef = database.ref(`options/${customerGuid}`);
        customerOptionsRef.once('value', snapshot => {
          dispatch({
            type: 'RECEIVE_OPTIONS',
            payload: snapshot.val()
          });
        });
      }
    } catch (e) {

    }
  }
}

export const listenToOptions = () => {
	return (dispatch) => {
		try {
			const optionsRef = database.ref('options/common');
			optionsRef.off();
			optionsRef.on('value', snapshot => {
        if (snapshot.val()) {
          dispatch({
            type: 'RECEIVE_OPTIONS',
            payload: snapshot.val()
          });
          const catalogListColumns = snapshot.val().catalogListColumns;
          const catalogListColumnsKeys = Object.keys(catalogListColumns);
          const sortDirection  = {code: '', description: ''};
          const result = catalogListColumnsKeys.reduce((res, key) => catalogListColumns[key][2] === true ? { ...res, [key]: ''} : res, sortDirection);
          dispatch(setRowsPerPage());
          dispatch({
            type: 'RECEIVE_SORT_DIRECTION',
            payload: result
          });
          dispatch(listenToCustomerOptions());
        }
			}, (error) => {
				dispatch({
					type: 'RECEIVE_OPTIONS_ERROR',
					message: error.message
				});
			});
		} catch (e) {}
	};
};

export const setCommonOptionFirebase = (option, value) => {
	return (dispatch, getState) => {
		try {
		 	const commonOptionsRef = database.ref('options/common' );
		 	commonOptionsRef.update({[option]: value});
		} catch (e) {}
	};
};

export const setCommonOptionCatalogListColumnsFirebase = (option, index, value) => {
	return (dispatch, getState) => {
		try {
		 	const commonOptionsRef = database.ref('options/common/catalogListColumns/' + option);
		 	commonOptionsRef.update({[index]: value});
		} catch (e) {}
	};
};

export const setCommonOptionCatalogListColumnsCartFirebase = (option, index, value) => {
	return (dispatch, getState) => {
		try {
		 	const commonOptionsRef = database.ref('options/common/catalogListColumnsCheckout/' + option);
		 	commonOptionsRef.update({[index]: value});
		} catch (e) {}
	};
};

export const setCustomerOptionFirebase = (option, value) => {
	return (dispatch, getState) => {
		try {
			const customerGuid = getState().customer.guid;
		  if (customerGuid) {
		  	const customerOptionsRef = database.ref('options/' + customerGuid);
		  	customerOptionsRef.update({[option]: value});
		  }
		} catch (e) {}
	};
};
