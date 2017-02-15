import { setCustomerOptionFirebase, setCommonOptionFirebase } from './options-firebase';

export const setOption = (option, value) => {
  return dispatch => {
    dispatch({
      type: 'SET_OPTION',
      option,
      value
    });
    dispatch(setCommonOptionFirebase(option, value));
    if (option  === 'manageGoodsOnStockQty' && value === false) {
      dispatch(setCommonOptionFirebase('showGoodsOnStockQty', false));
      dispatch(setCommonOptionFirebase('positionIsActiveDefinition', 'positionData'));
    }
    if (option  === 'managePositionIsActiveProp' && value === false) {
      dispatch(setCommonOptionFirebase('showNoActivePosition', false));
      dispatch(setCommonOptionFirebase('orderNoActivePositions', false));
      dispatch(setCommonOptionFirebase('positionIsActiveDefinition', ''));
    }
    if (option  === 'managePositionIsActiveProp' && value === true) {
      dispatch(setCommonOptionFirebase('positionIsActiveDefinition', 'positionData'));
    }
    if (option  === 'managePrices') {
      dispatch(setCommonOptionFirebase('managePrices', value));
    }
    if (option  === 'showPictures') {
      dispatch(setCommonOptionFirebase('showPictures', value));
    }
    if (option  === 'categoryLineSeparator') {
      dispatch(setCommonOptionFirebase('categoryLineSeparator', value));
    }
    if (option  === 'allowDraftOrders') {
      dispatch(setCommonOptionFirebase('allowDraftOrders', value));
    }
    if (option  === 'allowDeleteOrders') {
      dispatch(setCommonOptionFirebase('allowDeleteOrders', value));
    }
    if (option  === 'permanentDeleteOrders') {
      dispatch(setCommonOptionFirebase('permanentDeleteOrders', value));
    }
    if (option  === 'ordersRowsSeparator') {
      dispatch(setCommonOptionFirebase('ordersRowsSeparator', value));
    }
  };
};

export const moveHeaderColumn = (columsKeys, name, direction) => {
  return (dispatch, getState) => {
    const pos = columsKeys.indexOf(name);
    const newOpt =  direction === 'forward'
      ? [ ...columsKeys.slice(0, pos), columsKeys[pos + 1], columsKeys[pos], ...columsKeys.slice(pos + 2) ]
      : [ ...columsKeys.slice(0, pos - 1), columsKeys[pos], columsKeys[pos - 1], ...columsKeys.slice(pos + 1) ];
    dispatch({
      type: 'SET_OPTION',
      option: 'catalogListSettings',
      value: newOpt
    });
    dispatch(setCustomerOptionFirebase('catalogListSettings', newOpt));
  };
};

export const moveHeaderColumnCheckout = (columsKeys, name, direction) => {
  return (dispatch, getState) => {
    const pos = columsKeys.indexOf(name);
    const newOpt =  direction === 'forward'
      ? [ ...columsKeys.slice(0, pos), columsKeys[pos + 1], columsKeys[pos], ...columsKeys.slice(pos + 2) ]
      : [ ...columsKeys.slice(0, pos - 1), columsKeys[pos], columsKeys[pos - 1], ...columsKeys.slice(pos + 1) ];
    dispatch({
      type: 'SET_OPTION',
      option: 'catalogListSettingsCheckout',
      value: newOpt
    });
    dispatch(setCustomerOptionFirebase('catalogListSettingsCheckout', newOpt));
  };
};
