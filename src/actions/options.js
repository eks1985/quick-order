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
  };
};

export const moveHeaderColumn = (name, direction) => {
  return (dispatch, getState) => {
    const opt = getState().options.catalogListSettings;
    
    const pos = opt.indexOf(name);
    const newOpt =  direction === 'forward' 
      ? [ ...opt.slice(0, pos), opt[pos + 1], opt[pos], ...opt.slice(pos + 2) ]
      : [ ...opt.slice(0, pos - 1), opt[pos], opt[pos - 1], ...opt.slice(pos + 1) ];
    
    dispatch({
      type: 'SET_OPTION',
      option: 'catalogListSettings',
      value: newOpt
    });
    
    dispatch(setCustomerOptionFirebase('catalogListSettings', newOpt));
  };
};